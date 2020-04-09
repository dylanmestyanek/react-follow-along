import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../components/Order/Order';
import axios from '../axios-orders';
import withErrorHandler from '../components/hoc/withErrorHandler';
import { fetchOrders } from '../store/actions/index';
import Spinner from '../components/UI/Spinner';
class Orders extends Component { 
    componentWillMount() {
        this.props.fetchOrders(this.props.token);
    }

    render() {
        return (
            !this.props.loading ? (
                <div>
                    {
                        this.props.orders.map(order => (
                            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                            ))
                    }
                </div>
            ) : <Spinner />
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token) => dispatch(fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));