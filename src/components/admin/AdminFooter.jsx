import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'><footer class="footer mt-auto py-3">
    <div class="container">
      <div class="row">
 
        <div class="col-md-4">
          <h5 className='footerhead'>About</h5>
          <p>Learn more about us and our mission to deliver quality food at your convenience.</p>
        </div>
     
        <div class="col-md-4">
          <h5 className='footerhead'>Quick Links</h5>
          <ul className="footerlist list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <Link to={'admin/login'}><button className='bg-gradient-to-r from-red-500 to-red-300 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg' >login as admin</button></Link>
          </ul>
        </div>
      
        <div class="col-md-4">
          <h5 className='footerhead'>Contact Us</h5>
          <ul className=" footerlist list-unstyled">
            <li><a href="#">Email: info@mealmate.com</a></li>
            <li><a href="#">Phone: +123 456 7890</a></li>
            <li><a href="#">Address: 123 Food St, City</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  </div>
  )
}

export default Footer