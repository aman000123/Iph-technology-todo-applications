import React from 'react';
import { Outlet } from 'react-router-dom';

import './style.css'
const Layout = () => {
    return (
        <div className="layout-container">

            <Outlet /> {/* This will render the login or register form depending on the route */}

            {/* <div className="image-section"></div> */}
        </div>
    );
};

export default Layout;
