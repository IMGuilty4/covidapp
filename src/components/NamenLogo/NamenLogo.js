import React from 'react';
import './NamenLogo.css';
import logo from '../../logo512x512.png'

function NamenLogo() {
    return (
        <div className="nl__container">
            <img src={logo}  alt="covid logo"/>
            <h1>COVID-19 TRACKER</h1>
        </div>
    )
}

export default NamenLogo
