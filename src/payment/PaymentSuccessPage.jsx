

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
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
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div className="payment-success-container text-center p-4 rounded shadow-lg">
          <h2 className="text-success mb-3">Payment Successful!</h2>
          <p className="text-secondary mb-4">Thank you for your order. Your payment has been processed successfully.</p>
          <Link to="/">
            <button className="btn btn-primary">Back To Home</button>
          </Link>
        </div>
      </div>
    );
};

export default PaymentSuccess;
