import React, { Component } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';
import { purchaseBurger } from '../../store/actions/index';

class ContactData extends Component { 
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    name: 'street',
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    name: 'zipCode',
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    name: 'country', 
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    name: 'deliveryMethod',
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },
        formIsValid: false,
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value
        }

        const newOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }

        this.props.purchaseBurger(newOrder)
    }

    handleInputChange = e => {
        const {name, value} = e.target;
        let formIsValid = true;

        const isValid = this.checkValidity(value, this.state.orderForm[name].validation);

        for (let input in this.state.orderForm) {
            if (input !== name) {
                formIsValid = this.state.orderForm[input].valid && formIsValid;
            }
        }

        this.setState({
            orderForm: {
                ...this.state.orderForm,
                [name]: {
                    ...this.state.orderForm[name],
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

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        return (
            <ContactDataContainer>
                <h4>Enter your Contact Data:</h4>
                {!this.props.loading ? (
                    <form onSubmit={this.orderHandler}>
                        {formElements.map(element => (
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
                        ))}
                        <Button buttonType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>Order</Button>
                    </form>
                ) : <Spinner />}
                
            </ContactDataContainer>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (newOrder) => dispatch(purchaseBurger(newOrder))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

const ContactDataContainer = styled.div`
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