import {
    LoadingOutlined,
    LogoutOutlined,
    SettingOutlined,
    UnlockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, Space, Spin, message } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import HelmetHeader from '../../components/HelmetHeader';
import { useLogoutMutation, useWhoAmIQuery } from '../../redux/features/auth/authApi';
import { userLoggedOut } from '../../redux/features/auth/authSlice';
import {
    useUpdateEmployeeInfoMutation,
    useUserPasswordUpdateMutation,
} from '../../redux/features/teamManagement/teamManagementApi';
import { capitalizeFirstLetter } from '../../util/miniFunction';

import ChangePassModal from './ChangePassModal';
import EditProfileModal from './EditProfileModal';

function Profile() {
    const { accessToken } = useSelector((state) => state.auth);

    const [logData, _setLogData] = useState([]);
    const dispatch = useDispatch();

    const { data: profileData, isLoading: profileLoading } = useWhoAmIQuery({}, {});

    // navigate hook
    const navigate = useNavigate();

    const [logout] = useLogoutMutation();

    const handleLogout = () => {
        logout();
        sessionStorage.removeItem('auth');
        dispatch(userLoggedOut());
        navigate('/login');
    };

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [changePassModal, setChangePassModal] = useState(false);

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    const handleChangePassModalCancel = () => {
        setChangePassModal(false);
    };

    const [updateEmployeeInfo, { data: updateProfileData }] = useUpdateEmployeeInfoMutation();
    const handleEditModalFinish = async (values) => {
        try {
            const bodyData = {
                id: profileData?.data?._id,
                name: values.name || profileData?.data.name,
                email: values.email || profileData?.data.email,
            };
            const result = await updateEmployeeInfo({ ...bodyData }).unwrap();
            if (result?.message) {
                message.success(result?.message);
            }
            setEditModalVisible(false);
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    const [userPasswordUpdate, { isLoading }] = useUserPasswordUpdateMutation();
    // password change form
    const handleChangePassModalFinish = async (values) => {
        try {
            const result = await userPasswordUpdate({
                userId: profileData?.data?._id,
                ...values,
            }).unwrap();
            message.success('Password changed successfully');
            setChangePassModal(false);
        } catch (error) {
            message.error('Something went wrong');
        }
    };

    if (profileLoading)
        return (
            <Spin
                size="large"
                fullscreen
                indicator={<LoadingOutlined spin />}
                tip="Loading..."
                spinning
            />
        );

    return (
        <>
            {/* page title and description */}
            <HelmetHeader title="Profile" />

            <EditProfileModal
                user={profileData?.data}
                visible={editModalVisible}
                onCancel={handleEditModalCancel}
                onFinish={handleEditModalFinish}
            />

            <ChangePassModal
                visible={changePassModal}
                onCancel={handleChangePassModalCancel}
                onFinish={handleChangePassModalFinish}
            />

            <div className="profile">
                <Card className="profile-card" style={{ paddingTop: '40px' }}>
                    <Avatar
                        size={220}
                        icon={<UserOutlined />}
                        src={profileData?.data?.image?.original}
                    />
                    <h2 className="text-xl font-bold m-0">{profileData?.data.name}</h2>
                    <p className="text-gray-500 text-lg">{profileData?.data.email}</p>
                    <p className="text-gray-500 ">{profileData?.data.username}</p>
                    <p className="text-gray-500">
                        {capitalizeFirstLetter(profileData?.data.kind || '')}
                    </p>
                    <Button danger type="primary" onClick={handleLogout} icon={<LogoutOutlined />}>
                        Logout
                    </Button>

                    <div className="settings-button-container">
                        <Space>
                            <Button
                                icon={<SettingOutlined />}
                                onClick={() => setEditModalVisible(true)}
                            />
                            <Button
                                icon={<UnlockOutlined />}
                                onClick={() => setChangePassModal(true)}
                            >
                                Change Password
                            </Button>
                        </Space>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Profile;
