import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HotelDetail = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Hotel ID is not defined');
      return;
    }

    const fetchHotelDetails = async () => {
      try {
        console.log('Fetching hotel details for ID:', id); // Check if ID is valid
        const response = await axios.get(`/hotel/hotelprofile/${id}`); 
        console.log('Full response:', response); // Log full response to debug
        setHotel(response.data); 
      } catch (err) {
        console.error('Error fetching hotel details:', err); 
        setError('Error fetching hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Hotel Name: {hotel?.name}</h1>
      <p>Description: {hotel?.description}</p>
      <p>Price: ${hotel?.price}</p>
    </div>
  );
};

export default HotelDetail;
