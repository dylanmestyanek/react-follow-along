import React, { useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../components/Navigation/Toolbar.jsx';
import SideDrawer from '../components/Navigation/SideDrawer.jsx';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const closeSideDrawer = () => {
        setShowSideDrawer(!showSideDrawer);
    };
    
    return (
        <>
            <Toolbar toggleSideDrawer={closeSideDrawer} isAuthenticated={props.isAuthenticated} />
            <SideDrawer showSideDrawer={showSideDrawer} closeSideDrawer={closeSideDrawer} isAuthenticated={props.isAuthenticated} />
            <main style={{ marginTop: '72px' }}>
                {props.children}
            </main>
        </>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);