import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.ordering !== this.props.ordering || nextProps.children !== this.props.children
    }

    componentWillUpdate() {
        console.log("[Modal] Will update!!!!")
    }

    render() {
        return (
            <>
                <Backdrop ordering={this.props.ordering} stopOrdering={this.props.stopOrdering} />
                <div 
                    className="Modal" 
                    style={{ 
                        transform: this.props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.ordering ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </>
        );
    }
    
};

export default Modal;