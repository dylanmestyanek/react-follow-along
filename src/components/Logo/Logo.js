import React from 'react';
import burgerLogo from '../../assets/Images/original.png';
import './Logo.css';

const Logo = props => (
    <div className="Logo">
        <img src={burgerLogo} alt="My Burger" />
    </div>
);

export default Logo;