import React from 'react';
import BurgerIngredient from './BurgerIngredient';
import styled from '@emotion/styled';

const Burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredient => {
            return [...Array(props.ingredients[ingredient])].map((_, i) => {
                return <BurgerIngredient key={ingredient + i} type={ingredient} />
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    return (
        <BurgerContainer>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </BurgerContainer> 
    );
};

export default Burger;

const BurgerContainer = styled.div`
    width: 100%;
    margin: auto;
    height: 250px;
    overflow: scroll;
    text-align: center;
    font-weight: bold;
    font-size: 1.2rem;

    @media (min-width: 1000px) and (min-height: 700px) {
        width: 700px;
        height: 600px;
    }

    @media (min-width: 500px) and (min-height: 401px) {
        width: 450px;
        height: 400px;
    }

    @media (min-width: 500px) and (min-height: 400px) {
        width: 350px;
        height: 300px;
    }
`;