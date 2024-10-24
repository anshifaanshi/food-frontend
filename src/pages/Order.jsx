import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  console.log('Orders:', orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
      
        const response = await axios.get('/order');
        
        
        console.log('Response data:', response.data);
        
        
        setOrders(response.data.orders || []);
        setLoading(false);
      } catch (error) {
        
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Order History</h2>
      
      
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Order #{order.id}: {order.items.length} items - ${order.totalPrice}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
