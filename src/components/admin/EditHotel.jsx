import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';

const HotelDetail = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    image: '',
    cuisineType: ''
  });
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
        const hotelData = response?.data?.data || {};
        setData(hotelData);
        setFormData({
          name: hotelData.name || '',
          phone: hotelData.phone || '',
          email: hotelData.email || '',
          image: hotelData.image || '',
          cuisineType: hotelData.cuisineType?.join(', ') || ''
        });
        console.log('Hotel details fetched:', response);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
        toast.error("Failed to retrieve hotel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCuisineChange = (e) => {
    const { value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      cuisineType: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        ...formData,
        cuisineType: formData.cuisineType.split(',').map(type => type.trim())
      };
      const response = await axiosinstance.put(`/hotel/update/${id}`, updatedData);
      setData(response.data.data);
      toast.success('Hotel details updated successfully');
    } catch (error) {
      console.error("Error updating hotel details:", error);
      toast.error("Failed to update hotel details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-hotel-form">
    <h1>Edit Hotel Details</h1>

    {formData.image && (
      <img 
        src={formData.image} 
        alt={`${formData.name} hotel`} 
        style={{ width: '200px', height: '200px', borderRadius: '8px' }} 
      />
    )}

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

     

      <button type="submit">Save Changes</button>
    </form>
  </div>
  );
};

export default HotelDetail;
