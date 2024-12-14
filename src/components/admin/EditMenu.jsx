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
    console.log('Updated Food Item:', updatedFoodItem); // Debug
  
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
    <div class="edit-food-list p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-8 text-primary">Edit Food Items</h1>
    
    {foodItems.map((item) => (
      <form
        key={item._id}
        onSubmit={(e) => handleSubmit(e, item._id)}
        className="space-y-6 border-b border-gray-200 pb-6 mb-8"
      >
        <div className="form-control">
          <label htmlFor={`name-${item._id}`} className="label">
            <span className="label-text font-semibold text-lg">Food Name</span>
          </label>
          <input
            type="text"
            id={`name-${item._id}`}
            name="name"
            value={item.name}
            onChange={(e) => handleChange(e, item._id)}
            placeholder="Enter food name"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
  
        <div className="form-control">
          <label htmlFor={`description-${item._id}`} className="label">
            <span className="label-text font-semibold text-lg">Description</span>
          </label>
          <textarea
            id={`description-${item._id}`}
            name="description"
            value={item.description}
            onChange={(e) => handleChange(e, item._id)}
            placeholder="Enter food description"
            className="textarea textarea-bordered w-full h-24 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>
  
        <div className="form-control">
          <label htmlFor={`price-${item._id}`} className="label">
            <span className="label-text font-semibold text-lg">Price</span>
          </label>
          <input
            type="number"
            id={`price-${item._id}`}
            name="price"
            value={item.price}
            onChange={(e) => handleChange(e, item._id)}
            placeholder="Enter food price"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
  
        <div className="form-control">
          <label htmlFor={`image-${item._id}`} className="label">
            <span className="label-text font-semibold text-lg">Image URL</span>
          </label>
          <input
            type="text"
            id={`image-${item._id}`}
            name="image"
            value={item.image}
            onChange={(e) => handleChange(e, item._id)}
            placeholder="Enter image URL"
            className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
  
        {item.image && (
          <div className="flex justify-center mt-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg shadow-md border border-gray-200"
            />
          </div>
        )}
  
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="btn btn-primary px-8 py-3 rounded-full text-white font-semibold tracking-wide shadow-md hover:shadow-lg hover:bg-primary-focus"
          >
            Save
          </button>
        </div>
      </form>
    ))}
  </div>
  
  );
};

export default EditMenu;