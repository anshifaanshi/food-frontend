

import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';


const PaymentSuccess = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has('session_id')) {
            // Payment was successful
            alert('Payment successful! Thank you for your order.');
        }
        setLoading(false); // Stop loading once check is complete
    }, [location]);

    if (loading) {
        return <p className="flex items-center justify-center text-2xl font-semibold text-gray-700">
        <span className="mr-3 animate-spin text-blue-500">🔄</span>
        Loading...
    </p>
    ; // Display loading spinner while loading is true
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="payment-success-container text-center p-4 rounded shadow-lg">
                <h2 className="text-success mb-3">Payment Successful!</h2>
                <p className="text-secondary mb-4">
                    Thank you for your order. Your payment has been processed successfully.
                </p>
                <Link to="/">
                    <button className="btn btn-primary">Back To Home</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
