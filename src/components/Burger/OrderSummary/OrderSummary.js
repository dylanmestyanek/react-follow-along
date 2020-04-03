import React, { Component } from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentDidUpdate(){
        console.log("[OrderSummary.js] We Updated!")
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingredient => {
            return (
                <li key={ingredient}>
                    <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {this.props.ingredients[ingredient]}
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
                <p><strong> Total Price: ${this.props.price.toFixed(2)} </strong></p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.stopOrdering}>Cancel</Button>
                <Button buttonType="Success" clicked={this.props.continueOrdering}>Continue</Button>
            </>
        );
    }
   

};

export default OrderSummary;