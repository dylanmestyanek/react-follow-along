import React from 'react';
import BuildControl from './BuildControl.jsx';
import styled from '@emotion/styled';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
];

const BuildControls = props => (
    <BuildControlsContainer>
        <p>Current Price: <strong>${(props.price).toFixed(2)}</strong></p>
        {controls.map(control => (
            <BuildControl 
                key={control.label} 
                label={control.label} 
                type={control.type}
                addIngredient={props.addIngredient}
                removeIngredient={props.removeIngredient}
                disabledInfo={props.disabledInfo[control.type]}
            /> 
        ))}
        <button 
            className="OrderButton" 
            disabled={props.isAuthenticated && Object.values(props.disabledInfo).filter(bool => bool !== true).length === 0}
            onClick={() => props.ordering()}>{props.isAuthenticated ? 'Order Now' : 'Sign Up To Order'}</button>
    </BuildControlsContainer>
);

export default BuildControls;

const BuildControlsContainer = styled.div`
    width: 100%;
    background-color: #CF8F2E;
    display: flex;
    flex-flow: column;
    align-items: center;
    box-shadow: 0 2px 2px #ccc;
    margin: auto;
    padding: 10px 0;

    .OrderButton {
        background-color: #DAD735;
        outline: none;
        cursor: pointer;
        border: 1px solid #966909;
        color: #966909;
        font-family: inherit;
        font-size: 1.2em;
        padding: 15px 30px;
        box-shadow: 2px 2px 2px #966909;
    }

    .OrderButton:hover, 
    .OrderButton:active {
        background-color: #A0DB41;
        border: 1px solid #966909;
        color: #966909;
    }

    .OrderButton:disabled {
        background-color: #C7C6C6;
        cursor: not-allowed;
        border: 1px solid #ccc;
        color: #888888;
    }

    .OrderButton:not(:disabled) {
        animation: enable 0.3s linear;
    }

    @keyframes enable {
        0% {
            transform: scale(1);
        }
        60% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
`;