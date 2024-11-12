
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { axiosinstance } from '../config/axiosinstance';
const PaymentSuccess = ({ clearCart }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("PaymentSuccess useEffect triggered"); // Log to confirm useEffect runs
        const queryParams = new URLSearchParams(location.search);
    
        // Check if session_id is in URL
        if (queryParams.has('session_id')) {
            console.log("Session ID found, proceeding with cart clear");
            alert('Payment successful! Thank you for your order.');
    
            // Make the request to clear the cart
            axiosinstance.post("/cart/clear-cart", {}, { withCredentials: true })
                .then((response) => {
                    console.log("Cart cleared successfully:", response.data);
                    clearCart(); // Optional frontend cart clearing
                })
                .catch((error) => {
                    console.error("Error clearing cart:", error.response?.data || error.message);
                });

            
            setTimeout(() => {
                navigate("/user/dashboard");  // Redirect to dashboard or another page
            }, 2000);
        } else {
            
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

