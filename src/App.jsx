import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder.jsx';
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
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Route path="/checkout" component={lazy(() => import('./containers/Checkout/Checkout'))} />
                  <Route path="/orders" component={lazy(() => import('./containers/Orders'))} />
                  <Route path="/logout" component={lazy(() => import('./containers/Auth/Logout'))} />
                </Suspense>
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to={this.props.authRedirectPath} />
              </>)}
            <Route path="/" exact component={BurgerBuilder} />
            <Suspense fallback={<h1>Loading...</h1>}>
              <Route path="/auth" component={lazy(() => import('./containers/Auth/Auth'))} />
            </Suspense>
            <Redirect to={this.props.authRedirectPath} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(checkAuthState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
