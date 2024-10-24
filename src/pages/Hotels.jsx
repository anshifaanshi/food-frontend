
import React, { useEffect, useState } from "react";
import { axiosinstance } from "../config/axiosinstance"; 
import { Card } from "../components/Card";

export const Hotel = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        return <p>Loading...</p>;
    }

    if (data.length === 0) {
        return <p>No hotels found.</p>;
    }

    return (
        <div className="hotels">
            
            {isLoggedIn ? (
                <h1 className="hotelhead">Welcome Back! Explore Our Restaurants</h1>
            ) : (
                <h1 className="hotelhead">Explore Our Restaurants</h1>
            )}

            <div className="hotel-list">
                {data.map((hotel) => (
                    <Card hotels={hotel} key={hotel?._id} />
                ))}
            </div>
        </div>
    );
};
