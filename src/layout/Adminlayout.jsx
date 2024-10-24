
    
import React, { useEffect } from 'react';
import Header from '../components/Header';
import AdminFooter from '../pages/admin/AdminFooter';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosinstance } from "../config/axiosinstance";
import { saveadmin, clearadmin } from '../redux/features/adminSlice';
import AdminHeader from '../components/admin/AdminHeader'

export const Adminlayout = () => {
  const { isAdminExist } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const location = useLocation();

  const checkUser = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: "/admin/check-admin",
      });
      console.log("full response:",response)
      // Assuming the user data is in response.data.user
      if (response?.data?.data) {
        dispatch(saveadmin(response.data.data));
      }
      console.log("User data: ", response.data.data);
    } catch (error) {
      dispatch(clearadmin());
      console.log("Error checking user: ", error);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]); // Optional: Remove this dependency if you want to check only once

  return (
    <div>
      {isAdminExist ? <AdminHeader /> : <Header />}
      <div className="min-h-96">
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
};
