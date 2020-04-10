import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../components/Burger/Burger.jsx';
import BuildControls from '../components/Burger/BuildControls.jsx';
import Modal from '../components/UI/Modal.jsx';
import OrderSummary from '../components/Burger/OrderSummary.jsx';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner.jsx';
import withErrorHandler from '../components/hoc/withErrorHandler.jsx';
import { 
    addIngredient, 
    removeIngredient, 
    fetchIngredients, 
    initializePurchase, 
    setAuthRedirectPath 
} from '../store/actions/index';

export class BurgerBuilder extends Component {
    state = {
        ordering: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        this.props.fetchIngredients()
    }

    ordering = () => {
        if (this.props.isAuthenticated) {
            this.setState({ ...this.state, ordering: true })
        } else {
            this.props.setAuthRedirectPath('checkout');
            this.props.history.push("/auth");
        }
    }

    stopOrdering = () => {
        this.setState({
            ...this.state,
            ordering: false
        })
    }

    continueOrdering = () => {
        this.props.initializePurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if (this.props.ingredients) {
            burger = (
                <>
                    <Burger data-testid="Burger" ingredients={this.props.ingredients} />
                    <BuildControls 
                        data-testid="BuildControls"
                        disabledInfo={disabledInfo}
                        addIngredient={this.props.addIngredient} 
                        removeIngredient={this.props.removeIngredient}
                        price={this.props.totalPrice}
                        ordering={this.ordering}
                        isAuthenticated={this.props.isAuthenticated}
                        />
                </>
            );
            
            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients} 
                stopOrdering={this.stopOrdering} 
                continueOrdering={this.continueOrdering}
                price={this.props.totalPrice}
            />
        }
    
        return (
            <>
                <Modal ordering={this.state.ordering} stopOrdering={this.stopOrdering}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        fetchIngredients: () => dispatch(fetchIngredients()),
        initializePurchase: () => dispatch(initializePurchase()),
        setAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));