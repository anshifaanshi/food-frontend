import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosinstance } from "../config/axiosinstance";
import toast from "react-hot-toast";
import Header from "../components/Header";

export const LoginPage = ({ role = "user" }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null); // State to hold the userId

    const user = {
        role: "user",
        login_api: "/user/login",
        profile_route: "/user/profile",
        signup_route: "/signup",
    };

    if (role === "mentor") {
        user.role = "mentor";
        user.login_api = "/mentor/login";
        user.profile_route = "/mentor/profile";
        user.signup_route = "/mentor/signup";
    }

    console.log(user, "=====user");

    const onSubmit = async (data) => {
        try {
            const response = await axiosinstance.post(user.login_api, data);
            console.log(response, "====response");

            // Retrieve userId from backend response
            const { userId } = response.data; // Assuming userId is part of the response

            if (userId) {
                setUserId(userId); // Store the userId in state
                toast.success("Login successful");
                navigate('/'); // Navigate to home page or user profile after successful login
            } else {
                toast.error("User ID not found in response");
            }
        } catch (error) {
            toast.error("User not found");
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
                            <p className="loginp py-6">Login for a Better Experience and Better Food!</p>
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
    );
};
