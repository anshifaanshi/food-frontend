import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import { RouterProvider } from 'react-router-dom'
import {router} from './routes/Routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
  <RouterProvider router={router} />
  <Toaster />
    </>
  )
  
}

export default App