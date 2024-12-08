import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';

const EditHotel = () => {
  const { id } = useParams(); // Get hotel ID from URL
  const [hotelDetails, setHotelDetails] = useState({});
  const { register, handleSubmit, reset } = useForm(); // Form hooks
  const navigate = useNavigate();

  // Fetch hotel details and populate the form
  useEffect(() => {
    axios.get(`/api/v1/hotels/${id}`)
      .then(response => {
        setHotelDetails(response.data);
        reset(response.data); // Auto-fill form with response data
      })
      .catch(error => console.error('Error fetching hotel details:', error));
  }, [id, reset]);

  // Update hotel details
  const onSubmit = async (data) => {
    try {
      await axios.put(`/api/v1/hotels/${id}`, data);
      toast.success('Hotel updated successfully!');
      navigate('/hotel-list'); // Redirect back to the list page
    } catch (error) {
      toast.error('Failed to update hotel.');
    }
  };

  return (
    <div className="container my-5">
      <h2>Edit Hotel</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Hotel Name</label>
          <input 
            type="text" 
            className="form-control" 
            {...register('name', { required: true })} 
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input 
            type="text" 
            className="form-control" 
            {...register('location', { required: true })} 
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea 
            className="form-control" 
            {...register('description')} 
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success">Update Hotel</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditHotel;
