import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { authorizeUser, setAuthRedirectPath } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';
import { checkValidity } from '../../utils/checkValidity';

const Auth = props => { 
      const { setAuthRedirectPath } = props;

    const [authState, setAuthState] = useState({
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'text',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        formIsValid: false,
        isSignIn: false
    });

    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath){
            props.setAuthRedirectPath();
        }
    }, [setAuthRedirectPath]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        let formIsValid = true;

        const isValid = checkValidity(value, authState.controls[name].validation);

        for (let input in authState.controls) {
            formIsValid = authState.controls[input].valid && formIsValid;
        }

        setAuthState({
            controls: {
                ...authState.controls,
                [name]: {
                    ...authState.controls[name],
                    value: value,
                    valid: isValid,
                    touched: true
                }
            },
            formIsValid: formIsValid
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = authState.controls;
        props.authorizeUser(email.value, password.value, authState.isSignIn, props.history);
    }

    const toggleAuthMode = () => {
        setAuthState({
            ...authState, 
            isSignIn: !authState.isSignIn
        })
    }

    const formElements = [];

    for (let key in authState.controls) {
        formElements.push({
            id: key,
            config: authState.controls[key]
        })
    }

    return (
        !props.loading ? (
            <AuthContainer>
                    {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
                    {props.error && <p>{props.error.title}: {props.error.details}</p>}
                <form onSubmit={handleSubmit}>
                    {
                        formElements.map(element => (
                            <Input 
                                key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                isValid={!element.config.valid}
                                shouldValidate={element.config.validation}
                                touched={element.config.touched}
                                changed={handleInputChange}
                            />
                        ))
                    }
                    <Button buttonType="Success" disabled={!authState.formIsValid} clicked={handleSubmit}>Submit</Button>
                </form>
                <Button buttonType="Danger" clicked={toggleAuthMode}>
                    {!authState.isSignIn ? 'Already a user?' : 'Sign up here!'}
                </Button>
            </AuthContainer>
        ) : <Spinner />
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        authorizeUser: (email, password, isSignIn) => dispatch(authorizeUser(email, password, isSignIn)),
        setAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

const AuthContainer = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;

    form {
        display: flex;
        flex-flow: column;
        align-items: center;
        box-shadow: 0 2px 3px #ccc;
        padding: 10px;
        box-sizing: border-box;
    } 

    @media (min-width: 600px) {
        width: 500px;
    }
`;