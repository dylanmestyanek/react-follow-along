import React, { Component } from 'react';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    closeSideDrawer = () => {
        this.setState({ showSideDrawer: !this.state.showSideDrawer })
    };
    
    render() {
        return (
            <>
                <Toolbar toggleSideDrawer={this.closeSideDrawer} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} />
                <main className="Content">
                    {this.props.children}
                </main>
            </>
        );
    }
};

export default Layout;