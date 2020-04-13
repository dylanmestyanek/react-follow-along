import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './containers/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder.jsx';
import { checkAuthState } from './store/actions/index';

const App = props => {
  useEffect(() => {
    props.checkAuthState();    
  }, [props]);

    let routes = (
      <Switch>
        <Route path="/auth" component={lazy(() => import('./containers/Auth/Auth'))} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );
    
    if (props.isAuthenticated) {
     routes = (
      <Switch>
          <Route path="/checkout" component={lazy(() => import('./containers/Checkout/Checkout'))} />
          <Route path="/orders" component={lazy(() => import('./containers/Orders'))} />
          <Route path="/auth" component={lazy(() => import('./containers/Auth/Auth'))} />
          <Route path="/logout" component={lazy(() => import('./containers/Auth/Logout'))} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
     );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<h2>Loading...</h2>}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
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
