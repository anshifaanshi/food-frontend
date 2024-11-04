import React from "react";
import { Link } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";
export const Card = ({ hotels }) => {
  
  const defaultImage = "https://www.ubereats.com/_static/711d51ca1b458931.webp";
  
  
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
  <div className="col-sm-12 col-md-6 col-lg-4">
    <div className="card h-100" >
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

  
  );
};



export const CartItem = ({ itemName, itemPrice, itemQuantity, item }) => {
  const handleremove = async (ID) => {
      const confirmRemove = window.confirm("Are you sure you want to remove this item from your cart?");
      if (!confirmRemove) return; // Exit if the user cancels

      try {
          const response = await axiosinstance({
              method: "DELETE",
              url: '/cart/remove',
              data: { ID },
          });
          console.log('Item removed:', response.data);
          toast.success("item removed from cart")
          // Optionally, update the UI or state here to reflect the item removal
      } catch (error) {
          console.log(error);
      }
  };

  return (
      <div>
         <div className="cart-container">
      <h2 className="title">Cart Summary</h2>
    
      
          <h2 className="item-name">{itemName}</h2>
          <h3 className="item-price">${itemPrice}</h3>
          <p className="item-quantity">Quantity: {itemQuantity}</p>
          <button className="remove-button" onClick={() => handleremove(item.fooditemid)}>
            Remove
          </button>
        </div>
     
    </div>
     
  );
};
