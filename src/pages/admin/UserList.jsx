import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store errors

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Sending the GET request to the API
        const response = await axios.get('https://your-backend-url/api/users');
        
        console.log('Full response:', response);  // Log the full response for debugging
        console.log('User data:', response.data);  // Log the data received from the API
  
        // Ensure you're accessing the correct data structure
        if (Array.isArray(response.data)) {
          setUsers(response.data);  // If it's an array, set the state
        } else {
          // If it's not an array, log an error or handle appropriately
          console.error('Error: Response data is not an array');
        }
  
        setLoading(false);  // End loading state
      } catch (err) {
        setError('Failed to fetch users');  // Handle any errors
        setLoading(false);  // End loading state
      }
    };
  
    fetchUsers();  // Call the function to fetch users
  }, []);
  
  

   ; // Empty dependency array to run this effect only once (on mount)

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
              <td className="border border-gray-300 p-2">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
