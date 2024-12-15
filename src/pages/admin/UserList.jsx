import React, { useState, useEffect } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosinstance.get('/user/users');

        const usersWithDefaults = response.data.map(user => ({
          ...user,
          Blocked: user.Blocked ?? false // Ensure default value
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

  const handleDelete = async (userId) => {
    try {
      await axiosinstance.delete(`/user/delete/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      toast.success('User deleted successfully');
    } catch (error) {
      setError('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };
  const handleBlockToggle = async (userId, currentBlockStatus) => {
    try {
      // Toggle the block status
      const newBlockStatus = !currentBlockStatus;
  
      // Send the block/unblock request with the new status
      const response = await axiosinstance.post(`/user/block/${userId}`, {
        blocked: newBlockStatus // Send the toggled block status to the backend
      });
  
      // Check the response and update the users state
      const updatedBlockStatus = response.data.user.blocked;
  
      // Update the users state with the new block status
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, blocked: updatedBlockStatus } : user
      );
  
      setUsers(updatedUsers);
  
      // Show the appropriate toast message based on the updated block status
      if (updatedBlockStatus) {
        toast.success('User blocked successfully');
      } else {
        toast.success('User unblocked successfully');
      }
  
    } catch (error) {
      setError('Failed to update user block status');
      console.error('Error updating user block status:', error.response ? error.response.data : error.message);
    }
  };
  
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                    className={`btn ${user.Blocked ? 'btn-success' : 'btn-warning'} me-2`} 
                    onClick={() => handleBlockToggle(user._id, user.Blocked)}>
                    {updatedBlockStatus ? 'Unblock' : 'Block'}
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
