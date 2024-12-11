import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';
import Loading from '../user/Loading';

const EditHotel= () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [hotelData, setHotelData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    image: '',
    cuisineType: []
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
        const response = await axiosinstance.get(`/hotel/hotelprofile/${id}`);
        const data = response?.data?.data || {};
        setHotelData(data);
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          image: data.image || '',
          cuisineType: data.cuisineType || []
        });
        console.log('Hotel details fetched:', data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        toast.error('Failed to retrieve hotel details.');
        setError('Failed to retrieve hotel details.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCuisineChange = (e) => {
    const value = e.target.value.split(',').map((cuisine) => cuisine.trim());
    setFormData((prevData) => ({
      ...prevData,
      cuisineType: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosinstance.put(`/hotel/hotelprofile/${id}`, formData);
      toast.success('Hotel details updated successfully');
      console.log('Response:', response);
    } catch (error) {
      toast.error('Failed to update hotel details');
      console.error('Error updating hotel details:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-hotel-form">
    <h1>Edit Hotel Details</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Hotel Namee</label>
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
        {formData.image && <img src={formData.image} alt="Hotel" style={{ width: '200px', height: '200px', borderRadius: '8px' }} />}
      </div>

     
    

      <button type="submit">Save Changes</button>
    </form>
  </div>
  );
};

export default EditHotel;
