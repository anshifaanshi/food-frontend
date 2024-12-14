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
          isBlocked: user.isBlocked ?? false // Ensure default value
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
      await axiosinstance.patch(`/user/delete/${userId}`);
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      toast.success('User deleted successfully');
    } catch (error) {
      setError('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      const response = await axiosinstance.patch(`/user/block/${userId}`);
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, isBlocked: response.data.isBlocked } : user
      );
      setUsers(updatedUsers);
      toast.success(`User ${response.data.isBlocked ? 'blocked' : 'unblocked'} successfully`);
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
  export default  UserList