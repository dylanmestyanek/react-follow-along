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
        {
            controls.map(control => <BuildControl 
                key={control.label} 
                label={control.label} 
                type={control.type}
                addIngredient={props.addIngredient}
            /> )
        }
    </div>
);

export default BuildControls;