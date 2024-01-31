import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <nav className='navbar navbar-dark bg-dark navbar-expand-sm d-flex justify-content-center'>
        <Link to={'/'} className='navbar-brand ml-5'>
          Contact Manager App
        </Link>
      </nav>
}

export default Navbar