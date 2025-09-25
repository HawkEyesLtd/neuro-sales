import { useSelector } from 'react-redux';

import isTokenExpired from '@/utils/sessionValidityCheck';

const useAuth = () => {
    const { accessToken, user } = useSelector((state) => state?.auth);

    if (accessToken && user && !isTokenExpired(accessToken)) {
        return true;
    }
    return false;
};

export default useAuth;
