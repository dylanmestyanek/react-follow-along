import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from './containers/Layout.jsx';
import BurgerBuilder from './containers/BurgerBuilder.jsx';
import Checkout from './containers/Checkout.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
        </Layout>
      </div>
    );
  }
}

export default App;
