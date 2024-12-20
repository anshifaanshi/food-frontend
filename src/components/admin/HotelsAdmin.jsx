import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance"; 
import { Link } from "react-router-dom"; 

export const HotelAdmin = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // 🔥 Extract role from the token to determine if user is an admin
    const token = JSON.parse(localStorage.getItem("userToken")); 
    const isAdmin = token?.role === 'admin'; // Check if user has admin role

    const fetchHotels = async () => {
        try {
            const response = await axiosinstance.get("/hotel/hotels"); 
            setData(response?.data?.data || []);
            console.log("Hotels fetched:", response);
        } catch (error) {
            console.error("Error fetching hotels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("userToken"); 
        console.log("Token found in local storage:", token); 
        if (token) {
            setIsLoggedIn(true);
        }
        console.log("User login status:", isLoggedIn); 
        fetchHotels();
    }, []);

    useEffect(() => {
        console.log("isLoggedIn state updated:", isLoggedIn);
    }, [isLoggedIn]);

    if (loading) {
      return <p>Please wait...</p>; // Added `return` to avoid errors
    }

    if (data.length === 0) {
      return <p>No hotels found</p>; // Added `return` to avoid errors
    }

    return (
      <div className="hotels1">
        {isLoggedIn ? (
          <h1 className="hotelhead1">Welcome Back! Explore Our Restaurants</h1>
        ) : (
          <h1 className="hotelhead1">Explore Our Restaurants</h1>
        )}

        <div className="hotel-list container">
          <div className="row">
            {data?.length ? (
              data.map((hotel) => (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={hotel?._id}>
                  <div className="card shadow-sm rounded hotel-card">
                    <img
                      src={hotel?.image ?? 'default-image.jpg'}
                      alt={hotel?.name}
                      className="card-img-top rounded-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{hotel?.name}</h5>
                      <p className="card-text text-muted small">{hotel?.description}</p>
                      <p className="card-text text-muted small">
                        <strong>Phone:</strong> {hotel?.phone}
                      </p>
                      <p className="card-text text-muted small">
                        <strong>Email:</strong> {hotel?.email}
                      </p>
                      <Link
                            to={`/hoteledit/${hotel?._id}`}
                            className="btn btn-secondary btn-edit"
                          >
                            Edit
                          </Link>
                      <div className="text-center"></div>

                      {isAdmin && (
                        <div className="text-center mt-2">
                          <Link
                            to={`/admin/hoteledit/${hotel?._id}`}
                            className="btn btn-secondary btn-edit"
                          >
                            Edit
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hotels available</p>
            )}
          </div>
        </div>
      </div>
    );
}
export default HotelAdmin;
