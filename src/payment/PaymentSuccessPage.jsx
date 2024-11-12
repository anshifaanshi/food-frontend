
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosinstance } from '../config/axiosinstance';
import toast from 'react-hot-toast';
import Loading from '../components/user/Loading'

const PaymentSuccess = ({ clearCart }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        console.log("PaymentSuccess useEffect triggered, clearing cart");

       

        // Make API request to clear cart
        axiosinstance.post("/cart/clear-cart", { }, { withCredentials: true })
            .then((response) => {
                console.log("Cart cleared successfully:", response.data);
                clearCart(); // Optional: Clear frontend cart as well
                toast.success("Cart cleared successfully!");
            })
            .catch((error) => {
                console.error("Error clearing cart:", error.response?.data || error.message);
                
            })
            .finally(() => {
                setLoading(false);
            });

    }, [clearCart, navigate]);

    if (loading) {
        return <Loading />
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
