import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { userLoggedIn } from '@/redux/features/auth/authSlice';
import authStorage from '@/utils/authStorage';

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const auth = authStorage.load();

        if (auth?.accessToken && auth?.user) {
            dispatch(
                userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                })
            );
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}
