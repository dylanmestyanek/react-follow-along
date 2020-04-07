import React from 'react';
import styled from '@emotion/styled';

const Button = props => (
    <CustomButton
        style={{
            color: props.buttonType === 'Danger' ? '#944317' : '#5C9210' 
        }}
        onClick={(e) => props.clicked(e)}
    >
        {props.children}
    </CustomButton>
);

export default Button;

const CustomButton = styled.button`
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;

    &:first-of-type {
        margin-left: 0;
        padding-left: 0;
    }
`;