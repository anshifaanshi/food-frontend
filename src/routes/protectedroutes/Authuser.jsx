
import React, { useEffect, useState } from 'react';
import { axiosinstance } from '../../config/axiosinstance';
import { useNavigate } from 'react-router-dom';

export const AuthUser = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
const navigate=useNavigate()


  const checkUser = async () => {
      try {
          const response = await axiosinstance({
              method: "GET",
              url: "/user/checkuser",
          });
          if (response.status === 200) {
              setIsUser(true); 
          }
      } catch (error) {
          setIsUser(false); 
          console.log(error);
          navigate('/'); 
      }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return isUser ? children : null;
};
