import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate and useParams
import { axiosinstance } from "../config/axiosinstance"; // Import axiosinstance
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import Header from "../components/Header";
import Loading from "../components/user/Loading";
 export const Hoteldetails = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Get the hotel ID from the URL params
    const navigate = useNavigate(); // Initialize navigate for dynamic routing

    const fetchHotelsdetails = async () => {
        try {
            if (!id) {
                throw new Error("Hotel ID is missing");
            }
            const response = await axiosinstance.get(`/hotel/hotelprofile/${id}`);
            setData(response?.data?.data || {});
            console.log('Hotel details fetchedet:', response);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
            toast.error("Failed to retrieve hotel details.");
        } finally {
            setLoading(false);
        }
    };
    

   
    useEffect(() => {
        fetchHotelsdetails();
    }, [id]);

    if (loading) {
       return <Loading />
    }

    if (!data || Object.keys(data).length === 0) {
        return <p>no hotel details found</p>;
    }

    return (
      <div className="container my-5">
      <div className="row">
        <div className="col-md-8 my-3">
          <h1 className="HOTELNAME display-4">{data?.name}</h1>
          <div className="detailsdiv">
            <p className="lead text-muted">{data?.cuisineType?.join(", ")}</p>
            <p><strong>Address:</strong> {data?.address?.street}, {data?.address?.city}, {data?.address?.state}, {data?.address?.country}</p>
            <p><strong>Phone:</strong> {data?.phone}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>Rating:</strong> {data?.rating} / 5</p>
            <p><strong>Opening Hours:</strong> {data?.openingHours?.open} - {data?.openingHours?.close}</p>
            <p><strong>Website:</strong> <a href={data?.website} target="_blank" rel="noopener noreferrer">{data?.website}</a></p>
            <button 
              onClick={() => navigate('/fooditems/allfood')} 
              className="btn btn-primary mt-3 view-menu-btn"
            >
              View Menu
            </button>
          </div>
        </div>
        <div className="col-md-4 my-3 text-center">
          <img 
            src={data?.image || 'https://zepto-1-ajzu.vercel.app/assets/menu_4-CpXAwO71.png'} 
            alt="Hotel" 
            className="img-fluid rounded shadow hotel-image" 
          />
          <p className="mt-2 status-text">{data?.isActive ? 'Status: Active' : 'Status: Inactive'}</p>
        </div>
      </div>
    </div>
    )
  }