import React, { memo } from 'react';
import Backdrop from './Backdrop';
import styled from '@emotion/styled';

const Modal = props => {
    return (
        <>
            <Backdrop ordering={props.ordering} stopOrdering={props.stopOrdering} />
            <ModalContainer 
                style={{ 
                    transform: props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.ordering ? '1' : '0'
                }}>
                {props.children}
            </ModalContainer>
        </>
    );
};

export default memo(Modal, (prevProps, nextProps) => nextProps.ordering === prevProps.ordering && nextProps.children === prevProps.children);

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