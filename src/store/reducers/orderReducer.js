import { SUCCESS_PURCHASING, FAILURE_PURCHASING, START_PURCHASING, INITIALIZE_PURCHASE } from '../actions/actionsTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state=initialState, action) => {
    switch(action.type){
        case INITIALIZE_PURCHASE:
            return {
                ...state,
                purchased: false
            };

        case START_PURCHASING:
            return {
                ...state,
                loading: true
            };

        case SUCCESS_PURCHASING:
            return {
                ...state,
                orders: [...state.orders, { 
                    ...action.orderData, 
                    id: action.orderId 
                }],
                loading: false,
                purchased: true
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