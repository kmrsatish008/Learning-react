import React from 'react';
import { Link } from 'react-router-dom';

const Header = () =>{

    return(
        <div className= "header">
          <div className='logo-container'>
          <img className='logo' alt='logo' src='https://toppng.com/uploads/preview/food-delivery-icon-png-home-delivery-logo-11563001011im9v4qwz0l.png'></img>
          </div>
          <div className='nav-container'>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About Us</Link></li>
              <li><Link to='/contact'>Contact Us</Link></li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
    ) 
  }

  export default Header;