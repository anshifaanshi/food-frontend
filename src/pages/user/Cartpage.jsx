import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import { CartItem } from "../../components/Card"; 
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const { data } = await axiosinstance.get("/cart/getcart");
      setCartItems(data?.foodItems || []);
      setCartData(data);
      setFinalAmount(data.totalPrice);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      // Make an API call to remove the item
      const response = await axiosinstance.delete("/cart/remove", { data: { ID: itemId } });
      
      // Update cart items in state
      if (response.data.success) {
        const updatedCartItems = cartItems.filter(item => item.foodItemId !== itemId);
        const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        setCartItems(updatedCartItems);
        setCartData(prev => ({ ...prev, totalPrice: updatedTotalPrice })); // Update cartData if needed
        setFinalAmount(updatedTotalPrice); // Update final amount directly if required
        toast.success("Item removed successfully!");
      } else {
        toast.error("Failed to remove item. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to remove item. Please try again.");
      console.error(error);
    }
  };

  const makePayment = async () => {
    setPaymentLoading(true);
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);
      if (!stripe) {
        console.error("Stripe.js failed to load");
        return;
      }

      const session = await axiosinstance.post("/payment/create-checkout-session", {
        products: cartItems,
      }, {
        withCredentials: true 
      });

      if (session.data && session.data.sessionId) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.data.sessionId,
        });
        
        if (result.error) {
          console.error("Stripe Checkout Error:", result.error.message);
        }
      } else {
        console.error("Error: Session ID not found in response");
      }
    } catch (error) {
      console.error("Error during payment process:", error.response?.data || error.message);
      toast.error("Payment failed. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  const applyCoupon = async () => {
    console.log("Applying coupon:", couponCode);
    try {
      const response = await axiosinstance.post("/coupons/checkout", {
        couponCode,
        cartId: cartData._id,
      });

      if (response.data.message === "Coupon applied successfully") {
        const { finalAmount: updatedFinalAmount, discount: appliedDiscount } = response.data;

        setDiscount(appliedDiscount || 0);
        setFinalAmount(updatedFinalAmount || cartData.totalPrice);
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
        <h2>This is the Cart Page</h2>
        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem 
              item={item} 
              key={item.foodItemId || index} // Use unique id for key
              onRemove={handleRemoveItem} // Pass the remove handler
            />
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
              onClick={applyCoupon}
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



<div className="delivery-info bg-white p-5 rounded-lg shadow-md mt-5">
          <h3 className="text-lg font-semibold">Delivery Information</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              
              
              placeholder="Enter your delivery address"
              className="address-input border rounded-md p-2 w-full"
            />
            <p className="text-sm text-gray-600">Please enter your delivery address for accurate order processing.</p>
          </div>
        </div>

        {/* Final Amount */}
        <h2 className="mt-5">Final Amount: ${finalAmount.toFixed(2)}</h2>

        <button
          className="pay-btn bg-green-500 text-white rounded-md p-2 mt-5 hover:bg-green-600"
          onClick={makePayment}
          disabled={loading || paymentLoading} // Disable if loading
        >
          {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
};
