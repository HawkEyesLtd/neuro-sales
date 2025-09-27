import { useSelector } from 'react-redux';

import isTokenExpired from '@/utils/sessionValidityCheck';

const useAuth = () => {
    const auth = useSelector((state) => state?.auth);
    // Handle case where auth state might be undefined
    if (!auth) {
        return false;
    }

    const { accessToken, user } = auth;

    if (accessToken && user && !isTokenExpired(accessToken)) {
        return true;
    }
    return false;
};

export default useAuth;
