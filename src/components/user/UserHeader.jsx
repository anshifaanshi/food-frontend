import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {ShoppingCart,UserRound} from 'lucide-react'
function UserHeader() {
  return (
    
    <div>
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="name navbar-brand fw-bold" href="#">MealMate</a>
      
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto"> {/* ms-auto pushes links to the right */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
        
          <li ><Link to='/Cart/getcart'><ShoppingCart /></Link></li>
          <li ><Link to='/user/profile'><UserRound/></Link></li>
        </ul>
      </div>
    </nav>
   
  </div>
       
         
  )
}

export default UserHeader
