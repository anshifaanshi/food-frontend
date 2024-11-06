import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider } from 'react-router-dom'
import {router} from './routes/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const clientDomain = process.env.REACT_APP_CLIENT_DOMAIN;
console.log(clientDomain);  // This should print the domain value set in Vercel

  return (
    <>
  <RouterProvider router={router} />
  <Toaster />
    </>
  )
  
}

export default App