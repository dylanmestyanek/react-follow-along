import React, { useState } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import withErrorHandler from '../../components/hoc/withErrorHandler';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';
import { purchaseBurger } from '../../store/actions/index';
import { checkValidity } from '../../utils/checkValidity';

const ContactData = props => { 
    const [orderForm, setOrderForm] = useState({
        inputs: {
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
    });

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let element in orderForm.inputs) {
            formData[element] = orderForm.inputs[element].value
        }

        const newOrder = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        }

        props.purchaseBurger(newOrder, props.token)
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        let formIsValid = true;

        const isValid = checkValidity(value, orderForm.inputs[name].validation);

        for (let input in orderForm.inputs) {
            if (input !== name) {
                formIsValid = orderForm.inputs[input].valid && formIsValid;
            }
        }

        setOrderForm({
            ...orderForm,
            inputs: {
                ...orderForm.inputs,
                [name]: {
                    ...orderForm.inputs[name],
                    value: value,
                    valid: isValid,
                    touched: true
                }
            },
            formIsValid: formIsValid
        })
    }

        const formElements = [];

        for (let key in orderForm.inputs) {
            formElements.push({
                id: key,
                config: orderForm.inputs[key]
            })
        }

        return (
            <ContactDataContainer>
                <h4>Enter your Contact Data:</h4>
                {!props.loading ? (
                    <form onSubmit={orderHandler}>
                        {formElements.map(element => (
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
                        ))}
                        <Button buttonType="Success" disabled={!orderForm.formIsValid} clicked={orderHandler}>Order</Button>
                    </form>
                ) : <Spinner />}
                
            </ContactDataContainer>
        );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (newOrder, token) => dispatch(purchaseBurger(newOrder, token))
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