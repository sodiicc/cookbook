import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/hat.jpeg'

export const Navbar = () => {
  return (
    <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
      <Link to='/' className='navbar-brand' >Recipes Description</Link>
      <div className='collpase navbar-collapse'>
        <ul className='navbar-nav mr-auto'>
          {/* <li className='navbar-item' >
            <Link to='/' className='nav-link'>Recipes</Link>
          </li> */}
          <li className='navbar-item' >
            <Link to='/create' className='nav-link'>Create Recipe Log</Link>
          </li>
          <li className='navbar-item' >
            <Link to='/user' className='nav-link'>Create User</Link>
          </li>
            <img src={logo} className='logo-img' />

        </ul>

      </div>
    </nav>
  )
}