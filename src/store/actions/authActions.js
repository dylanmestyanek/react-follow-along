import axios from 'axios';
import { 
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT
} from './actionsTypes';

export const authorizeUser = (email, password, isSignIn) => dispatch => {
    dispatch({ type: AUTH_START });

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPgBpXoe9KGMYI9-0qlXSCz0Njgsm4mrU';

    if (isSignIn) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPgBpXoe9KGMYI9-0qlXSCz0Njgsm4mrU'
    }

    const authData = {
        email, 
        password,
        returnSecureToken: true
    };

    axios.post(url, authData)
        .then(res => {
            dispatch({ type: AUTH_SUCCESS, userId: res.data.localId, token: res.data.idToken })
            setTimeout(() => {
                dispatch({ type: AUTH_LOGOUT })
            }, (+res.data.expiresIn * 10));
        })
        .catch(error => {
            console.log(error.message)
            dispatch({ 
                type: AUTH_FAIL, 
                error: { 
                    title: error.name, 
                    details: error.message
                } 
            })
        });
};

export const logout = () => {
    return { type: AUTH_LOGOUT };
};