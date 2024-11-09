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
    
      <div style={styles.dashboardContainer}>
        <div style={styles.sidebar}>
          <SideBar />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>{admin?.name}</h1>
          <h3 style={styles.subheading}>{admin?.email}</h3>
          <button style={styles.logoutButton} onClick={handlelogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
  
  const styles = {
    dashboardContainer: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f4f6f8',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    },
    content: {
      flex: 1,
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
    },
    subheading: {
      fontSize: '1.2rem',
      color: '#666',
      marginBottom: '20px',
    },
    logoutButton: {
      backgroundColor: '#ff4d4d',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  
  


export default AdminProfile;
