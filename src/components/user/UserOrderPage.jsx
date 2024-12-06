import React, { useState, useEffect } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import toast from "react-hot-toast";
import Loading from "../user/Loading"

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosinstance({
        url: "/user/orders",
        method: "GET",
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="orders-container p-4">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-gray-100"
            >
              <h2 className="text-lg font-semibold mb-2">Order #{order._id}</h2>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <ul className="list-disc pl-5 mt-2">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.quantity} × $
                    {(product.price / 100).toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-sm">
                <strong>Placed On:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrdersPage;
