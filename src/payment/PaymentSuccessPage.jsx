
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
const PaymentSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        

        toast.success("your order confirmed")
        const timer = setTimeout(() => {
            navigate('/user/profile'); 
        }, 5000); 

        return () => clearTimeout(timer); 
    }, [navigate]);

    return (
        <div className="payment-container">
      <h1>Payment Successful!</h1>
      <p>Your payment has been processed successfully.</p>
      <p>You will be redirected to your profile shortly.</p>
    </div>
    );
};

export default PaymentSuccessPage;
