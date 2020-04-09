import axios from 'axios';
import { 
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_LOGOUT,
    SET_AUTH_REDIRECT_PATH
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
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('tokenExpirationDate', expirationDate);
            localStorage.setItem('userId', res.data.localId);

            dispatch({ type: AUTH_SUCCESS, userId: res.data.localId, token: res.data.idToken })
            setTimeout(() => {
                dispatch(logout());
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
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationDate');
    localStorage.removeItem('userId');
    return { type: AUTH_LOGOUT };
};

export const setAuthRedirectPath = path => {
    return { type: SET_AUTH_REDIRECT_PATH, path: path }
}

export const checkAuthState = () => dispatch => {
    const token = localStorage.getItem('token');
    const expirationDate = new Date(localStorage.getItem('tokenExpirationDate'));
    const userId = localStorage.getItem('userId');

    if (!token || (expirationDate <= new Date())) {
        dispatch(logout());
    } else {
        dispatch({ type: AUTH_SUCCESS, userId: userId, token: token })

        setTimeout(() => {
            dispatch(logout());
        }, ((expirationDate.getTime() - new Date().getTime()) / 1000))
    }
}