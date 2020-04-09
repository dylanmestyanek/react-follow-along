import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <Toolbar toggleSideDrawer={this.closeSideDrawer} isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer showSideDrawer={this.state.showSideDrawer} closeSideDrawer={this.closeSideDrawer} isAuthenticated={this.props.isAuthenticated} />
                <main style={{ marginTop: '72px' }}>
                    {this.props.children}
                </main>
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);