import React from 'react'
import { Link } from 'react-router-dom'
function ErrorPage() {
  return (
    <div><h1> 404 page not found</h1>
    <Link to={'/'}><button>go to home</button></Link></div>
  )
}

export default ErrorPage