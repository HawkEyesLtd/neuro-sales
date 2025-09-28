import { Suspense } from 'react';

import LoginPage from './LoginPage';

export default function LoginPageWrapper(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPage {...props} />
        </Suspense>
    );
}
