import React from 'react';
import './Modal.css';

const Modal = props => (
    <div 
        className="Modal" 
        style={{ 
            transform: props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.ordering ? '1' : '0'
        }}>
        {props.children}
    </div>
);

export default Modal;