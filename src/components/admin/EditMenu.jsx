import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';

const EditMenu = () => {
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
      setError('Food item ID is not defined');
      return;
    }

    const fetchMenuDetails = async () => {
      try {
        if (!id) {
          throw new Error("Food item ID is missing");
        }
        const response = await axiosinstance.get(`/fooditems/${id}`);
        const menuData = response?.data?.data || {}; // Ensure menuData is extracted from the API
        setData(menuData);
        setFormData({
          name: menuData.name || '',  
          phone: menuData.phone || '',
          email: menuData.email || '',
          image: menuData.image || '',
          cuisineType: menuData.cuisineType?.join(', ') || '' 
        });
        console.log('Menu details fetched:', response);
      } catch (error) {
        console.error("Error fetching menu details:", error);
        setError('Failed to retrieve food item details.');
        toast.error("Failed to retrieve food item details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuDetails(); // Correctly call the function
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
      const response = await axiosinstance.put(`/fooditems/update/${id}`, updatedData);
      setData(response.data.data);
      toast.success('Food item details updated successfully');
    } catch (error) {
      console.error("Error updating food item details:", error);
      toast.error("Failed to update food item details.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="edit-food-form">
      <h1>Edit Menu Details</h1>

      {formData.image && (
        <img 
          src={formData.image} 
          alt={`${formData.name} image`} 
          style={{ width: '200px', height: '200px', borderRadius: '8px' }} 
        />
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Food Name</label>
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
          <label htmlFor="cuisineType">Cuisine Type</label>
          <input 
            type="text" 
            id="cuisineType" 
            name="cuisineType" 
            value={formData.cuisineType} 
            onChange={handleChange} 
          />
          <small>Enter multiple cuisines separated by commas (e.g., Italian, Chinese)</small>
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditMenu;
