import axios from '../../axios-orders';
import {
    ADD_INGREDIENT,
    REMOVE_INGREDIENT,
    SET_INGREDIENTS,
    FETCH_INGREDIENTS_FAILED
} from './actionsTypes';

export const addIngredient = (ingredientName) => {
    return { type: ADD_INGREDIENT, ingredientName: ingredientName }
};

export const removeIngredient = (ingredientName) => {
    return { type: REMOVE_INGREDIENT, ingredientName: ingredientName }
}

export const fetchIngredients = () => dispatch => {
    axios.get('/ingredients.json')
        .then(response => dispatch({ type: SET_INGREDIENTS, ingredients: response.data }))
        .catch(error => dispatch({ type: FETCH_INGREDIENTS_FAILED }));
};