import React, { Suspense } from 'react';

const Login = React.lazy(() => import('./Login'));

export default function LoginPageWrapper(props) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login {...props} />
        </Suspense>
    );
}
