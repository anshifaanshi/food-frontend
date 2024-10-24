import React from 'react'
import { Link } from 'react-router-dom'
function SideBar() {
  return (
    <div><div className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label>
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li><Link to='/admin/profile'> profile</Link></li>
        <li><a>create hotel</a></li>
        <li><a>show hotels</a></li>
      </ul>
    </div>
  </div></div>
  )
}

export default SideBar