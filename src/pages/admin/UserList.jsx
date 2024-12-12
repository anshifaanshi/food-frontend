import React, { useState, useEffect } from 'react';
import { axiosinstance } from '../../config/axiosinstance';

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

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array to run this effect only once (on mount)

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

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Display error message if something goes wrong
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Email</th>
            <th className="border border-gray-300 p-4">Role</th>
            <th className="border border-gray-300 p-4">Action</th> 
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-4">{user.name}</td>
              <td className="border border-gray-300 p-4">{user.email}</td>
              <td className="border border-gray-300 p-4">{user.role}</td>
              <td className="border border-gray-300 p-4">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                  onClick={() => handleDelete(user._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
