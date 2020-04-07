import React from 'react';
import styled from '@emotion/styled';

const BuildControl = (props) => (
    <BuildControlContainer>
        <div className="Label">{props.label}</div>
        <button 
            className="Less" 
            onClick={() => props.removeIngredient(props.type)}
            disabled={props.disabledInfo}    
        >Remove</button>
        <button className="More" onClick={() => props.addIngredient(props.type)}>Add</button>
    </BuildControlContainer>
);

export default BuildControl;

const BuildControlContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;

    button {
        display: block;
        font: inherit;
        padding: 5px;
        margin: 0 5px;
        width: 80px;
        border: 1px solid #AA6817;
        cursor: pointer;
        outline: none;
    }

    button:disabled {
        background-color: #AC9980;
        border: 1px solid #7E7365;
        color: #ccc;
        cursor: default;
    }

    button:hover:disabled {
        background-color: #AC9980;
        color: #ccc;
        cursor: not-allowed;
    }

    .Label {
        padding: 10px;
        font-weight: bold;
        width: 80px;
    }

    .Less {  
        background-color: #D39952;
        color: white;
    }

    .More {
        background-color: #8F5E1E;
        color: white;
    }

    .Less:hover, 
    .Less:active {  
        background-color: #DAA972;
        color: white;
    }

    .More:hover,
    .More:active {
        background-color: #99703F;
        color: white;
    }
`;