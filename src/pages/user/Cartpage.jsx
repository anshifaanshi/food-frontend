import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import { CartItem } from "../../components/Card"; 
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";
import  {useNavigate} from "react-router-dom"
export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartData, setCartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);


  const navigate=useNavigate();

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const { data } = await axiosinstance.get("/cart/getcart");
      setCartItems(data?.foodItems || []);
      setCartData(data);
      setFinalAmount(data.totalPrice);
      setError(null);
    } catch (error) {
      setError("Failed to load cart items. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await axiosinstance.delete("/cart/remove", { data: { ID: itemId } });
      
      if (response.data.success) {
        const updatedCartItems = cartItems.filter(item => item.foodItemId !== itemId);
        const updatedTotalPrice = updatedCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        setCartItems(updatedCartItems);
        setCartData(prev => ({ ...prev, totalPrice: updatedTotalPrice }));
        setFinalAmount(updatedTotalPrice);
        toast.success("Item removed successfully!");
      } else {
        toast.error("Failed to remove item.");
      }
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  //const handleUpdateQuantity = async (itemId, newQuantity) => {
  //  try {
      // Send the update to your backend
   //   const response = await axiosinstance.put("/cart/update-quantity", {
    //    itemId,
     //   quantity: newQuantity,
     // });
      
     // if (response.data.success) {
        // Update local state with the new quantity
       // const updatedCartItems = cartItems.map(item => 
        //  item.foodItemId === itemId ? { ...item, quantity: newQuantity } : item
        //);
        
       // const updatedTotalPrice = updatedCartItems.reduce(
        //  (total, item) => total + item.price * item.quantity,
        //  0
       // );
        
       // setCartItems(updatedCartItems);
        //setCartData(prev => ({ ...prev, totalPrice: updatedTotalPrice }));
       // setFinalAmount(updatedTotalPrice);
    //  } else {
      //  toast.error("Failed to update quantity.");
    //  }
   // } catch (error) {
    //  toast.error("Failed to update quantity...");
   // }
 //
 // };
  
 const handleQuantityChange = (itemId, newQuantity) => {
  const updatedCartItems = cartItems.map((item) =>
    item.foodItemId === itemId ? { ...item, quantity: newQuantity } : item
  );

  const updatedTotalPrice = updatedCartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  setCartItems(updatedCartItems);
  setFinalAmount(updatedTotalPrice);
};
const makePayment = async () => {
  setPaymentLoading(true);
  try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);
      if (!stripe) {
          console.error("Stripe.js failed to load");
          return;
      }

      // Start the checkout session
      const session = await axiosinstance.post("/payment/create-checkout-session", {
          products: cartItems,
      }, {
          withCredentials: true 
      });

      if (session.data) {
          // Redirect to Stripe's checkout
          const result = await stripe.redirectToCheckout({
              sessionId: session.data.sessionId,
          });
          
          // If there's an error in the Stripe redirect, notify the user
          if (result.error) {
               //toast.error("Payment failed. Please try again.");
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

// Call clearCart function after successful payment redirection
const handleSuccessRedirect = () => {
  clearCart(); // Clear the cart in the frontend
  navigate("/user/payment/success"); // Redirect to success page
};

const clearCart = () => {
  setCartItems([]); // Update cart items in state
  localStorage.removeItem("cart"); // Clear cart in local storage
};

// Now, call `handleSuccessRedirect()` on the success page
// Use `useEffect` on the success page to clear the cart when the user arrives there.



 
  const applyCoupon = async () => {
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
      toast.error(error.response?.data?.message || "Failed to apply coupon.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="flex gap-10 px-20 py-10">
      <div className="w-8/12">
        
        {loading ? (
          <p>Loading cart items...</p>
        ) : error ? (
          <p>{error}</p>
        ) : cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem 
              item={item} 
              key={item.foodItemId || index} 
              onRemove={handleRemoveItem}
              onQuantityChange={handleQuantityChange}
              
            />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      <div className="w-6/12 bg-base-300 flex flex-col items-center gap-5 p-5 rounded-lg shadow-md">
        <h2>Price Summary</h2>
        <h2>Total Price: ${finalAmount.toFixed(2)} </h2>

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

        {/* Final Amount */}
        <h2 className="mt-5">Final Amount: ${finalAmount.toFixed(2)}</h2>

        <button
          className="pay-btn bg-green-500 text-white rounded-md p-2 mt-5 hover:bg-green-600"
          onClick={makePayment}
          disabled={loading || paymentLoading}
        >
          {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      </div>
      
      <ToastContainer
        position="top-center" 
        autoClose={5000} // Adjust this value to control how long the toast stays
        hideProgressBar={false} 
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
