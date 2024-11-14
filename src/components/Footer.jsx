import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'><footer className="footer mt-auto py-3">
    <div className="container">
      <div className="row">
 
     
        <div className="col-md-4">
          <h5 className='footerhead'>Quick Links</h5>
          
          <ul className=" ">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms & Conditions</a></li>

          </ul>
        </div>
      
        
      </div>
    </div>
  </footer>
  </div>
  )
}

export default Footer