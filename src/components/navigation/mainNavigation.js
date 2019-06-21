import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationItems from './navigationItems';
import './mainNavigation.css';



const mainNavigation = (props) =>[
   
    
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">KrystalArk</NavLink>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">            
                <div className="navbar-nav ml-auto">
                    <NavigationItems isAuth={props.isAuth} onLogout={props.onLogout} />
                </div>
            </div>
        </nav>

 
    ]

export default mainNavigation;