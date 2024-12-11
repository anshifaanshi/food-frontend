import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../user/Loading';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';
const HotelDetail = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Hotel ID is not defined');
      return;
    }

    const fetchHotelDetails = async () => {
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

    fetchHotelDetails();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-hotel-form">
    <h1>Edit Hotel Details</h1>

    {hotelData ? (
      <div>
        <img 
          src={formData.image} 
          alt={`${formData.name} hotel`} 
          style={{ width: '200px', height: '200px', borderRadius: '8px' }} 
        />
        <h1>Hotel Name: {hotelData.name}</h1>
        <p>Phone: {hotelData.phone}</p>
        <p>Email: {hotelData.email}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Hotel Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input 
              type="text" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div>
            <label htmlFor="image">Image URL</label>
            <input 
              type="text" 
              id="image" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
            />
          </div>

          <div>
            <label htmlFor="cuisineType">Cuisine Types (comma-separated)</label>
            <input 
              type="text" 
              id="cuisineType" 
              name="cuisineType" 
              value={formData.cuisineType.join(', ')} 
              onChange={handleCuisineChange} 
              placeholder="e.g., Indian, Chinese, Continental" 
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>

        <h2>Menu</h2>
        <ul>
          {hotelData.fooditems.length > 0 ? (
            hotelData.fooditems.map((foodId, index) => (
              <li key={index}>Food Item ID: {foodId}</li>
            ))
          ) : (
            <p>No food items available.</p>
          )}
        </ul>
      </div>
    ) : (
      <p>Loading hotel data...</p>
    )}
  </div>
  );
};

export default HotelDetail;
