import React, { useState, useEffect } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to store errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosinstance.get('/user/users');
        
        // Ensure users have isBlocked property (default false if undefined)
        const usersWithDefaults = response.data.map(user => ({
          ...user,
          isBlocked: user.isBlocked ?? false
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

  const handleBlockToggle = async (userId, isBlocked) => {
    try {
      await axiosinstance.patch(`/user/block/${userId}`, { isBlocked: !isBlocked });
      
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      );

      setUsers(updatedUsers);
      toast.success(`User ${!isBlocked ? 'blocked' : 'unblocked'} successfully`);
    } catch (error) {
      setError('Failed to update user block status');
      console.error('Error updating user block status:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">User List</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-4">Name</th>
            <th className="border border-gray-300 p-4">Email</th>
         
            <th className="border border-gray-300 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-4">{user.name}</td>
              <td className="border border-gray-300 p-4">{user.email}</td>
              <td className="border border-gray-300 p-4">
                <button 
                  className={`block-unblock-btn ${
                    user.isBlocked 
                      ? 'bg-green-500 hover:bg-green-700' 
                      : 'bg-yellow-500 hover:bg-yellow-700'
                  } text-white px-4 py-2 rounded-lg`}
                  onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </td>
              <td className="border border-gray-300 p-4">
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
