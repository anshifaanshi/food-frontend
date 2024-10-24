import React, { useEffect, useState } from "react";
import { axiosinstance } from "../../config/axiosinstance";
import { useNavigate, useParams } from "react-router-dom";
import { clearUser } from "../../redux/features/userSlice";
import { useDispatch } from "react-redux";

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get the id from the URL using useParams
    const { id } = useParams();

    // Log the userId to check if it's correctly retrieved
    console.log("User ID from URL:", id); 

    const fetchUserProfile = async () => {
        try {
            const response = await axiosinstance.get(`/user/profile/${user.id}`); // Correct URL
            console.log("API Response:", response); // Log the API response for inspection
            setUser(response?.data?.data); // Adjust based on response structure
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await axiosinstance.post("/user/logout");
            dispatch(clearUser());
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [id]);

    if (!user.name) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user?.name}</h1>
            <h1>{user?.email}</h1>
            <img src={user?.profilepic} alt="User profile" /> {/* Corrected profile pic key */}
            <button className="btn btn-outline">Edit</button>
            <br />
            <button onClick={handleLogout} className="btn btn-secondary">Log-out</button>
        </div>
    );
};

export default ProfilePage;
