import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary';
import ContactData from './ContactData';

const Checkout = props => { 
    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }
    
    const purchasedRedirect = props.purchased && <Redirect to="/" />;
    return (
            props.ingredients ? (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={props.ingredients} 
                        checkoutCancelled={checkoutCancelled}
                        checkoutContinued={checkoutContinued}
                    />
                    <Route path={`${props.match.path}/contact-data`} component={ContactData} />
                </div>
            ) : <Redirect to="/" />
    );
}

const mapStateToProps = state => { 
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
