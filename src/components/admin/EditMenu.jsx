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
    <div className="edit-food-list p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-center mb-6">Edit Food Items</h1>
    {foodItems.map((item) => (
      <form
        key={item._id}
        onSubmit={(e) => handleSubmit(e, item._id)}
        className="space-y-6 border-b pb-6 mb-6"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor={`name-${item._id}`} className="font-medium text-lg">
            Food Name
          </label>
          <input
            type="text"
            id={`name-${item._id}`}
            name="name"
            value={item.name}
            onChange={(e) => handleChange(e, item._id)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="flex flex-col space-y-2">
          <label htmlFor={`description-${item._id}`} className="font-medium text-lg">
            Description
          </label>
          <input
            type="text"
            id={`description-${item._id}`}
            name="description"
            value={item.description}
            onChange={(e) => handleChange(e, item._id)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="flex flex-col space-y-2">
          <label htmlFor={`price-${item._id}`} className="font-medium text-lg">
            Price
          </label>
          <input
            type="number"
            id={`price-${item._id}`}
            name="price"
            value={item.price}
            onChange={(e) => handleChange(e, item._id)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        <div className="flex flex-col space-y-2">
          <label htmlFor={`image-${item._id}`} className="font-medium text-lg">
            Image URL
          </label>
          <input
            type="text"
            id={`image-${item._id}`}
            name="image"
            value={item.image}
            onChange={(e) => handleChange(e, item._id)}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
  
        {item.image && (
          <div className="flex justify-center mt-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-40 h-40 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
  
  <div className="flex justify-center mt-6">
  <button
    type="submit"
    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
