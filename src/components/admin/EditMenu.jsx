import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';

const EditMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all food items on component mount
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axiosinstance.get('/fooditems/allfood');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
        setError('Failed to retrieve food items.');
        toast.error('Failed to retrieve food items.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    setFoodItems(prevItems => 
      prevItems.map(item => 
        item._id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const updatedFoodItem = foodItems.find(item => item._id === id);
    try {
      const response = await axiosinstance.put(`/fooditems/update/${id}`, updatedFoodItem);
      toast.success('Food item updated successfully');
    } catch (error) {
      console.error('Error updating food item:', error);
      toast.error('Failed to update food item.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (foodItems.length === 0) return <div>No food items found.</div>;

  return (
    <div className="edit-food-list">
      <h1>Edit Food Items</h1>
      {foodItems.map((item) => (
        <form key={item._id} onSubmit={(e) => handleSubmit(e, item._id)}>
          <input type="text" name="name" value={item.name} onChange={(e) => handleChange(e, item._id)} />
          <input type="text" name="description" value={item.description} onChange={(e) => handleChange(e, item._id)} />
          <input type="number" name="price" value={item.price} onChange={(e) => handleChange(e, item._id)} />
          <input type="text" name="image" value={item.image} onChange={(e) => handleChange(e, item._id)} />
          <button type="submit">Save</button>
        </form>
      ))}
    </div>
  );
};

export default EditMenu;
