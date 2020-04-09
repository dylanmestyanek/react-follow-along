import axios from 'axios';
import { 
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL
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
            console.log(res)
            dispatch({ type: AUTH_SUCCESS, authData: res })

        })
        .catch(error => {
            console.log(error);
            dispatch({ type: AUTH_FAIL, error: error })
        });
};