/* eslint-disable no-nested-ternary */
import { Col, Form, message, Row, Typography } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useGeolocation from '@/hooks/useGeolocation';

import ublLogo from '../../assets/app_logo.png';
import HelmetHeader from '../../components/HelmetHeader';
import routeData from '../../data/routeData';
import {
    useForgotPasswordMutation,
    useLoginMutation,
    useRequestNewAccountMutation,
    useResetPasswordMutation,
} from '../../redux/features/auth/authApi';

import ActionButton from './components/ActionButton';
import LoginInput from './components/LoginInput';
import LoginPassword from './components/LoginPassword';
import LoginTextArea from './components/LoginTextArea';

const { Title } = Typography;

function Login() {
    const [form] = Form.useForm();
    const [userId, setUserId] = useState(null);
    const [login, { data, isLoading }] = useLoginMutation();
    const [resetPassword, { isLoading: resetLoading }] = useResetPasswordMutation();
    const [createNewAccount, { isLoading: newAccLoading }] = useRequestNewAccountMutation();
    const [forgotPassword, { isLoading: forgotLoading }] = useForgotPasswordMutation();
    // const [errorMessage, setErrorMessage] = useState('');
    const [action, setAction] = useState('signIn');
    const navigate = useNavigate();
    const { location, hasLocation, error, loading, getLocation, retry, contextHolder } =
        useGeolocation();

    // --- Handlers ---
    const handleResetPassword = useCallback(
        async (values) => {
            if (!hasLocation) {
                message.error(error || 'Unable to retrieve location. Please try again.');
                retry();
                return;
            }
            if (values?.password !== values?.confirmPass) {
                message.error('Password does not match');
                return;
            }
            const payloadData = { userId, newPassword: values?.password };
            const res = await resetPassword(payloadData);
            if (res?.data) {
                message.success(res?.data?.message || 'Successfully reset password');
                setAction('signIn');
                form.resetFields();
            } else {
                message.error('Something went wrong');
            }
        },
        [location, userId, resetPassword, form]
    );

    const onLogin = useCallback(
        async (values) => {
            if (!hasLocation) {
                retry();
                return;
            }
            // setErrorMessage('');
            message.loading({ content: 'Logging in...', key: 'login' });

            const res = await login({
                ...values,
                ...location,
                loggedOn: 'Web',
            });
            const { payload, access_token } = res?.data?.data || {};
            if (payload?.requireNewPassword || (payload?.forgetPassword && payload?.id)) {
                setAction('resetPass');
                setUserId(payload?.id);
                form.resetFields();
            } else if (!payload?.requireNewPassword && access_token) {
                // if (res?.error?.message) setErrorMessage(res?.error?.message);
                // if (errorMessage) message?.error(errorMessage || 'Something went wrong');
                if (access_token && payload) {
                    const findRoute = routeData.find(
                        (item) => item.name === payload?.landingPage?.label
                    );

                    message.success({ content: 'Login successful', key: 'login', duration: 2 });

                    setAction('signIn');
                    navigate(findRoute.path);
                    window.location.reload();
                }
            } else {
                message.error(
                    res?.error?.message || res?.error?.data?.message || 'Something went wrong'
                );
                // setErrorMessage(
                //     res?.error?.message || res?.error?.data?.message || 'Something went wrong'
                // );
            }
        },
        [location, login, form, navigate]
    );

    const onNewAccRequest = useCallback(
        async (values) => {
            const payload = { ...values, username: 'N/A' };
            const res = await createNewAccount(payload);
            if (res?.data?.data) {
                message.success('New account request sent successfully');
                form.resetFields();
                setAction('signIn');
            } else {
                message.error('Something went wrong. Please try again');
            }
        },
        [createNewAccount, form]
    );

    const handleForgotPassword = useCallback(
        async ({ email }) => {
            const res = await forgotPassword({ email });
            if (res?.data) {
                message.success(res?.data?.message || 'New account request sent successfully');
                form.resetFields();
                setAction('signIn');
            } else {
                message.error(
                    res?.error?.data?.message || 'Something went wrong. Please try again'
                );
            }
        },
        [forgotPassword, form]
    );

    // --- Form Key Handler ---
    const handleKeyPress = useCallback(
        (e) => {
            if (e.key !== 'Enter') return;
            form.validateFields()
                .then((values) => {
                    if (action === 'signIn') onLogin(values);
                    else if (action === 'resetPass') handleResetPassword(values);
                    else if (action === 'newAcc') onNewAccRequest(values);
                    else if (action === 'forgotPass') handleForgotPassword(values);
                })
                .catch(() => {});
        },
        [action, form, onLogin, handleResetPassword, onNewAccRequest, handleForgotPassword]
    );

    // --- Rendered Form Content ---
    const renderFormFields = () => {
        if (action === 'newAcc') {
            return (
                <>
                    <LoginInput
                        name="name"
                        placeholder="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    />
                    <LoginInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    />
                    <LoginInput
                        name="territory"
                        placeholder="Territory Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Territory Name!',
                            },
                        ]}
                    />
                    <LoginTextArea
                        name="note"
                        placeholder="Note"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Note!',
                            },
                        ]}
                    />
                </>
            );
        }
        if (action === 'forgotPass') {
            return (
                <LoginInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    rules={[{ required: true, message: 'Please input your Email!' }]}
                />
            );
        }
        // signIn or resetPass
        return (
            <>
                {action !== 'resetPass' && (
                    <LoginInput
                        name="username"
                        placeholder="Username"
                        rules={[
                            {
                                required: action === 'signIn',
                                message: 'Please input your Username!',
                            },
                        ]}
                    />
                )}
                <LoginPassword
                    name="password"
                    placeholder="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                        { max: 64, message: 'Maximum 64 characters' },
                        {
                            pattern:
                                action === 'resetPass'
                                    ? /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,64})\S$/gm
                                    : /.*/,
                            message:
                                'Minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                        },
                    ]}
                />
                {action === 'resetPass' && (
                    <LoginPassword
                        name="confirmPass"
                        placeholder="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please re-type your Password!',
                            },
                            { max: 64, message: 'Maximum 64 characters' },
                            {
                                pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,64})\S$/gm,
                                message:
                                    'Minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
                            },
                            ({ _getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && value !== form.getFieldValue('password')) {
                                        return Promise.reject(
                                            new Error(
                                                'The two passwords that you entered do not match!'
                                            )
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    />
                )}
            </>
        );
    };

    // --- Button Styles ---
    const getButtonStyle = (active) => ({
        width: '100%',
        borderRadius: '30px',
        backgroundColor: active ? '#1777FF' : '#fff',
        color: active ? '#fff' : '#000',
        transition: 'background-color 0.5s ease, color 0.5s ease',
    });

    return (
        <>
            {contextHolder}
            <HelmetHeader title="Login" />
            <Row>
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
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: false }}
                            onKeyPress={handleKeyPress}
                            form={form}
                        >
                            <div className="text-center flex flex-col justify-center items-center">
                                <img alt="ubl logo" src={ublLogo} width={150} />
                                <Title
                                    level={2}
                                    style={{
                                        color: '#213CB3',
                                        marginTop: '10px',
                                    }}
                                >
                                    {action === 'signIn'
                                        ? 'Sign In to Your Account '
                                        : action === 'forgotPass'
                                          ? 'Forgot Password'
                                          : action === 'newAcc' && 'New Account Details'}
                                </Title>
                            </div>
                            {renderFormFields()}
                            {/* Main Action Button */}
                            <ActionButton
                                loading={
                                    action === 'signIn'
                                        ? isLoading
                                        : action === 'resetPass'
                                          ? resetLoading
                                          : action === 'newAcc'
                                            ? newAccLoading
                                            : action === 'forgotPass'
                                              ? resetLoading || forgotLoading
                                              : false
                                }
                                disabled={
                                    newAccLoading || resetLoading || isLoading || forgotLoading
                                }
                                style={getButtonStyle(true)}
                                onClick={() => {
                                    form.validateFields()
                                        .then((values) => {
                                            if (action === 'signIn') onLogin(values);
                                            else if (action === 'resetPass')
                                                handleResetPassword(values);
                                            else if (action === 'newAcc') onNewAccRequest(values);
                                            else if (action === 'forgotPass')
                                                handleForgotPassword(values);
                                        })
                                        .catch(() => {});
                                }}
                            >
                                {
                                    {
                                        signIn: 'Sign In',
                                        resetPass: 'Reset Password',
                                        newAcc: 'Submit Account Request',
                                        forgotPass: 'Submit',
                                    }[action]
                                }
                            </ActionButton>
                            {/* Forgot Password Button (only show if not already in forgotPass mode) */}
                            {action !== 'forgotPass' && (
                                <ActionButton
                                    loading={false}
                                    disabled={false}
                                    style={getButtonStyle(false)}
                                    onClick={() => {
                                        form.resetFields();
                                        setAction('forgotPass');
                                    }}
                                >
                                    Forgot Password?
                                </ActionButton>
                            )}
                            {/* New Account Request Button (only show if not already in newAcc mode) */}
                            {action !== 'newAcc' && (
                                <ActionButton
                                    loading={false}
                                    disabled={false}
                                    style={getButtonStyle(false)}
                                    onClick={() => {
                                        form.resetFields();
                                        setAction('newAcc');
                                    }}
                                >
                                    Request For A New Account
                                </ActionButton>
                            )}
                            {/* Back to Sign In Button (only show in forgotPass or newAcc mode) */}
                            {(action === 'forgotPass' || action === 'newAcc') && (
                                <ActionButton
                                    loading={false}
                                    disabled={false}
                                    style={getButtonStyle(false)}
                                    onClick={() => {
                                        form.resetFields();
                                        setAction('signIn');
                                    }}
                                >
                                    Back to Sign In
                                </ActionButton>
                            )}
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Login;
