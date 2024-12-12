import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {axiosinstance} from '../../config/axiosinstance'

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Sending the GET request to the API
        const response = await axiosinstance.get('/user/users'); 
        
        // Check if response.data is an array
        let userData;
        if (Array.isArray(response.data)) {
          userData = response.data;
        } else if (Array.isArray(response.data.data)) {
          userData = response.data.data;
        } else {
          console.error('Unexpected data format:', response.data);
          setError('Unexpected data format from server');
          return; // Exit early since the data is not as expected
        }

        setUsers(userData); // Set the users to state
        console.log('User data:', userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch users'); // Set error message
      } finally {
        setLoading(false); // End loading state
      }
    };
    const handleDelete = async (userId) => {
      try {
        // Send a DELETE request to the API
        await axiosinstance.delete(`/user/users/${userId}`);
        
        // Remove the user from the state without reloading
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        alert('User deleted successfully');
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user');
      }
    };
    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run this effect only once (on mount)

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something goes wrong
  }

  return (
    <div>
      <h1>User List</h1>
      <table className="table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
