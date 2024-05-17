import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
    <span className="navbar-brand">TUNE VALLEY 🎹</span>
    <Link to="/register">Register</Link>
    <Link to="/fav">Fav</Link>
    <Link to= "/createdby" >Created_by</Link>
    <Link to="/login" >login</Link>
  </nav>
  )
}

export default Navbar