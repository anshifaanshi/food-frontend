import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


import toast from "react-hot-toast";


export const Card = ({ hotels }) => {
  
  const defaultImage = "https://www.ubereats.com/_static/711d51ca1b458931.webp";
  
  return (
    <div className="container">
    <div className="card">
    <img src={hotels?.image || 'default-image.jpg'} alt={hotels?.name} className="card-img-top" />
    <div className="card-body">
      <h5 className="card-title">{hotels?.name}</h5>
      <p className="card-text">{hotels?.description}</p>
      <p className="card-text">{hotels?.phone}</p>
      <p className="card-text">{hotels?.email}</p>
      </div>
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
