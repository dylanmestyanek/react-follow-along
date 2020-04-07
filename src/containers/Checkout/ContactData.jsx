import React, { Component } from 'react';
import styled from '@emotion/styled';

import axios from '../../axios-orders';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

class ContactData extends Component { 
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const newOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Dylan',
                address: {
                    street: 'Test St.',
                    zipCode: 43252,
                    country: 'United States'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        return (
            <ContactDataContainer>
                <h4>Enter your Contact Data:</h4>
                {!this.state.loading ? (
                    <form>
                        <input type="text" name="name" placeholder="Your name" />
                        <input type="email" name="email" placeholder="Your email" />
                        <input type="text" name="street" placeholder="Street" />
                        <input type="text" name="postal" placeholder="Postal Code" />
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

        input {
            margin: 3px 0;
            padding: 3px 2px;
            width: 50%;
        }
    } 

    @media (min-width: 600px) {
        width: 500px;
    }
`;