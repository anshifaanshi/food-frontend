
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosinstance } from '../config/axiosinstance';

const PaymentSuccess = ({ clearCart ,use}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem('userId');
    console.log('User ID:', userId);
    useEffect(() => {
        
         

        console.log("PaymentSuccess useEffect triggered, clearing cart");
        if (!userId) {
            console.error("User ID is required to clear the cart");
            setLoading(false);
            return;
        }
        axiosinstance.post("/cart/clear-cart", {}, { withCredentials: true })
            .then((response) => {
                console.log("Cart cleared successfully:", response.data);
                clearCart(); // Optional: clear frontend cart as well
            })
            .catch((error) => {
                console.error("Error clearing cart:", error.response?.data || error.message);
            })
            .finally(() => {
                setLoading(false);
            });

        // Optional: Redirect after a short delay
        
    }, [clearCart, navigate,userId]);

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
