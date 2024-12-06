import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";
import Header from '../components/Header'
export const Signup = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const user = {
        role: "user",
        signup_api: "/user/signup",
        profile_route: "/user/profile",
        signup_route: "/signup",
    };

    if (role === "admin") {
        user.role = "admin";
        (user.login_api = "/admin/login"), (user.profile_route = "/admin/profile"), (user.signup_route = "/mentor/signup");
    }

    console.log(user, "=====user");

    const onSubmit = async (data) => {
        try {
            const response = await axiosinstance({ method: "POST", url: user.signup_api, data });
            console.log(response, "====response");
            const userId = response.data.userId;  
            if (userId) {
                localStorage.setItem("userId", userId); 
            }
            toast.success("sign-in success");
            navigate('/');
        } catch (error) {
            toast.error("user already exist");
            console.log(error);
        }
    };

    return (
        <div className="hero bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
        <div className="card w-full max-w-md p-6 bg-white shadow-xl rounded-lg">
          {/* Heading Section */}
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Your Account</h1>
          <p className="text-center text-gray-500 mb-6">
            Sign up to explore amazing features. It’s quick and easy!
          </p>
      
          {/* Form Section */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className="form-group">
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
      
            {/* Email Field */}
            <div className="form-group">
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
      
            {/* Password Field */}
            <div className="form-group">
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
      
            {/* Signup Button */}
            <button className="btn btn-primary w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg font-medium">
              Sign Up
            </button>
          </form>
      
          {/* Existing User Link */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-500 font-medium hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    )
}