import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css';
import Menu from '../Menu/Menu';

const Toolbar = props => (
    <header className="Toolbar">
        <Menu toggleSideDrawer={props.toggleSideDrawer} />
        <Logo height="80%" />
        <nav className="DesktopOnly">
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;