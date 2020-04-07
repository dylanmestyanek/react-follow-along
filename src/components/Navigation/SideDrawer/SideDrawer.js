import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop';

const SideDrawer = props => {
    let attachedClasses = ["SideDrawer", "Close"];

    if (props.showSideDrawer) {
        attachedClasses = ["SideDrawer", "Open"]
    }
    
    return (
        <>
            <Backdrop ordering={props.showSideDrawer} stopOrdering={props.closeSideDrawer}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    );
};

export default SideDrawer;