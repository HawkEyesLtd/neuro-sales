import { Button, Space, message, notification } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import excelIcon from '../../assets/excel.png';
import HelmetHeader from '../../components/HelmetHeader';
import { setGlobalLoading } from '../../redux/features/loaderSlice';
import { useAllocateMaterialViaExcelMutation } from '../../redux/features/materialManagement/materialManagementApi';

function AllocateMaterial() {
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (successText, description) => {
        api.open({
            message: successText,
            duration: 0,
        });
    };

    const [selectedFile, setSelectedFile] = useState(null);

    const dispatch = useDispatch();

    const download = () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_API_URL}/v1/material/dh-allocation-template`;
        link.setAttribute('download', `Material-allocation.xlsx`);
        // Append to html link element page
        document.body.appendChild(link);
        // Start download
        link.click();
        // Clean up and remove the link
        link.parentNode.removeChild(link);
    };

    const [allocateMaterialViaExcel, { data, isLoading }] = useAllocateMaterialViaExcelMutation();

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const submitMaterial = async () => {
        if (selectedFile?.name) {
            try {
                dispatch(setGlobalLoading(false));

                const formData = new FormData();
                formData.append('file', selectedFile);

                const result = await allocateMaterialViaExcel(formData).unwrap();
                setSelectedFile(null);
                if (result?.message) {
                    message.success(result.message);
                    openNotification(result.message);
                }
            } catch (error) {
                message.error(error?.data?.message);
            } finally {
                dispatch(setGlobalLoading(false));
            }
        } else {
            message.error('Please select a file');
        }
    };

    return (
        <>
            {contextHolder}
            <HelmetHeader title="Allocate Material" />
            <div style={{ margin: '10px' }}>
                <div className="box-heading">Allocate via Excel</div>
                <div
                    style={{
                        boxShadow: '0 0 5px 0 #cec6c6',
                        padding: '10px',
                        borderRadius: '5px',
                        marginTop: '10px',
                    }}
                >
                    <Space style={{ marginTop: '10px' }}>
                        <p
                            style={{
                                margin: 0,
                                color: '#1d1c1c',
                                fontSize: '18px',
                                fontWeight: 500,
                            }}
                        >
                            To download material list click to download button
                        </p>
                        <Button
                            onClick={download}
                            size="large"
                            style={{ background: '#faad14', color: '#fff' }}
                        >
                            Download
                        </Button>
                    </Space>

                    <div className="file-upload-container">
                        <p style={{ margin: '0 5px', fontSize: '14px' }}>Upload File</p>
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <img src={excelIcon} alt="Upload Icon" className="upload-icon" />
                            Choose File
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                            accept=".xlsx"
                        />
                        {selectedFile && (
                            <div className="selected-file-name">{selectedFile.name}</div>
                        )}
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <Button
                            onClick={submitMaterial}
                            disabled={isLoading}
                            loading={isLoading}
                            size="large"
                            style={{ background: '#faad14', color: '#fff' }}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllocateMaterial;
