import axios from '../../axios-orders';
import { 
    START_PURCHASING,
    SUCCESS_PURCHASING,
    FAILURE_PURCHASING,
    INITIALIZE_PURCHASE,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAIL,
    FETCH_ORDERS_START
} from './actionsTypes';

export const purchaseBurger = (orderData, token) => dispatch => {
    dispatch({ type: START_PURCHASING });

    axios.post(`/orders.json?auth=${token}`, orderData)
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

export const fetchOrders = (token, userId) => dispatch => {
    dispatch({ type: FETCH_ORDERS_START });

    axios.get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            
            dispatch({ type: FETCH_ORDERS_SUCCESS , orders: fetchedOrders })
        })
        .catch(error => dispatch({ type: FETCH_ORDERS_FAIL, error: error }))
};
