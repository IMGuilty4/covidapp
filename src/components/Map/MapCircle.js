import React from "react";
import {Circle, Popup} from "react-leaflet";
import numeral from "numeral";

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 250,
    },
    recovered: {
        hex: "#4A934A",
        multiplier: 200,
    },
    deaths: {
        hex: "#FB4443",
        multiplier: 1000,
    },
};

const MapCircle = (props) => {
    const {country, casesType, ...rest} = props;
    return(
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.3}
            color={casesTypeColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
            } 
        >
            <Popup style={{backgroundColor: "#f5f5f5"}}>
            <div className="info__container">
                <div className="info__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})`}}></div>
                <div className="info__country"><strong>{country.country}</strong></div>
                <div className="info__num">Заразилось: {numeral(country.cases).format("0,0")}</div>
                <div className="info__num">Вылечилось: {numeral(country.recovered).format("0,0")}</div>
                <div className="info__num">Умерло: {numeral(country.deaths).format("0,0")}</div>
            </div>
            </Popup>

        </Circle>
    )
}


export default MapCircle;