import React from 'react';
import { Link } from 'react-router-dom';
import { SideBar } from './SideBar';

function AdminFooter() {
  return (
    <div className=''>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="footerhead">About</h5>
              <p className='footerlist'>
                Learn more about us and our mission to deliver quality food at
                your convenience.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="footerhead">Quick Links</h5>
              <ul className="footerlist list-unstyled">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Terms & Conditions</a></li>
                {/* Adding the admin signup link */}
                <li><Link to={"/admin/login"}><button>Log in  as Admin</button></Link></li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5 className="footerhead">Contact Us</h5>
              <ul className="footerlist list-unstyled">
                <li>Email: info@mealmate.com</li>
                <li>Phone: +123 456 7890</li>
                <li>Address: 123 Food St, City</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AdminFooter;
