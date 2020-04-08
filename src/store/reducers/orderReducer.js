import { SUCCESS_PURCHASING, FAILURE_PURCHASING, START_PURCHASING } from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case START_PURCHASING:
            return {
                ...state,
                loading: true
            }

        case SUCCESS_PURCHASING:
            return {
                ...state,
                orders: [...state.orders, { 
                    ...action.orderData, 
                    id: action.orderId 
                }],
                loading: false
            };
        
        case FAILURE_PURCHASING:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};

export default reducer;