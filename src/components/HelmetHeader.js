import { Helmet } from 'react-helmet-async';

function HelmetHeader({ title, description }) {
    return (
        <Helmet>
            <title>{title || ''} | M-Lens</title>
            <meta name="description" content={description || ''} />
        </Helmet>
    );
}

export default HelmetHeader;
