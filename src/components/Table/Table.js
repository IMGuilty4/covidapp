import React from 'react';
import numeral from 'numeral';
import './Table.css'

const styles = {
    marginTop: "20px",
    overflow: "scroll",
    overflowX: "hidden",
    height: "400px",
    color: "#6A6D6D"
}

function Table({countries}) {
    return (
        <div className="table" style={styles}>
            {countries.map(({country, cases}) => (
                <ul>
                    <li>{country}</li>
                    <li><strong>{numeral(cases).format("0,0")}</strong></li>
                </ul>
            ))}
        </div>
    )
}

export default Table
