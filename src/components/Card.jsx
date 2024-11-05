import React from "react";
import { Link } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";


export const Card = ({ hotels }) => {
  
  const defaultImage = "https://www.ubereats.com/_static/711d51ca1b458931.webp";
  
  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4"> {/* Use appropriate classes for responsiveness */}
          <div className="card h-100">
            <figure className="mb-0 d-flex justify-content-center align-items-center p-3">
              <img
                src={hotels?.image ? hotels.image : defaultImage}
                alt={hotels?.name}
                className="card-img-top hotelimage rounded-circle"
              />
            </figure>
            <div className="hotelcard card-body text-center">
              <h5 className="card-title">{hotels?.name}</h5>
              <p className="card-text">
                <strong>Address:</strong> {hotels?.address?.street}, {hotels?.address?.city}, {hotels?.address?.state}, {hotels?.address?.country}
              </p>
              <p className="card-text">
                <strong>Rating:</strong> {hotels?.rating} / 5
              </p>
              <p className="card-text">
                <strong>Cuisine:</strong> {hotels?.cuisineType?.join(", ")}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {hotels?.phone}
              </p>
              <p className="card-text">
                <strong>Email:</strong> {hotels?.email}
              </p>
              <div className="d-flex justify-content-center">
                <Link to={`/hotel/hotelprofile/${hotels?._id}`} className="btn btn-primary">
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};






// CartItem Component
export const CartItem = ({ item, onRemove }) => {
  const styles = {
    cart: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      margin: '10px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textCenter: {
      textAlign: 'center',
    },
    itemName: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    itemPrice: {
      fontSize: '18px',
      color: '#333',
    },
    itemQuantity: {
      fontSize: '16px',
    },
    removeButton: {
      padding: '5px 10px',
      backgroundColor: '#ff4d4d',
      color: 'white',
      border: 'none',
      borderRadius: '3px',
      cursor: 'pointer',
    },
  };

  const handleRemove = async () => {
    const confirmRemove = window.confirm("Are you sure you want to remove this item from your cart?");
    if (!confirmRemove) return;

    try {
      await axiosinstance.delete('/cart/remove', { data: { ID: item.foodItemId } });
      console.log('Item removed from server');
      
      // Trigger removal in parent component
      onRemove(item.foodItemId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.cart}>
      <div style={styles.textCenter}>
        <h2 style={styles.itemName}>{item.name}</h2>
        <h3 style={styles.itemPrice}>${item.price}</h3>
        <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
        <button onClick={handleRemove} style={styles.removeButton}>
          Remove
        </button>
      </div>
    </div>
  );
};

// Cart Component
export const Cart = ({ initialCartData }) => {
  const [cartData, setCartData] = useState(initialCartData);

  const handleRemoveItem = (foodItemId) => {
    const updatedFoodItems = cartData.foodItems.filter(item => item.foodItemId !== foodItemId);

    const updatedTotalPrice = updatedFoodItems.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    setCartData({
      ...cartData,
      foodItems: updatedFoodItems,
      totalPrice: updatedTotalPrice,
    });
  };

  return (
    <div>
      {cartData.foodItems.map(item => (
        <CartItem key={item.foodItemId} item={item} onRemove={handleRemoveItem} />
      ))}
      <h3>Total Price: ${cartData.totalPrice.toFixed(2)}</h3>
    </div>
  );
};
