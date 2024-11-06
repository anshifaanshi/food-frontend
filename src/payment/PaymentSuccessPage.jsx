

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.has('session_id')) {
            // Payment was successful
            alert('Payment successful! Thank you for your order.');
        }
    }, [location]);

    return (
        <div className="payment-success">
            <h2>Payment Successful!</h2>
            <p>Thank you for your order. You will receive an email confirmation shortly.</p>
        </div>
    );
};

export default PaymentSuccess;
