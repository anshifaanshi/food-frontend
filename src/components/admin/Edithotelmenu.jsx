import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const Edithotelmenu = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [editingMenuItem, setEditingMenuItem] = useState(null); // For editing a specific menu item

  const { register, handleSubmit, reset } = useForm(); // For hotel form
  const { register: menuRegister, handleSubmit: handleMenuSubmit, reset: resetMenu } = useForm(); // For menu form

  // Fetch hotel details and populate form
  useEffect(() => {
    fetchHotelDetails();
    fetchMenuItems();
  }, []);

  const fetchHotelDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/hotels/${hotelId}`);
      setHotel(response.data);
      reset(response.data); // Auto-fill hotel form
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get(`/api/v1/menus/${hotelId}`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  // Update hotel details
  const updateHotel = async (data) => {
    try {
      await axios.put(`/api/v1/hotels/${hotelId}`, data);
      toast.success('Hotel updated successfully!');
      fetchHotelDetails(); // Refresh hotel details after update
    } catch (error) {
      toast.error('Failed to update hotel.');
    }
  };

  // Add new menu item
  const addMenuItem = async (menuData) => {
    try {
      await axios.post('/api/v1/menus', { ...menuData, hotel: hotelId });
      toast.success('Menu item added successfully!');
      fetchMenuItems(); // Refresh menu items after adding
      resetMenu(); // Clear menu form
    } catch (error) {
      toast.error('Failed to add menu item.');
    }
  };

  // Populate form for editing a specific menu item
  const editMenuItem = (menuItem) => {
    setEditingMenuItem(menuItem);
    resetMenu(menuItem); // Auto-fill the menu form with menu item data
  };

  // Update existing menu item
  const updateMenuItem = async (menuData) => {
    try {
      await axios.put(`/api/v1/menus/${editingMenuItem._id}`, menuData);
      toast.success('Menu item updated successfully!');
      fetchMenuItems(); // Refresh menu items
      resetMenu(); // Clear menu form
      setEditingMenuItem(null); // Exit edit mode
    } catch (error) {
      toast.error('Failed to update menu item.');
    }
  };

  return (
    <div className="container my-5">
      <h2>Edit Hotel Details</h2>
      <form onSubmit={handleSubmit(updateHotel)} className="hotel-form">
        <input {...register('name')} placeholder="Hotel Name" className="form-control my-2" />
        <input {...register('phone')} placeholder="Phone" className="form-control my-2" />
        <input {...register('email')} placeholder="Email" className="form-control my-2" />
        <input {...register('website')} placeholder="Website" className="form-control my-2" />
        
        <label>Address</label>
        <input {...register('address.street')} placeholder="Street" className="form-control my-2" />
        <input {...register('address.city')} placeholder="City" className="form-control my-2" />
        <input {...register('address.state')} placeholder="State" className="form-control my-2" />
        <input {...register('address.country')} placeholder="Country" className="form-control my-2" />

        <button type="submit" className="btn btn-primary mt-3">Update Hotel</button>
      </form>

      <hr />

      <h2>{editingMenuItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h2>
      <form onSubmit={handleMenuSubmit(editingMenuItem ? updateMenuItem : addMenuItem)} className="menu-form">
        <input {...menuRegister('name')} placeholder="Menu Item Name" className="form-control my-2" />
        <input {...menuRegister('price')} type="number" placeholder="Price" className="form-control my-2" />
        <textarea {...menuRegister('description')} placeholder="Description" className="form-control my-2"></textarea>

        <button type="submit" className="btn btn-success mt-3">
          {editingMenuItem ? 'Update Menu Item' : 'Add Menu Item'}
        </button>
      </form>

      <h3>Menu Items</h3>
      {menuItems.map((item) => (
        <div key={item._id} className="menu-item my-3 p-3 border rounded">
          <p><strong>{item.name}</strong> - ${item.price}</p>
          <p>{item.description}</p>
          <button onClick={() => editMenuItem(item)} className="btn btn-info me-2">Edit</button>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default Edithotelmenu;
