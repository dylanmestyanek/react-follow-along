import React from 'react';
import './BuildControl.css';

const BuildControl = (props) => (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button 
            className="Less" 
            onClick={() => props.removeIngredient(props.type)}
            disabled={props.disabledInfo}    
        >Remove</button>
        <button className="More" onClick={() => props.addIngredient(props.type)}>Add</button>
    </div>
);

export default BuildControl;