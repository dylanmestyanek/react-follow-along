import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { authorizeUser, setAuthRedirectPath } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';
import { checkValidity } from '../../utils/checkValidity';

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

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.authRedirectPath){
            this.props.setAuthRedirectPath();
        }
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        let formIsValid = true;

        const isValid = checkValidity(value, this.state.controls[name].validation);

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

    handleSubmit = e => {
        e.preventDefault();
        const { email, password } = this.state.controls;
        this.props.authorizeUser(email.value, password.value, this.state.isSignIn);
    }

    toggleAuthMode = () => {
        this.setState(prevState => {
            return { isSignIn: !this.state.isSignIn }
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
            !this.props.loading ? (
                <AuthContainer>
                    {this.props.isAuthenticated && <Redirect to={`${this.props.authRedirectPath}`} />}
                    {this.props.error && <p>{this.props.error.title}: {this.props.error.details}</p>}
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
                    </form>
                    <Button buttonType="Danger" clicked={this.toggleAuthMode}>
                        {!this.state.isSignIn ? 'Already a user?' : 'Sign up here!'}
                    </Button>
                </AuthContainer>
            ) : <Spinner />
        );
    }
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