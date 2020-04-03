import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
];

const BuildControls = props => (
    <div className="BuildControls">
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
            disabled={Object.values(props.disabledInfo).filter(bool => bool !== true).length === 0}
            onClick={() => props.ordering()}
        >Order Now</button>
    </div>
);

export default BuildControls;