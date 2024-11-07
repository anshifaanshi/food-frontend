import React, { useEffect, useState } from 'react';
import UserHeader from '../components/user/UserHeader';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { axiosinstance } from "../config/axiosinstance";
import { saveUser, clearUser } from '../redux/features/userSlice';
import Header from '../components/Header';
import AdminFooter from '../pages/admin/AdminFooter';
import Loading from '../components/Loading';  // Import the new Loading component

export const UserLayout = () => {
  const { isUserExist } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await axiosinstance({
        method: "GET",
        url: "/user/checkuser",
      });
      if (response?.data?.data) {
        dispatch(saveUser(response.data.data));
      } else {
        dispatch(clearUser());
      }
    } catch (error) {
      dispatch(clearUser());
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) {
    return <Loading />;  // Use the Loading component
  }

  return (
    <div>
      {isUserExist ? <UserHeader /> : <Header />}
      <div className="min-h-96">
        <Outlet />
      </div>
      {isUserExist ? <Footer /> : <AdminFooter />}
    </div>
  );
};
