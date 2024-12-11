import React, { useEffect, useState } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';
import Loading from '../../components/user/Loading';

function HotelEditPage() {
  const [hotel, setHotel] = useState({ name: '', location: '', description: '' }); // Default state for hotel
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch hotel details from API
  const fetchHotelDetails = async () => {
    setLoading(true); 
    try {
      const response = await axiosinstance({
        url: `/hotel/hotelprofile/${id}`, // Assuming the route to get hotel details is /hotel/profile
        method: 'GET',
      });
      console.log('Full Response:', response); // Log the response
      const hotelData = response.data.data || response.data; // Handle both cases
      console.log('Hotel data from API:', hotelData); // Log the extracted hotel data
      setHotel(hotelData);
      setName(hotelData.name);
      setLocation(hotelData.location);
      setDescription(hotelData.description);
    } catch (error) {
      console.error('Error fetching hotel details:', error);
    } finally {
      setLoading(false); 
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    else if (name === 'location') setLocation(value);
    else if (name === 'description') setDescription(value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axiosinstance({
        url: '/hotel/edit', // Assuming the route to edit hotel details is /hotel/edit
        method: 'PUT',
        data: {
          name,
          location,
          description,
        },
      });
      toast.success('Hotel details updated successfully');
      fetchHotelDetails();
    } catch (error) {
      console.error('Error updating hotel:', error);
      toast.error('Failed to update hotel details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotelDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Hotel</h2>

        <div className="mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Hotel Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="input input-bordered w-full p-2 border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Location</span>
          </label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            className="input input-bordered w-full p-2 border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Description</span>
          </label>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Enter hotel description"
            className="textarea textarea-bordered w-full p-2 border-gray-300 rounded-md"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full py-2 text-white rounded-md">
          Update Hotel
        </button>
      </form>
    </div>
  );
}

export default HotelEditPage;
