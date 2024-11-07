import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


import toast from "react-hot-toast";


export const Card = ({ hotels }) => {
  
  const defaultImage = "https://www.ubereats.com/_static/711d51ca1b458931.webp";
  
  return (
    <div className="container">
      <div className="row justify-content-center mb-4">
        {/* Use map to iterate over the data array */}
        {data?.data?.map((hotel) => (
          <div key={hotel._id} className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
            <div className="card h-100">
              <figure className="mb-0 d-flex justify-content-center align-items-center p-3">
                <img
                  src={hotel.image || defaultImage}
                  alt={hotel.name}
                  className="card-img-top hotelimage rounded-circle"
                />
              </figure>
              <div className="hotelcard card-body text-center">
                <h5 className="card-title">{hotel.name}</h5>
                <p className="card-text">
                  <strong>Phone:</strong> {hotel.phone}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {hotel.email}
                </p>
                <div className="d-flex justify-content-center">
                  <Link to={`/hotel/hotelprofile/${hotel._id}`} className="btn btn-primary">
                    See More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
         
  );
};






// CartItem Component
 // Ensure axios instance is correctly imported

// CartItem Component

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
    if (confirmRemove) {
      await onRemove(item.foodItemId);
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
