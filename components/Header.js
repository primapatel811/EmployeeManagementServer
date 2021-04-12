import React from 'react';
import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
const Header = (props) => (
 <div className='header row'>
  <div className='col-2'>
  <img
    alt=""
    src="assets/logo.png"
    width="175"
    height="95"
    className="logo"
    float="left"
  />
  </div>
  <div className='col-8 header-title'>
        <h1>{props.title}</h1>
  </div>
  <div  className='header-nav row'>
       <span > <NavLink to='/' className='col-1 a'>Home</NavLink> </span>
       <span ><NavLink to='/about'className='col-1 a'>About</NavLink> </span>
       <span ><NavLink to='/contact'className='col-1 a'>Contact</NavLink> </span>
  </div> 
  </div> 

);
  
  const StyledNavbarBrand = styled(Navbar.Brand)`
  font-size: 2.8em;
`;

  export default Header;
  