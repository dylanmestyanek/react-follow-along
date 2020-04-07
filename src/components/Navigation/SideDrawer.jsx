import React from 'react';
import Logo from '../Logo';
import NavigationItems from './NavigationItems.jsx';
import Backdrop from '../UI/Backdrop.jsx';
import styled from '@emotion/styled';

const SideDrawer = props => {
    return (
        <>
            <Backdrop ordering={props.showSideDrawer} stopOrdering={props.closeSideDrawer}/>
            <SideDrawerContainer style={{ transform: props.showSideDrawer ? "translateX(0)" : "translateX(-100%"}}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </SideDrawerContainer>
        </>
    );
};

export default SideDrawer;

const SideDrawerContainer = styled.div`
    position: fixed;
    width: 280px;
    max-width: 70%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 200;
    background-color: white;
    padding: 32px 16px;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;

    @media (min-width: 500px) {
            display: none;
    }
`;