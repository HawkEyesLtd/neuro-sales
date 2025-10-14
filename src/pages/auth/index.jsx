import { Suspense } from 'react';

import LoginPage from './Loginpage';

export default function LoginPageWrapper(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPage {...props} />
        </Suspense>
    );
}
