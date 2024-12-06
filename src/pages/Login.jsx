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
};

