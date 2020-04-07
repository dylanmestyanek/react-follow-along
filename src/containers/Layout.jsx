import React, { Component } from 'react';
import Toolbar from '../components/Navigation/Toolbar.jsx';
import SideDrawer from '../components/Navigation/SideDrawer.jsx';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    };
    
    render() {
        return (
            <>
                <Toolbar toggleSideDrawer={this.closeSideDrawer} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} />
                <main style={{ marginTop: '72px' }}>
                    {this.props.children}
                </main>
            </>
        );
    }
};

export default Layout;