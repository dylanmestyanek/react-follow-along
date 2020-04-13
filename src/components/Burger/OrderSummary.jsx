import React from 'react';
import Button from '../UI/Button.jsx';

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredient => {
        return (
            <li key={ingredient}>
                <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
            </li>
        );
    })

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}  
            </ul>  
            <p><strong> Total Price: ${props.price.toFixed(2)} </strong></p>
            <p>Continue to checkout?</p>
            <Button buttonType="Danger" clicked={props.stopOrdering}>Cancel</Button>
            <Button buttonType="Success" clicked={props.continueOrdering}>Continue</Button>
        </>
        );
};

export default OrderSummary;