

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
        <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="payment-success bg-white p-10 rounded-lg shadow-lg text-center max-w-sm">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-gray-700 mb-6">Thank you for your order. Your payment has been processed successfully.</p>
          <Link to="/">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-300">
              Back To Home
            </button>
          </Link>
        </div>
      </div>
    );
};

export default PaymentSuccess;
