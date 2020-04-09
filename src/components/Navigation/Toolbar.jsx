import React from 'react';
import Logo from '../Logo';
import NavigationItems from './NavigationItems.jsx';
import Menu from './Menu.jsx';
import styled from '@emotion/styled';

const Toolbar = props => (
    <ToolbarHeader>
        <Menu toggleSideDrawer={props.toggleSideDrawer} />
        <Logo height="80%" />
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </ToolbarHeader>
);

export default Toolbar;

const ToolbarHeader = styled.header`
    height: 56px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #703B09;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    z-index: 90;

    nav {
        height: 100%;
    }

    @media (max-width: 499px) {
        .DesktopOnly {
            display: none;
        }
    }
`;