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
        <div className="hero bg-base-200 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="hero-content flex flex-col lg:flex-row-reverse items-center">
            {/* Text Section */}
            <div className="text-center lg:text-left lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-5xl font-bold mb-4 text-primary">Sign Up Now!</h1>
              <p className="text-lg text-gray-600">
                Join us today to explore amazing features and opportunities. Signing up is quick and easy!
              </p>
            </div>
      
            {/* Form Section */}
            <div className="card bg-base-100 w-full max-w-md shadow-lg p-6 rounded-lg">
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Name Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Your name"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
      
                {/* Email Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Your email"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
      
                {/* Password Field */}
                <div className="form-group">
                  <label className="label">
                    <span className="label-text font-semibold">Password</span>
                  </label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="Your password"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
      
                {/* Existing User Link */}
                <div className="text-sm text-center mt-2">
                  <Link to="/login" className="text-primary hover:underline">
                    Existing user? Log in
                  </Link>
                </div>
      
                {/* Signup Button */}
                <div className="form-group mt-6">
                  <button className="btn btn-primary w-full py-2">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}