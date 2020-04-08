import React from 'react';
import styled from '@emotion/styled';

const Input = props => {
    let inputElement = null;

    switch (props.elementType) {
        case('input'):
            inputElement = <input className={(props.isValid && props.shouldValidate && props.touched) ? "Invalid" : null}{...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={(props.isValid && props.shouldValidate && props.touched) ? "Invalid" : null}{...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select className={(props.isValid && props.shouldValidate) ? "Invalid" : null}{...props.elementConfig} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input className={(props.isValid && props.shouldValidate && props.touched) ? "Invalid" : null}{...props.elementConfig} value={props.value} onChange={props.changed} />;
    }

    return (
        <InputContainer>
            <label>{props.label}</label>
            {inputElement}
        </InputContainer>
);

};

export default Input;

const InputContainer = styled.div`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;

    label { 
        font-weight: bold;
        display: block;
        margin-bottom: 8px;
    }

    input, select { 
        outline: none;
        border: 1px solid #ccc;
        background-color: white;
        font: inherit;
        padding: 6px 10px;
        width: 100%;
        box-sizing: border-box;
        border-radius: none;
        
        &:focus {
            outline: none;
            background-color: #ccc;
        }
    }

    .Invalid {
        border: 1px solid red;
        background: #FDA49A;
    }
`;