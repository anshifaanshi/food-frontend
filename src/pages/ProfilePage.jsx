import React, { useEffect, useState } from 'react';
import { axiosinstance } from '../config/axiosinstance';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound } from 'lucide-react';

function UserEditPage() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const fetchUserDetails = async () => {
    try {
      const response = await axiosinstance({
        url: '/user/profile',
        method: 'GET',
      });
      setUser(response.data.data);
      setEmail(response.data.data.email);
      setName(response.data.data.name);
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error('Failed to fetch user details. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
        await axiosinstance({
          url: '/user/logout',
          method: 'POST'
        });
        toast.success('User logged out successfully');
        navigate('/');
    } catch (error) {
        console.error('Error logging out:', error);
        toast.error('User logout failed');
    }
  };
  
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <UserRound className="profile-icon" />
        <h1 className="profile-email">{email}</h1>
        <h2 className="profile-name">{name}</h2>
        <div className="button-group">
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
          <Link to={'/user/edit'}>
            <button className="btn btn-primary">Edit</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default UserEditPage;
