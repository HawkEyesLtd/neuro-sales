import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userLoggedOut } from '@/redux/features/auth/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(userLoggedOut());
        navigate('/login');
    };

    return logout;
};

export default useLogout;
