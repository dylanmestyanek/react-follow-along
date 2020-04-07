import React, { Component } from 'react';
import Backdrop from './Backdrop';
import styled from '@emotion/styled';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.ordering !== this.props.ordering || nextProps.children !== this.props.children
    }

    render() {
        return (
            <>
                <Backdrop ordering={this.props.ordering} stopOrdering={this.props.stopOrdering} />
                <ModalContainer 
                    style={{ 
                        transform: this.props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.ordering ? '1' : '0'
                    }}>
                    {this.props.children}
                </ModalContainer>
            </>
        );
    }
    
};

export default Modal;

const ModalContainer = styled.div`
    position: fixed;
    z-index: 500;
    background-color: white;
    width: 70%;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px black;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;

    @media (min-width: 600px) {
        width: 500px;
        left: calc(50% - 250px);
}
`;