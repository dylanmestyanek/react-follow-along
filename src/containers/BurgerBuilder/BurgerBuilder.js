import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        ordering: false
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ 
            totalPrice: newPrice, 
            ingredients: updatedIngredients,
        })
    };

    removeIngredientHandler = type => {
        if (this.state.ingredients[type] > 0) {
            this.setState({
                ingredients: {
                    ...this.state.ingredients,
                    [type]: this.state.ingredients[type] - 1
                },
                totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type],
            })
        }
    };

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
        const newOrder = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dylan',
                address: {
                    street: 'Test St.',
                    zipCode: 43252,
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', newOrder)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <>
                <Modal ordering={this.state.ordering} stopOrdering={this.stopOrdering}>
                    <OrderSummary 
                        ingredients={this.state.ingredients} 
                        stopOrdering={this.stopOrdering} 
                        continueOrdering={this.continueOrdering}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    disabledInfo={disabledInfo}
                    addIngredient={this.addIngredientHandler} 
                    removeIngredient={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    ordering={this.ordering}
                />
            </>
        );
    }
};

export default BurgerBuilder;