import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({isAuthenticated}) => {


    const logout = (e) => {
        e.preventDefault();

        localStorage.removeItem("token");
        window.location.reload(false);
    }


    if (isAuthenticated) {
        return (
            <nav>
            <a href="/">BamCow</a>
            <ul>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/login" onClick={e => logout(e)}>Logout</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </nav>
        )
    } else {

    return (
        <nav>
          <a href="/">BamCow</a>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </nav>
    );
};

}

export default NavBar;