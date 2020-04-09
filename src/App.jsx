import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder.jsx';
import Checkout from './containers/Checkout/Checkout.jsx';
import Orders from './containers/Orders';
import Auth from './containers/Auth/Auth.jsx';
import Logout from './containers/Auth/Logout.jsx';
import { checkAuthState } from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthState();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && (
              <>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
              </>)}
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null 
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(checkAuthState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
