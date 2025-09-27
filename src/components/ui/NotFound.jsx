function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="content">
                <div className="largeText">404</div>
                <div className="mediumText">Oops! Page not found</div>
                <div className="smallText">
                    The page you are looking for might have been removed or is temporarily
                    unavailable.
                </div>
                <a href="/" className="link">
                    Go back to the homepage
                </a>
            </div>
        </div>
    );
}

export default NotFound;
