export const nodeEnv = import.meta.env.VITE_NODE_ENV;

const config = {
    baseUrl:
        nodeEnv === 'development'
            ? import.meta.env.VITE_BASE_URL_FOR_DEV
            : import.meta.env.VITE_BASE_URL_FOR_PROD,

    fileUploadUrl:
        nodeEnv === 'development'
            ? import.meta.env.VITE_FILE_UPLOAD_URL_FOR_DEV
            : import.meta.env.VITE_FILE_UPLOAD_URL_FOR_PROD,

    base64UploadUrl:
        nodeEnv === 'development'
            ? import.meta.env.VITE_BASE64_UPLOAD_URL_FOR_DEV
            : import.meta.env.VITE_BASE64_UPLOAD_URL_FOR_PROD,

    commUrl:
        nodeEnv === 'development'
            ? import.meta.env.VITE_COMMUNICATION_URL_FOR_DEV
            : import.meta.env.VITE_COMMUNICATION_URL_FOR_PROD,

    downloadReportUrl:
        nodeEnv === 'development'
            ? import.meta.env.VITE_DOWNLOAD_REPORT_URL_FOR_DEV
            : import.meta.env.VITE_DOWNLOAD_REPORT_URL_FOR_PROD,

    googleMapApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
};

export default config;
