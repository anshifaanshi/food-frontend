import React, { useEffect, useState } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import toast from 'react-hot-toast';
import Loading from '../../components/user/Loading';

function UserEditPage() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const fetchUserDetails = async () => {
    setLoading(true); // Start loading
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
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') setEmail(value);
    else if (name === 'name') setName(value);
    else if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading during update
    try {
      const response = await axiosinstance({
        url: '/user/edit',
        method: 'PUT',
        data: {
          email,
          name,
          password,
        },
      });
      toast.success("User details updated successfully");
      fetchUserDetails(); // Fetch updated user details
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error("failed to update")
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return <Loading />; // Display loading spinner while loading is true
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Update User</h2>

        <div className="mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="input input-bordered w-full p-2 border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="input input-bordered w-full p-2 border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <label className="label">
            <span className="label-text text-gray-700 font-semibold">Password</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="input input-bordered w-full p-2 border-gray-300 rounded-md"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full py-2 text-white rounded-md">
          Update User
        </button>
      </form>
    </div>
  );
};

export default UserEditPage;
