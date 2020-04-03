import React from 'react';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = props => (
    <>
        <Toolbar />
        <main className="Content">
            {props.children}
        </main>
    </>
);

export default Layout;