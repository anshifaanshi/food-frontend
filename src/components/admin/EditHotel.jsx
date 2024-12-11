import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../user/Loading';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';
import HotelDetail from './Copy';
const EditHotel = (hotelId) => {
  const [hotelData, setHotelData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    image: '',
    cuisineType: [],
  });

  // Fetch hotel data when component mounts
  useEffect(() => {
    axios.get(`/api/hotels/${hotelId}`)
      .then(response => {
        const data = response.data;
        setHotelData(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          image: data.image || '',
          cuisineType: data.cuisineType || [],
        });
      })
      .catch(error => console.error('Error fetching hotel data:', error));
  }, [hotelId]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle cuisine type input as a comma-separated list
  const handleCuisineChange = (e) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      cuisineType: value.split(',').map(type => type.trim())
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/hotels/${hotelId}`, formData)
      .then(response => {
        alert('Hotel details updated successfully!');
        setHotelData(response.data);
      })
      .catch(error => console.error('Error updating hotel data:', error));
  };

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
export default EditHotel