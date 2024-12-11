import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../user/Loading';

const HotelDetail = () => {
  const { id } = useParams(); // Extract 'id' from the URL
  const [data, setData] = useState(null);
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
        setData(response?.data?.data || {});
        console.log('Hotel details fetchedet:', response);
    } catch (error) {
        console.error("Error fetching hotel details:", error);
        toast.error("Failed to retrieve hotel details.");
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
      <h1>Hotel Name: {data?.name}</h1>
      <p>Description: {data?.description}</p>
      <p>Price: ${data?.price}</p>
    </div>
  );
};

export default HotelDetail;
