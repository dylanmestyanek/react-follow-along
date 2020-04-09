import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../components/Burger/Burger.jsx';
import BuildControls from '../components/Burger/BuildControls.jsx';
import Modal from '../components/UI/Modal.jsx';
import OrderSummary from '../components/Burger/OrderSummary.jsx';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner.jsx';
import withErrorHandler from '../components/hoc/withErrorHandler.jsx';
import { addIngredient, removeIngredient, fetchIngredients, initializePurchase } from '../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        ordering: false,
        loading: false,
        error: false
    }
    
    componentDidMount(){
        this.props.fetchIngredients()
    }

    ordering = () => {
        this.setState({
            ...this.state,
            ordering: true
        })
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
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        disabledInfo={disabledInfo}
                        addIngredient={this.props.addIngredient} 
                        removeIngredient={this.props.removeIngredient}
                        price={this.props.totalPrice}
                        ordering={this.ordering}
                        />
                </>
            );
            
            orderSummary = <OrderSummary 
            ingredients={this.props.ingredients} 
            stopOrdering={this.stopOrdering} 
            continueOrdering={this.continueOrdering}
            price={this.props.totalPrice}/>
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
        error: state.burgerBuilder.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch(addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(removeIngredient(ingredientName)),
        fetchIngredients: () => dispatch(fetchIngredients()),
        initializePurchase: () => dispatch(initializePurchase())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));