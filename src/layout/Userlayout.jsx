import React, { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosinstance } from "../config/axiosinstance";
import { saveUser, clearUser } from '../redux/features/userSlice';
import Header from '../components/Header';
import AdminFooter from '../pages/admin/AdminFooter';

export const UserLayout = () => {
  const { isUserExist } = useSelector((state) => state.user); // Get user status from Redux
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Function to check user existence
  const checkUser = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: "/user/checkuser",
      });
      if (response?.data?.data) {
        dispatch(saveUser(response.data.data));  // Save user if found
      } else {
        dispatch(clearUser());  // Clear user if not found
      }
    } catch (error) {
      dispatch(clearUser());  // Handle any errors
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);  // Loading state ends
    }
  };

  // Trigger user check on route change
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  // Show loading state while checking user
  if (loading) {
    return (
      <div>
        {/* Display loading screen with appropriate layout */}
        <Header />
        <div className="min-h-96 flex justify-center items-center">
          Loading...
        </div>
        <AdminFooter />
      </div>
    );
  }

  // Conditionally render layout based on user status
  return (
    <div>
      {/* Show User Header if logged in, otherwise default Header */}
      {isUserExist ? <UserHeader /> : <Header />}
      
      {/* Main content */}
      <div className="min-h-96">
        <Outlet />
      </div>
      
      {/* Show User Footer if logged in, otherwise Admin Footer */}
      {isUserExist ? <Footer /> : <AdminFooter />}
    </div>
  );
};
