import React from 'react';
import { Link } from 'react-router';

const NotFoundPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center  text-textcolor-500 font-sans">
            <h1 className="text-6xl m-0">404</h1>
            <p className="text-xl my-4 text-text-color-100">Where do you think you're going?</p>
            <Link to="/" className="text-lg text-blue-500 no-underline">Go back to Home</Link>
        </div>
    );
};

export default NotFoundPage;
