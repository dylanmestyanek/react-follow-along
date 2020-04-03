import React from 'react';
import './Backdrop.css';

const Backdrop = props => (
    props.ordering ? <div className="Backdrop" onClick={() => props.stopOrdering()}></div> : null
);

export default Backdrop;