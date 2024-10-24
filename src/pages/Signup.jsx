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
            toast.success("Log-in success");
            navigate('/');
        } catch (error) {
            toast.error("user already exist");
            console.log(error);
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="signuphead text-5xl font-bold">signup now!  </h1>
                
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                        <label className="label">
                                <span className="label-text">name</span>
                                <input type="name" {...register("name")} placeholder="name" className="input input-bordered" requed />
                            </label>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered" requed />
                        </div>ir
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password")}
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            <label className="label">
                                <Link to={'/login'}>existing user ?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">signup</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};