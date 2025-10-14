import { Col, Form, message, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import nuroSale from '@/assets/logo/logo.png';
import HelmetHeader from '@/components/HelmetHeader';
import useGeolocation from '@/hooks/useGeolocation';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { userLoggedIn } from '@/redux/features/auth/authSlice';

import ActionButton from './components/ActionButton';
import LoginInput from './components/LoginInput';
import LoginPassword from './components/LoginPassword';

export default function Loginpage() {
    const [form] = Form.useForm();
    const [triggerLogin, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { location, hasLocation, error, retry, contextHolder } = useGeolocation();

    const onLogin = useCallback(
        async (values) => {
            if (!hasLocation) {
                message.error(error || 'Unable to retrieve location. Please try again.');
                retry();
                return;
            }

            message.loading({ content: 'Logging in...', key: 'login' });

            try {
                const res = await triggerLogin({
                    ...values,
                    ...location,
                    loggedOn: 'Web',
                });

                const { payload, access_token: accessToken } = res?.data?.data || {};

                if (accessToken && payload) {
                    // Store auth data in Redux
                    dispatch(
                        userLoggedIn({
                            accessToken,
                            user: payload,
                        })
                    );

                    message.success({
                        content: 'Login successful! Redirecting...',
                        key: 'login',
                        duration: 2,
                    });

                    // Redirect to home/dashboard
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                } else {
                    throw new Error(res?.error?.data?.message || 'Login failed');
                }
            } catch (err) {
                message.error({
                    content: err.message || 'Something went wrong',
                    key: 'login',
                    duration: 4,
                });
            }
        },
        [location, triggerLogin, navigate, hasLocation, error, retry, dispatch]
    );

    const handleSubmit = useCallback(() => {
        form.validateFields()
            .then((values) => {
                onLogin(values);
            })
            .catch(() => {
                message.error('Please fill in all required fields');
            });
    }, [form, onLogin]);

    const handleKeyPress = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                handleSubmit();
            }
        },
        [handleSubmit]
    );

    return (
        <>
            {contextHolder}
            <HelmetHeader title="Login" />
            <Row style={{ minHeight: '100vh' }}>
                <Col span={12} className="login-left-site-container">
                    <div className="login-left-site">
                        <div style={{ textAlign: 'center' }}>
                            <p className="login-semi-title">Nice to see you again</p>
                            <h1 className="login-title">WELCOME BACK</h1>
                            <div
                                style={{
                                    width: '40px',
                                    height: '5px',
                                    background: 'white',
                                    margin: '0 auto',
                                }}
                            />
                        </div>
                    </div>
                </Col>
                <Col lg={12} md={24} sm={24} xs={24}>
                    <div className="login-form-container">
                        <Form
                            name="login_form"
                            className="login-form"
                            initialValues={{ remember: false }}
                            onKeyPress={handleKeyPress}
                            form={form}
                        >
                            <div
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <img alt="neuro-sales-logo" src={nuroSale} width={200} />
                                <Title
                                    level={2}
                                    style={{
                                        color: '#213CB3',
                                        marginTop: '10px',
                                    }}
                                >
                                    {/* Sign In to Your Account */}
                                </Title>
                            </div>

                            {/* Username Field */}
                            <LoginInput
                                name="username"
                                placeholder="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            />

                            {/* Password Field */}
                            <LoginPassword
                                name="password"
                                placeholder="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Password!',
                                    },
                                ]}
                            />

                            {/* Login Button */}
                            <ActionButton
                                loading={isLoading}
                                disabled={isLoading}
                                style={{
                                    width: '100%',
                                    borderRadius: '30px',
                                    backgroundColor: '#1777FF',
                                    color: '#fff',
                                    transition: 'background-color 0.5s ease, color 0.5s ease',
                                }}
                                onClick={handleSubmit}
                            >
                                Sign In
                            </ActionButton>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
}
