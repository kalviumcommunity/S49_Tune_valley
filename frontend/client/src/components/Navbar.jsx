import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
    <span className="navbar-brand">TUNE VALLEY 🎹</span>
    <Link to="/">Register</Link>
    <Link to="/fav">Fav</Link>
  </nav>
  )
}

export default Navbar