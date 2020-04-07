import React, { Component } from 'react';
import styled from '@emotion/styled';

import axios from '../../axios-orders';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';
import Input from '../../components/UI/Input';

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
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    name: 'email',
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    name: 'street',
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    name: 'zipCode',
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    name: 'country', 
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
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
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const formData = {};

        for (let element in this.state.orderForm) {
            formData[element] = this.state.orderForm[element].value
        }

        const newOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            ...formData
        }

        axios.post('/orders.json', newOrder)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    handleInputChange = e => {
        const {name, value} = e.target;

        this.setState({
            orderForm: {
                ...this.state.orderForm,
                [name]: {
                    ...this.state.orderForm[name],
                    value: value
                }
            }
        })
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
                {!this.state.loading ? (
                    <form onSubmit={this.orderHandler}>
                        {formElements.map(element => (
                            <Input 
                                key={element.id}
                                elementType={element.config.elementType}
                                elementConfig={element.config.elementConfig}
                                value={element.config.value}
                                changed={this.handleInputChange}
                            />
                        ))}
                        <Button buttonType="Success" clicked={this.orderHandler}>Order</Button>
                    </form>
                ) : <Spinner />}
                
            </ContactDataContainer>
        );
    }
}

export default ContactData;

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