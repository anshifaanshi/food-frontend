import React, { useState, useEffect } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track any errors

  // Fetch users from the server when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosinstance.get('/user/users');
        const usersWithDefaults = response.data.map(user => ({
          ...user,
          isBlocked: user.isBlocked ?? false // Ensure default value for isBlocked
        }));
        setUsers(usersWithDefaults);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user by ID
  const handleDelete = async (userId) => {
    try {
      await axiosinstance.patch(`/user/delete/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      toast.success('User deleted successfully');
    } catch (error) {
      setError('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  // Function to toggle the block/unblock status of a user
  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const response = await axiosinstance.patch(`/user/block/${userId}`);
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isBlocked: response.data.isBlocked } : user
      );
      setUsers(updatedUsers);
      const statusMessage = response.data.isBlocked ? 'User blocked successfully' : 'User unblocked successfully';
      toast.success(statusMessage);
    } catch (error) {
      setError('Failed to update user block status');
      console.error('Error updating user block status:', error.response ? error.response.data : error.message);
    }
  };

  // Handle loading state
  if (loading) return <div>Loading...</div>;
  
  // Handle error state
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-center fw-bold mb-4">User List</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    className={`btn ${user.isBlocked ? 'btn-success' : 'btn-warning'} me-2`} 
                    onClick={() => handleBlockToggle(user._id, user.isBlocked)}>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(user._id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
