import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

class Checkout extends Component { 
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    
    render() {
        return (
                this.props.ingredients ? (
                    <div>
                        <CheckoutSummary 
                        ingredients={this.props.ingredients} 
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued}
                        />
                        <Route path={`${this.props.match.path}/contact-data`} component={ContactData} />
                    </div>
                ) : <Redirect to="/" />
        );
    }
}

const mapStateToProps = state => { 
    return {
        ingredients: state.burgerBuilder.ingredients
    };
};

export default connect(mapStateToProps)(Checkout);
