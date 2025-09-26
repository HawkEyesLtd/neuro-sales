import { message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// Constants for configuration and error messages
const DOWNLOAD_CONFIG = {
    TIMEOUT: 30000, // 30 seconds
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
    ALLOWED_MIME_TYPES: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel
        'application/vnd.ms-excel',
        'application/pdf',
        'text/csv',
        'application/zip',
    ],
};

const ERROR_MESSAGES = {
    NO_REPORT: 'No Report Found!',
    NO_DATA: 'No data available for download',
    INVALID_RESPONSE: 'Invalid file response from server',
    DOWNLOAD_FAILED: 'Download failed',
    FILE_TOO_LARGE: `File size exceeds the maximum limit of ${DOWNLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024)}MB`,
    INVALID_FILE_TYPE: 'Invalid file type. Only Excel, PDF, CSV, and ZIP files are allowed',
    NETWORK_ERROR: 'Network error occurred. Please check your connection',
    TIMEOUT_ERROR: 'Download timeout. Please try again',
    CANCELLED: 'Download was cancelled',
};

const useDownloadReport = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const { accessToken } = useSelector((state) => state.auth ?? {});
    const abortControllerRef = useRef(null);

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const validateFile = (response) => {
        const contentLength = response.headers.get('Content-Length');
        const contentType = response.headers.get('Content-Type');

        // Check file size
        if (contentLength && parseInt(contentLength, 10) > DOWNLOAD_CONFIG.MAX_FILE_SIZE) {
            throw new Error(ERROR_MESSAGES.FILE_TOO_LARGE);
        }

        // Check MIME type (if provided)
        if (contentType && !isMimeTypeAllowed(contentType)) {
            console.warn(`Unexpected content type: ${contentType}`);
        }
    };

    const isMimeTypeAllowed = (contentType) => {
        return DOWNLOAD_CONFIG.ALLOWED_MIME_TYPES.some(
            (type) => contentType.includes(type) || contentType.includes('application/octet-stream')
        );
    };

    const downloadWithProgress = async (response) => {
        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;

        if (!response.body) {
            throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
        }

        const reader = response.body.getReader();
        const chunks = [];
        let receivedLength = 0;

        try {
            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                chunks.push(value);
                receivedLength += value.length;

                // Update progress if total size is known
                if (total > 0) {
                    const progress = Math.round((receivedLength / total) * 100);
                    setDownloadProgress(progress);
                }
            }

            // Combine chunks into single ArrayBuffer
            const arrayBuffer = new ArrayBuffer(receivedLength);
            const uint8Array = new Uint8Array(arrayBuffer);
            let offset = 0;

            for (const chunk of chunks) {
                uint8Array.set(chunk, offset);
                offset += chunk.length;
            }

            return arrayBuffer;
        } finally {
            reader.releaseLock();
        }
    };

    const extractFilename = (doc) => {
        const contentDisposition = doc?.headers.get('Content-Disposition');
        if (!contentDisposition) {
            throw new Error(ERROR_MESSAGES.NO_REPORT);
        }

        // Handle different Content-Disposition formats
        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
        if (filenameMatch && filenameMatch[1]) {
            return filenameMatch[1].replace(/['"]/g, '');
        }

        // Fallback to split method for backward compatibility
        const splitResult = contentDisposition.split('"')[1];
        return splitResult || 'report.xlsx';
    };

    /**
     * Validates file result data
     * @param {ArrayBuffer} fResult - File data
     * @throws {Error} If file data is invalid
     */
    const validateFileResult = (fResult) => {
        // Check for empty file
        if (!fResult || fResult.byteLength === 0) {
            throw new Error(ERROR_MESSAGES.NO_DATA);
        }

        // Check for minimum file size (at least 10 bytes)
        if (fResult.byteLength < 10) {
            throw new Error(ERROR_MESSAGES.NO_DATA);
        }
    };

    const createBlobUrl = (fResult) => {
        const blob = new Blob([fResult], {
            type: 'application/octet-stream',
        });
        return URL.createObjectURL(blob);
    };

    const triggerDownload = (url, excName) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', excName);
        link.setAttribute('aria-label', `Download ${excName}`);

        // Ensure link is accessible but hidden
        link.style.display = 'none';
        document.body.appendChild(link);

        // Trigger download
        link.click();

        // Clean up immediately
        link.parentNode.removeChild(link);

        // Clean up blob URL after a short delay to ensure download started
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    };

    const downloadFile = async (doc) => {
        try {
            // Validate file before processing
            validateFile(doc);

            const excName = extractFilename(doc);

            // Use streaming download with progress tracking
            const fResult = await downloadWithProgress(doc);

            validateFileResult(fResult);

            const url = createBlobUrl(fResult);
            triggerDownload(url, excName);
        } catch (error) {
            throw new Error(error.message || ERROR_MESSAGES.DOWNLOAD_FAILED);
        }
    };

    /**
     * Cancels the current download
     */
    const cancelDownload = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsDownloading(false);
            setDownloadProgress(0);
            message.info(ERROR_MESSAGES.CANCELLED);
        }
    }, []);

    const setAbortController = () => {
        abortControllerRef.current = new window.AbortController();
    };

    const makeFetchRequest = async (url, body) => {
        return fetch(`${import.meta.env.VITE_REPORT_URL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                index: 0,
                ...body,
            }),
            mode: 'cors',
            signal: abortControllerRef.current.signal,
        });
    };

    const handleFetchErrors = async (result, url, body, retryCount) => {
        if (!result.ok) {
            if (result.status >= 500 && retryCount < DOWNLOAD_CONFIG.MAX_RETRIES) {
                // Server error - retry
                await sleep(DOWNLOAD_CONFIG.RETRY_DELAY * (retryCount + 1));
                return performRequest(url, body, retryCount + 1);
            }
            throw new Error(`${ERROR_MESSAGES.DOWNLOAD_FAILED} with status: ${result.status}`);
        }
        return result;
    };

    const handleError = (error) => {
        if (error.name === 'AbortError') {
            throw new Error(ERROR_MESSAGES.CANCELLED);
        }
        if (error.message.includes('timeout')) {
            throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
        }
        if (!navigator.onLine) {
            throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
        }
        throw error;
    };

    const performRequest = async (url, body, retryCount = 0) => {
        setAbortController();

        try {
            const result = await makeFetchRequest(url, body);
            return await handleFetchErrors(result, url, body, retryCount);
        } catch (error) {
            handleError(error);
        }
    };

    const download = async ({ url, body = {}, onSuccess, onError }) => {
        const loadingMessage = message.loading('Downloading file...', 0);

        try {
            setIsDownloading(true);
            setDownloadProgress(0);

            // Perform request with retry logic
            const result = await performRequest(url, body);

            // Check if the response is empty
            const contentLength = result.headers.get('Content-Length');
            if (contentLength === '0') {
                throw new Error(ERROR_MESSAGES.NO_DATA);
            }

            await downloadFile(result);
            loadingMessage(); // Close loading message
            message.success('File downloaded successfully');
            onSuccess?.();
        } catch (error) {
            loadingMessage(); // Close loading message
            console.error('Download error:', error?.message);

            // Categorize errors for better user experience
            if (error.message === ERROR_MESSAGES.NO_DATA) {
                message.info('No data available for download');
            } else if (error.message === ERROR_MESSAGES.CANCELLED) {
                message.info('Download was cancelled');
            } else if (
                error.message.includes('timeout') ||
                error.message === ERROR_MESSAGES.TIMEOUT_ERROR
            ) {
                message.error('Download timeout. Please try again');
            } else if (error.message === ERROR_MESSAGES.NETWORK_ERROR) {
                message.error('Network error. Please check your connection');
            } else {
                console.error('Download error:', error);
                message.error(error.message || ERROR_MESSAGES.DOWNLOAD_FAILED);
            }
            onError?.(error);
        } finally {
            setIsDownloading(false);
            setDownloadProgress(0);
            abortControllerRef.current = null;
        }
    };

    return {
        download,
        isDownloading,
        downloadProgress,
        cancelDownload,
    };
};

export default useDownloadReport;
