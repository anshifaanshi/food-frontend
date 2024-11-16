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
      setError("no items in cart to show ");
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
  const minimumAmountInCents = 50; 
  let adjustedAmount = finalAmount;
  if (adjustedAmount < minimumAmountInCents) {
    adjustedAmount = minimumAmountInCents;
  }
  setPaymentLoading(true);
  try {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_Publishable_Key);
    if (!stripe) {
      console.error("Stripe.js failed to load");
      return;
    }

    const session = await axiosinstance.post("/payment/create-checkout-session", {
      products: cartItems,
      adjustedAmount,
    }, {
      withCredentials: true 
    });

    if (session.data) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });
      
      if (result.error) {
        toast.error("Payment failed. Please try again.");
        console.error("Stripe Checkout Error:", result.error.message);
      } else {
        
        
        // Start a delay for redirection after toast success
        navigate("/user/payment/success")
        console.log("enterd clear section")
        clearCart()
       
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
    <div className="container mx-auto px-4 py-5">
  <div className="row g-4">
    {/* Cart Items Section */}
    <div className="col-md-8">
      <div className="card shadow-lg p-4 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {loading ? (
          <p className="text-gray-500">Loading cart items...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
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
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>
    </div>

    {/* Price Summary Section */}
    <div className="col-md-4">
      <div className="card shadow-lg bg-light p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Price Summary</h2>
        <p className="text-lg font-medium">Total Price: <span className="text-primary">${finalAmount.toFixed(2)}</span></p>

        {/* Coupon Section */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Have a coupon?</h3>
          <div className="input-group">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="form-control"
            />
            <button
              onClick={applyCoupon}
              className="btn btn-primary"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Discount Information */}
        {discount > 0 && (
          <div className="mt-3 text-success">
            <p>Discount: -${discount.toFixed(2)}</p>
          </div>
        )}

        {/* Final Amount */}
        <p className="mt-4 text-lg font-medium">Final Amount: <span className="text-success">${finalAmount.toFixed(2)}</span></p>

        {/* Payment Button */}
        <button
          className={`btn btn-success w-100 mt-4 ${paymentLoading ? 'disabled' : ''}`}
          onClick={makePayment}
          disabled={loading || paymentLoading}
        >
          {paymentLoading ? "Processing Payment..." : "Proceed to Payment"}
        </button>
      </div>
    </div>
  </div>

  {/* Toast Notifications */}
  <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    closeOnClick
    pauseOnHover
    theme="colored"
  />
</div>

  );
};
