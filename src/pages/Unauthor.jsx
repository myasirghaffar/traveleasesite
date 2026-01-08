import { Link, useLocation } from "react-router-dom";

const UnauthorizedPage = () => {
    const location = useLocation();
    const reason = location.state?.reason;
    const attemptedPath = location.state?.attemptedPath;

    // Determine the message based on the reason
    const getMessage = () => {
        if (reason === "admin_access_required" || attemptedPath?.startsWith("/admin")) {
            return "Only admin can access the dashboard";
        }
        return "You do not have permission to access this page";
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 text-gray-900'>
            <div className='text-center rounded-xl flex flex-col md:flex-row items-center justify-center gap-8 px-4'>
                <div className='size-36 flex-shrink-0'>
                    <img src='/illustration.png' alt="Unauthorized" className='w-full h-full object-contain' />
                </div>
                <div className='flex flex-col items-center md:items-start'>
                    <h1 className='text-6xl font-bold text-primary mb-4'>401</h1>
                    <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
                        Unauthorized Access
                    </h2>
                    <p className='text-gray-600 mt-2 text-lg max-w-md mb-6'>
                        {getMessage()}
                    </p>
                    <div className='flex gap-4'>
                        <Link 
                            to='/' 
                            className='inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-800 transition font-medium'
                        >
                            Go Home
                        </Link>
                        <Link 
                            to='/login' 
                            className='inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium'
                        >
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
