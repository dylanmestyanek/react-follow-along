import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import { authorizeUser } from '../store/actions/index';

class Auth extends Component { 
    state = {
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
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        let formIsValid = true;

        const isValid = this.checkValidity(value, this.state.controls[name].validation);

        for (let input in this.state.controls) {
            formIsValid = this.state.controls[input].valid && formIsValid;
        }

        this.setState({
            controls: {
                ...this.state.controls,
                [name]: {
                    ...this.state.controls[name],
                    value: value,
                    valid: isValid,
                    touched: true
                }
            },
            formIsValid: formIsValid
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state.controls;
        this.props.authorizeUser(email.value, password.value, this.state.isSignIn);
    }

    toggleAuthMode = () => {
        this.setState(prevState => {
            return { isSignUp: !this.state.isSignUp }
        })
    }

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        return (
            <AuthContainer>
                <form onSubmit={this.handleSubmit}>
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
                                changed={this.handleInputChange}
                            />
                        ))
                    }
                    <Button buttonType="Success" disabled={!this.state.formIsValid} clicked={this.handleSubmit}>Submit</Button>
                    <Button buttonType="Danger" clicked={this.toggleAuthMode}>
                        {this.state.isSignUp ? 'Already a user?' : 'Sign up here!'}
                    </Button>
                </form>
            </AuthContainer>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authorizeUser: (email, password, isSignIn) => dispatch(authorizeUser(email, password, isSignIn))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

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