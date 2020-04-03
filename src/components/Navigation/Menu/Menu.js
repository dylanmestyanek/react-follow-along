import React from 'react';
import './Menu.css';

const Menu = props => (
    <div className="DrawerToggle" onClick={() => props.toggleSideDrawer()}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default Menu;