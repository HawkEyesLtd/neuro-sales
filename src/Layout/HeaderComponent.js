import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Popover } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router-dom';

import { useWhoAmIQuery } from '../redux/features/auth/authApi';

function HeaderComponent() {
    const navigate = useNavigate();

    const viewProfile = () => {
        navigate('/profile');
    };

    // user prover information
    const content = (
        <div>
            <Button type="primary" onClick={viewProfile}>
                <UserOutlined /> View Profile
            </Button>
        </div>
    );

    const { data: profileData } = useWhoAmIQuery({}, {});
    return (
        <Header
            style={{
                padding: '0 50px 0 0',
                background: '#0050a5',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="" style={{ textAlign: 'center', width: '100%' }}>
                    <p className="system-title">M-Lens</p>
                </div>
                <div className="user">
                    <Popover content={content}>
                        <Avatar
                            size={40}
                            icon={<UserOutlined />}
                            src={profileData?.data?.image?.original}
                        />
                    </Popover>
                </div>
            </div>
        </Header>
    );
}

export default HeaderComponent;
