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
      toast.error("hotel already exist");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div class="container mx-auto mt-10 max-w-md bg-white shadow-md rounded-lg">
    <div class="p-6">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Edit Hotel Details</h1>
  
      {formData.image && (
        <div class="flex justify-center mb-6">
          <img 
            src={formData.image} 
            alt={`${formData.name} hotel`} 
            class="w-40 h-40 object-cover rounded-lg border border-gray-200" 
          />
        </div>
      )}
  
      <form onSubmit={handleSubmit} class="space-y-4">
        <div class="form-group">
          <label htmlFor="name" class="block text-sm font-medium text-gray-700">Hotel Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            class="form-control block w-full rounded border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2.5" 
            placeholder="Enter hotel name"
          />
        </div>
  
        <div class="form-group">
          <label htmlFor="phone" class="block text-sm font-medium text-gray-700">Phone</label>
          <input 
            type="text" 
            id="phone" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
            class="form-control block w-full rounded border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2.5" 
            placeholder="Enter phone number"
          />
        </div>
  
        <div class="form-group">
          <label htmlFor="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            class="form-control block w-full rounded border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2.5" 
            placeholder="Enter email address"
          />
        </div>
  
        <div class="form-group">
          <label htmlFor="image" class="block text-sm font-medium text-gray-700">Image URL</label>
          <input 
            type="text" 
            id="image" 
            name="image" 
            value={formData.image} 
            onChange={handleChange} 
            class="form-control block w-full rounded border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2.5" 
            placeholder="Enter image URL"
          />
        </div>
  
        <button 
          type="submit" 
          class="btn btn-primary w-full py-2.5 rounded-md text-sm font-medium hover:bg-indigo-700 transition-all duration-150"
        >
          Save Changes
        </button>
      </form>
    </div>
  </div>
  

  );
};

export default HotelDetail;
