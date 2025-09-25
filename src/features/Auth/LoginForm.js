/* eslint-disable no-nested-ternary */
import { Form, Typography } from 'antd';

import ActionButton from './ActionButton';
import FormField from './FormField';

const { Title } = Typography;

function LoginForm({
    form,
    action,
    isLoading,
    isResetLoading,
    isForgotLoading,
    isNewAccLoading,
    onLogin,
    onResetPassword,
    onForgotPassword,
    onNewAccountRequest,
    setAction,
}) {
    return (
        <Form form={form}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Title level={3}>{action === 'newAcc' ? 'New Account Details' : 'Login'}</Title>
            </div>

            {/* Render form fields based on action */}
            {action === 'resetPass' ? (
                <>
                    <FormField
                        name="password"
                        placeholder="Password"
                        isPassword
                        rules={[
                            { required: true, message: 'Please input your Password!' },
                            {
                                pattern: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,64})\S$/gm,
                                message:
                                    'Minimum 8 and maximum 64 characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
                            },
                        ]}
                    />
                    <FormField
                        name="confirmPass"
                        placeholder="Confirm Password"
                        isPassword
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please re-type your Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (value && value !== getFieldValue('password')) {
                                        return Promise.reject(
                                            new Error('The two passwords do not match!')
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                    />
                </>
            ) : action === 'forgotPass' ? (
                <FormField
                    name="email"
                    placeholder="Email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                />
            ) : action === 'newAcc' ? (
                <>
                    <FormField
                        name="name"
                        placeholder="Name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    />
                    <FormField
                        name="email"
                        placeholder="Email"
                        rules={[
                            { required: true, message: 'Please input your Email!' },
                            { type: 'email', message: 'Please enter a valid email address!' },
                        ]}
                    />
                    <FormField
                        name="territory"
                        placeholder="Territory Name"
                        rules={[{ required: true, message: 'Please input your Territory Name!' }]}
                    />
                    <FormField
                        name="note"
                        placeholder="Note"
                        isTextArea
                        rules={[{ required: true, message: 'Please input your Note!' }]}
                    />
                </>
            ) : (
                <>
                    <FormField
                        name="username"
                        placeholder="Username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    />
                    <FormField
                        name="password"
                        placeholder="Password"
                        isPassword
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    />
                </>
            )}

            {/* Render action buttons */}
            <ActionButton
                loading={isLoading || isResetLoading || isForgotLoading}
                onClick={() => {
                    if (action === 'login') {
                        form.validateFields()
                            .then(onLogin)
                            .catch(() => {});
                    } else if (action === 'resetPass') {
                        form.validateFields()
                            .then(onResetPassword)
                            .catch(() => {});
                    } else if (action === 'forgotPass') {
                        form.validateFields()
                            .then(onForgotPassword)
                            .catch(() => {});
                    }
                }}
                style={{ backgroundColor: '#1777FF', color: '#fff', marginBottom: '10px' }}
            >
                {action === 'login' && 'Sign In'}
                {action === 'resetPass' && 'Reset Password'}
                {action === 'forgotPass' && 'Submit'}
            </ActionButton>

            {/* Always show "Request New Account" button */}
            <ActionButton
                loading={isNewAccLoading}
                onClick={() => {
                    if (action === 'newAcc') {
                        form.validateFields()
                            .then(onNewAccountRequest)
                            .catch(() => {});
                    } else {
                        form.resetFields();
                        setAction('newAcc');
                    }
                }}
                style={{ backgroundColor: '#fff', color: '#000', marginBottom: '10px' }}
            >
                {action === 'newAcc' ? 'Submit Account Request' : 'Request For A New Account'}
            </ActionButton>

            {/* Forgot Password link */}
            {action !== 'newAcc' && (
                <ActionButton
                    type="link"
                    onClick={() => setAction(action === 'forgotPass' ? 'login' : 'forgotPass')}
                    style={{ width: '100%', textAlign: 'center' }}
                >
                    {action === 'forgotPass' ? 'Back to Login' : 'Forgot Password?'}
                </ActionButton>
            )}
        </Form>
    );
}

export default LoginForm;
