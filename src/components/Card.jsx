import React from "react";
import { Link } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";
export const Card = ({ hotels }) => {
  
  const defaultImage = "https://www.ubereats.com/_static/711d51ca1b458931.webp";
  
  
  return (
    <div className="d-flex justify-content-center align-items-center mb-4">
  <div className="col-sm-12 col-md-6 col-lg-4">
    <div className="card h-100" style={{ width: "100%" }}>
      <figure className="mb-0 d-flex justify-content-center align-items-center p-3">
        <img
          src={hotels?.image ? hotels.image : defaultImage}
          alt={hotels?.name}
          className="card-img-top hotelimage rounded-circle"
          style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%" }}
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



export const CartCards = ({ item, onRemove }) => {
  console.log('Item passed to CartCards:', item);

  
  const itemName = item?.name || "Item name not available";
  const itemPrice = item?.price || 0;
  const itemQuantity = item?.quantity || 0;

  const handleremove = async (ID) => {
      try {
          const response = await axiosinstance({
              method: "DELETE",
              url: '/cart/remove',
              data: { ID }, 
          });
          console.log('Item removed:', response.data);
      } catch (error) {
          console.log(error);
      }
  };

  return (
      <div className="cart flex w-full h-32 items-center gap-20 bg-base-300 mb-10 rounded-md justify-center">
          <div className="text-center">
              <h2>{itemName}</h2> 
              <h3>${itemPrice}</h3> 
              <p>Quantity: {itemQuantity}</p> 
              <button onClick={() => handleremove(item?.foodItemId)}> 
                  Remove
              </button>
          </div>
      </div>
  );
};

