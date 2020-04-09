import axios from '../../axios-orders';
import { 
    START_PURCHASING,
    SUCCESS_PURCHASING,
    FAILURE_PURCHASING,
    INITIALIZE_PURCHASE
} from './actionsTypes';

export const purchaseBurger = (orderData) => dispatch => {
    dispatch({ type: START_PURCHASING });

    axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response)
                dispatch({ type: SUCCESS_PURCHASING, orderId: response.data.name, orderData: orderData })
            })
            .catch(error => {
                dispatch({ type: FAILURE_PURCHASING, error: error })
            });
};

export const initializePurchase = () => { 
    return { type: INITIALIZE_PURCHASE };
};

