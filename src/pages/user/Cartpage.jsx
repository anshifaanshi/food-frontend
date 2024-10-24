
import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import { CartCards } from "../../components/Card";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify"; // For notifications

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const { data } = await axiosinstance({
        method: "GET",
        url: "/cart/getcart",
      });
      setCartItems(data?.foodItems || []);
      setCartData(data); // Set cartData with the fetched data
      setFinalAmount(data.totalPrice); // Initialize finalAmount to totalPrice
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async () => {
    try {
      console.log("Payment button clicked"); 
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key); // Use the correct case

      console.log(import.meta.env.VITE_STRIPE_Publishable_key);
      const session = await axiosinstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: { products: cartItems },
      });

      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      if (result.error) {
        console.log(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyCoupon = async () => {
    console.log("Applying coupon:", couponCode);
    try {
      const response = await axiosinstance({
        url: "/coupons/checkout",
        method: "POST",
        data: {
          couponCode,
          cartId: cartData._id,
        },
      });

      if (response.data.message === "Coupon applied successfully") {
        const { finalAmount: updatedFinalAmount, discount: appliedDiscount } = response.data;

        // Update state with the correct values
        setDiscount(appliedDiscount || 0);
        setFinalAmount(updatedFinalAmount || cartData.totalPrice); // Use updated final amount from response
        toast.success("Coupon applied successfully!");
      }
    } catch (error) {
      console.error("Coupon application error:", error);
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="flex gap-10 px-20 py-10">
      <div className="w-8/12">
        <h2>This is the cart Page</h2>

        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((value, index) => (
            <CartCards item={value} key={index} />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5 p-5 rounded-lg shadow-md">
        <h2>Price Summary</h2>
        <h2>Total Price: ${cartData?.totalPrice?.toFixed(2) || "N/A"}</h2>

        {/* Coupon Section */}
        <div className="coupon-section bg-white p-5 rounded-lg shadow-md mt-5">
          <h3 className="text-lg font-semibold">Have a coupon?</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="coupon-input border rounded-md p-2 w-full"
            />
            <button
              onClick={applyCoupon} // Pass the function reference
              className="apply-coupon-btn bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600"
            >
              Apply Coupon
            </button>
          </div>
        </div>

        {/* Show Discount Information */}
        {discount > 0 && (
          <div className="discount-info mt-3">
            <p>Discount: -${discount.toFixed(2)}</p>
          </div>
        )}

        {/* Final Amount */}
        <h2 className="mt-5">Final Amount: ${finalAmount.toFixed(2)}</h2>

        <button
          className="pay-btn bg-green-500 text-white rounded-md p-2 mt-5 hover:bg-green-600"
          onClick={makePayment}
          disabled={loading}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};
