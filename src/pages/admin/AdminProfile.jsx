import React, { useEffect, useState } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { SideBar } from './SideBar';
function AdminProfile() {
  const [admin, setadmin] = useState({});
  const navigate=useNavigate()

  const fetchadminProfile = async () => {
    try {
      const adminId = "admin_ID"; // Get the user ID from your authentication logic
      const response = await axiosinstance({
        method: "GET",
        url: '/admin/profile',
      });
      setadmin(response?.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    fetchadminProfile();
  }, []);



  const handlelogout=async()=>{
    try{
        const response=await axiosinstance({
            method:'POST',
            url:'admin/logout',
        })
        toast.success("logout successfully")
        navigate('/')
        
    }catch(error){
        console.log(error);
        
    }
  }
  return (
    <div>
      <SideBar/>
      <h1>{admin?.name}</h1>
      <h3>{admin?.email}</h3>
    
     <button  onClick={handlelogout}>logout</button>
    </div>
  );
}

export default AdminProfile;
