// PaymentCancelPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Payment Canceled</h1>
            <p>Your payment has been canceled.</p>
            <button onClick={() => navigate('/cart')}>Return to Cart</button>
        </div>
    );
};

export default PaymentCancelPage;
