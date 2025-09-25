/* eslint-disable react-hooks/exhaustive-deps */

import { Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '../../redux/features/auth/authApi';
import { userLoggedOut } from '../../redux/features/auth/authSlice';

function IdleModal({ timeout, autoCloseTime }) {
    // dispatch hook
    const dispatch = useDispatch();
    // navigate hook
    const navigate = useNavigate();

    const [isIdle, setIsIdle] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [logoutCountdown, setLogoutCountdown] = useState(null);
    const idleTimerRef = useRef(null);

    const startIdleTimer = () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
            setIsModalVisible(true);
            startLogoutCountdown();
        }, timeout * 1000);
    };

    const resetIdleTimer = () => {
        clearTimeout(idleTimerRef.current);
        setIsIdle(false);
        setIsModalVisible(false);
        resetLogoutCountdown();
        startIdleTimer();
    };

    const startLogoutCountdown = () => {
        setLogoutCountdown(autoCloseTime * 1000);
    };

    const resetLogoutCountdown = () => {
        setLogoutCountdown(null);
    };

    useEffect(() => {
        startIdleTimer();

        const handleActivity = () => {
            resetIdleTimer();
        };

        // Event listeners to detect user activity
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('mousedown', handleActivity);
        document.addEventListener('keypress', handleActivity);
        document.addEventListener('touchmove', handleActivity);
        document.addEventListener('touchstart', handleActivity);
        document.addEventListener('scroll', handleActivity);

        return () => {
            clearTimeout(idleTimerRef.current);
            document.removeEventListener('mousemove', handleActivity);
            document.removeEventListener('mousedown', handleActivity);
            document.removeEventListener('keypress', handleActivity);
            document.removeEventListener('touchmove', handleActivity);
            document.removeEventListener('touchstart', handleActivity);
            document.removeEventListener('scroll', handleActivity);
        };
    }, []);

    useEffect(() => {
        if (isModalVisible && autoCloseTime) {
            const autoCloseTimer = setTimeout(() => {
                handleModalOk();
            }, autoCloseTime * 1000);

            return () => {
                clearTimeout(autoCloseTimer);
            };
        }
    }, [isModalVisible, autoCloseTime]);

    const [logout] = useLogoutMutation();

    const handleModalOk = () => {
        logout();
        setIsModalVisible(false);
        message.error('Logged out');
        sessionStorage.removeItem('auth');
        dispatch(userLoggedOut());
        navigate('/login');
        resetIdleTimer();
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        message.info('You have dismissed the idle modal.');
        resetIdleTimer();
    };

    const renderer = ({ minutes, seconds }) => <span>{`${minutes}:${seconds}`}</span>;

    return (
        <div>
            {isIdle && (
                <Modal
                    open={isModalVisible}
                    title="Session Timeout Warning"
                    footer={false}
                    // footer={[
                    //     <Button key="cancel" onClick={handleModalCancel}>
                    //         Dismiss
                    //     </Button>,
                    //     <Button key="ok" type="primary" onClick={handleModalOk}>
                    //         Continue
                    //     </Button>,
                    // ]}
                    closable={!autoCloseTime}
                    onCancel={handleModalCancel}
                >
                    <p>
                        You have been idle for too long. You will be logged out in{' '}
                        <Countdown
                            date={Date.now() + logoutCountdown}
                            renderer={renderer}
                            onComplete={handleModalOk}
                        />
                    </p>
                </Modal>
            )}
        </div>
    );
}

export default IdleModal;
