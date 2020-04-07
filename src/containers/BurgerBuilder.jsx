import React, { Component } from 'react';
import Burger from '../components/Burger/Burger.jsx';
import BuildControls from '../components/Burger/BuildControls.jsx';
import Modal from '../components/UI/Modal.jsx';
import OrderSummary from '../components/Burger/OrderSummary.jsx';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner.jsx';
import withErrorHandler from '../components/hoc/withErrorHandler.jsx';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
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
        this.setState({ loading: true })

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })

        // const newOrder = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Dylan',
        //         address: {
        //             street: 'Test St.',
        //             zipCode: 43252,
        //             country: 'United States'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('/orders.json', newOrder)
        //     .then(response => {
        //         this.setState({ loading: false, ordering: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, ordering: false });
        //     });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if (this.state.ingredients) {
            burger = (
                <>
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
            
            orderSummary = <OrderSummary 
            ingredients={this.state.ingredients} 
            stopOrdering={this.stopOrdering} 
            continueOrdering={this.continueOrdering}
            price={this.state.totalPrice}/>
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);