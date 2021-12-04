import React from 'react';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import MapCircle from './MapCircle';
import "./Map.css";
import "leaflet/dist/leaflet.css";

function Map({center, casesType, zoom, countries}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreet</a>'
                />
                {countries.map(country => <MapCircle country={country} casesType={casesType}/>)}
            </LeafletMap>
        </div>
    );
}

export default Map
