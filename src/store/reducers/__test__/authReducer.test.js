import reducer from '../authReducer';
import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH
} from '../../actions/actionsTypes';

describe('Auth Reducer', () => {
    const initialState = {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    }

    it('should return initial state without a passing case', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should store token and userId upon successful login', () => {
        const newState = reducer(undefined, { type: AUTH_SUCCESS, token: "test token", userId: "userId" });
        expect(newState.token).toEqual('test token');
        expect(newState.userId).toEqual('userId');
    })
});