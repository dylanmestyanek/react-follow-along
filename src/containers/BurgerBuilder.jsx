import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../components/Burger/Burger.jsx';
import BuildControls from '../components/Burger/BuildControls.jsx';
import Modal from '../components/UI/Modal.jsx';
import OrderSummary from '../components/Burger/OrderSummary.jsx';
import axios from '../axios-orders';
import Spinner from '../components/UI/Spinner.jsx';
import withErrorHandler from '../components/hoc/withErrorHandler.jsx';
import * as actionTypes from '../store/actions';
class BurgerBuilder extends Component {
    state = {
        totalPrice: 4,
        ordering: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
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
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        
        queryParams.push(`price=${this.state.totalPrice}`)

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingredientName) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
        removeIngredient: (ingredientName) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));