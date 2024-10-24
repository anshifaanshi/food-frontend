import React, { useState, useEffect } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import { useNavigate } from 'react-router-dom';

function Authadmin({ children }) {
    const [isAdmin, setIsAdmin] = useState(false); // Changed state name to isAdmin
    const navigate = useNavigate();

    const checkAdmin = async () => {
        try {
            const response = await axiosinstance({
                method: "GET",
                url: "/admin/check-admin",
            });
            if (response.status === 200) {
                setIsAdmin(true); // Correct state setter
            }
        } catch (error) {
            setIsAdmin(false); // Correct state setter
            console.log(error);
            navigate('/'); // Redirect to home or another appropriate route
        }
    };

    useEffect(() => {
        checkAdmin(); // Check the admin status when the component mounts
    }, []);

    // If admin is authenticated, render the children; otherwise render null
    return isAdmin ? <>{children}</> : null; // Render children only if admin is authenticated
}

export default Authadmin;
