import React from 'react';
import NavigationItems from './navigationItems';
import {Navbar, Nav} from 'react-bootstrap'
import './mainNavigation.css';



const mainNavigation = (props) =>[
   
        <Navbar bg="light" expand="lg" key="1">
        <Navbar.Brand href="#home">KrystalArk</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            
          </Nav>
          <div>
          <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
            
          </div>
         
        </Navbar.Collapse>
      </Navbar>

 
    ]

export default mainNavigation;