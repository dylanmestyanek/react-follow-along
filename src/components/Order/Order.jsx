import React from 'react';
import styled from '@emotion/styled';

const Order = props => {
    let ingredientsList = [];

    for (let ingredient in props.ingredients) {
        ingredientsList.push(`${ingredient}: ${props.ingredients[ingredient]} `)
    }

    const ingredientDisplay = ingredientsList.map(ingredient => <span>{ingredient}</span>);

    return (
        <OrderContainer>
            <p>Ingredients: {ingredientDisplay}</p>
            <p>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></p>
        </OrderContainer>
    )
};

export default Order;

const OrderContainer = styled.div`
    width: 80%;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    margin: 10px auto;
    box-sizing: border-box;
    padding: 0 3%;

    span {
        text-transform: capitalize;
        display: inline-block;
        margin: 0 8px;
        border: 1px solid #ccc;
        padding: 5px;
    }
`;