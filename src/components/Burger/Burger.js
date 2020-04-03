import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

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
        <div className="Burger">
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div> 
    );
};

export default Burger;