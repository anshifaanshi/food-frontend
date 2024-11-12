
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const PaymentSuccess = ({ clearCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        
        if (queryParams.has('session_id')) {
            // Payment was successful
            alert('Payment successful! Thank you for your order.');
            
            // Clear the cart in the frontend
            clearCart();

            // Optional: Redirect after a short delay if desired
            setTimeout(() => {
                navigate("/user/dashboard");  // Redirect to dashboard or another page
            }, 2000);
        } else {
            alert('Payment failed or incomplete. Please try again.');
        }
        
        setLoading(false);
    }, [location, clearCart, navigate]);

    if (loading) {
        return (
            <p className="flex items-center justify-center text-2xl font-semibold text-gray-700">
                <span className="mr-3 animate-spin text-blue-500">🔄</span>
                Loading...
            </p>
        );
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

