import React from 'react';
import { Link } from 'react-router-dom';
import './navigation.css';

const navigation = (props) =>{
    let authLinks = '<Link to="/login">Login</Link>'+
                    '<Link to="/signup">Signup</Link>' ;

    if(props.currentState.isLoggedIn){
        authLinks = '<Link to="/logout">Logout</Link>'
    }
    return(
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <Link to="/" className="navbar-brand">KrystalArk</Link>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarCollapse">            
                <div className="navbar-nav ml-auto">
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </div>
            </div>
        </nav>

    )
}

export default navigation;