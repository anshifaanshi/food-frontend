import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../user/Loading';
import toast from 'react-hot-toast';
import { axiosinstance } from '../../config/axiosinstance';
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
    <div className="edit-hotel-form">
    <h1>Edit Hotel Details</h1>

    {hotelData ? (
      <div>
        <img 
          src={formData.image} 
          alt={`${formData.name} hotel`} 
          style={{ width: '200px', height: '200px', borderRadius: '8px' }} 
        />
        <h1>Hotel Name: {hotelData.name}</h1>
        <p>Phone: {hotelData.phone}</p>
        <p>Email: {hotelData.email}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Hotel Name</label>
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
            <label htmlFor="cuisineType">Cuisine Types (comma-separated)</label>
            <input 
              type="text" 
              id="cuisineType" 
              name="cuisineType" 
              value={formData.cuisineType.join(', ')} 
              onChange={handleCuisineChange} 
              placeholder="e.g., Indian, Chinese, Continental" 
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>

        <h2>Menu</h2>
        <ul>
          {hotelData.fooditems.length > 0 ? (
            hotelData.fooditems.map((foodId, index) => (
              <li key={index}>Food Item ID: {foodId}</li>
            ))
          ) : (
            <p>No food items available.</p>
          )}
        </ul>
      </div>
    ) : (
      <p>Loading hotel data...</p>
    )}
  </div>
  );
};

export default HotelDetail;





app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error('Request blocked by CORS policy.'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH']
}));



import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";
import Header from "../components/Header";
export const LoginPage = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const user = {
        role: "user",
        login_api: "/user/login",
        profile_route: "/user/profile",
        signup_route: "/signup",
    };

    
    console.log(user, "=====user");

    const onSubmit = async (data) => {
        try {
            const response = await axiosinstance({ method: "POST", url: user.login_api, data });
            console.log(response, "====response");
            const userId = response.data.userId;  // Adjust according to the API response structure
            if (userId) {
                localStorage.setItem("userId", userId); 
                console.log('User ID stored in localStorage:', userId);
            }
            toast.success("Log-in success");
            navigate('/');
        } catch (error) {
            toast.error("user  not found");
            console.log(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen flex items-center justify-center">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
            
           
    
        
            <div className="w-full lg:w-1/2 p-4">
                <div className="hero-content flex-col lg:flex-row shadow-lg rounded-lg p-8">
                    <div className="text-center lg:text-left mb-6 lg:mb-0">
                        
                        <h1 className="loginhead text-5xl font-bold mb-4">Login now!</h1>
                        <p className="loginp py-6">
                            Login for a Better Experience and Better Food!
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl rounded-lg">
                        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Enter your email"
                                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                    required
                                    />
                                    </div>
                                    <div className="form-control mt-4">
                                        <label className="label">
                                            <span className="label-text font-semibold">Password</span>
                                        </label>
                                        <input
                                            type="password"
                                            {...register("password")}
                                            placeholder="Enter your password"
                                            className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
                                            required
                                        />
                                        <label className="label mt-2">
                                            <Link to={user.signup_route} className="link link-hover text-primary">
                                                New User?
                                            </Link>
                                        </label>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button className="btn btn-primary transition duration-200 hover:bg-primary-focus">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
     
    )        
}

onst userlogin = async (req, res, next) => {
  try {
      const { password, email } = req.body;

      if (!password || !email) {
          return res.status(400).json({ success: false, message: "All fields are required" });
      }

      const userexist = await UserModel.findOne({ email });
      if (!userexist) {
          return res.status(404).json({ success: false, message: "User does not exist" });
      }

   //   if (userexist.blocked) {
    //      return res.status(403).json({ success: false, message: "User is blocked. Please contact support." });
     // }


      const passwordmatch = await bcrypt.compare(password, userexist.password);
      if (!passwordmatch) {
          return res.status(401).json({ message: "User not authorized" });
      }

      const token = generatetoken(userexist._id);

      // Set cookie correctly
      res.cookie("token", token, {
          sameSite: "None", // Required for cross-site cookies in production
          secure: true,     // Ensure secure transmission over HTTPS
          httpOnly: true,   // Helps prevent JavaScript access on the client
      });
      

      return res.status(200).json({ success: true, message: "User logged in successfully", user: userexist });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message || "Server error" });
  }
};

