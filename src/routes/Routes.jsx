import Aboutus from '../pages/Aboutus';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Rootlayout from '../layout/Rootlayout';
import Home from '../pages/Home';
import { LoginPage } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Hotel } from '../pages/Hotels';

import Hoteldetails from '../pages/Hoteldetails';
import Fooditems from '../pages/Fooditems';
import { AdminLogin } from '../pages/admin/AdminLogin';
import { AuthUser } from '../routes/protectedroutes/Authuser';
import Profile from '../pages/user/Profile';
import { CartPage } from '../pages/user/Cartpage';
import ProfilePage from '../pages/ProfilePage';
import { Adminlayout } from '../layout/Adminlayout';
import AdminProfile from '../pages/admin/AdminProfile';
import { UserLayout } from '../layout/Userlayout';
import About from '../pages/About';
import Authadmin from '../routes/protectedroutes/Authadmin';
import UserEditPage from '../pages/user/UserEditPage';
import ErrorPage from '../pages/ErrorPage';
import { CreateHotelsAndFoodItems } from '../components/admin/CreateHotels';
import OrderHistory from '../pages/Order';
import PaymentSuccess from '../payment/PaymentSuccessPage';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "hotel/hotels",
        element: <Hotel />,
      },
      {
        path: "hotel/hotelprofile/:id",
        element: <Hoteldetails />,
      },
      {
        path: "fooditems/allfood",
        element: <Fooditems />,
      },
       
     
      
      {
        path: "user",
        element: (
          <AuthUser>
            <Outlet/>
          </AuthUser>
        ),
        children: [
          {
            path: "profile",
            element: <ProfilePage />,  
          },
          {
            path: 'edit',
            element: <UserEditPage />
          },
          {
            path: 'history',
            element: <OrderHistory />
          },{
            path:'payment/success',
            element:<PaymentSuccess/>
          }
        ],
        
      },
      
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: "admin",
    element: (
      <Authadmin>
        <Adminlayout />
      </Authadmin>
    ),
    children: [
      {
        path: "profile",
        element: <AdminProfile />,
      },
      {
        path: 'createhotel',
        element: <CreateHotelsAndFoodItems />,


      },
    ],
  },
  {
    path: 'Cart',
    element: (
      <AuthUser>
        <UserLayout />
      </AuthUser>
    ),
    children: [
      {
        path: 'getcart',
        element: <CartPage />
      }
    ]
  }
]);