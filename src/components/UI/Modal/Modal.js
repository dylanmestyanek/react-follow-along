import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = props => (
    <>
        <Backdrop ordering={props.ordering} stopOrdering={props.stopOrdering} />
        <div 
            className="Modal" 
            style={{ 
                transform: props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.ordering ? '1' : '0'
            }}>
            {props.children}
        </div>
    </>
);

export default Modal;