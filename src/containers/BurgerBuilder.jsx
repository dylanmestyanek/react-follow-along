import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

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

export const BurgerBuilder = props => {
    const { fetchIngredients } = props;
    
    const [burgerState, setBurgerState] = useState({
        ordering: false,
        loading: false,
        error: false
    })
    
    useEffect(() => {
        props.fetchIngredients()
    }, [fetchIngredients]); 
    
    const ordering = () => {
        if (props.isAuthenticated) {
            setBurgerState({ ...burgerState, ordering: true })
        } else {
            props.setAuthRedirectPath('checkout');
            props.history.push("/auth");
        }
    }

    const stopOrdering = () => {
        setBurgerState({ ...burgerState, ordering: false })
    }

    const continueOrdering = () => {
        props.initializePurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...props.ingredients
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (props.ingredients) {
        burger = (
            <>
                <Burger data-testid="Burger" ingredients={props.ingredients} />
                <BuildControls 
                    data-testid="BuildControls"
                    disabledInfo={disabledInfo}
                    addIngredient={props.addIngredient} 
                    removeIngredient={props.removeIngredient}
                    price={props.totalPrice}
                    ordering={ordering}
                    isAuthenticated={props.isAuthenticated}
                    />
            </>
        );
        
        orderSummary = <OrderSummary 
            ingredients={props.ingredients} 
            stopOrdering={stopOrdering} 
            continueOrdering={continueOrdering}
            price={props.totalPrice}
        />
    }
    
    return (
        <>
            <Modal ordering={burgerState.ordering} stopOrdering={stopOrdering}>
                {orderSummary}
            </Modal>
            {burger}
            
        </>
    );
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