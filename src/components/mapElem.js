import React, { Component } from "react";
import { render } from "react-dom";
import Map from 'ol/Map';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import { DefaultStyle, VisaFreeStyle } from './dataStyles';
import { VisaFreeCountries } from './visafreeCountries'
import GeoJSON from 'ol/format/GeoJSON';
import Circle from 'ol/geom/Circle';
// import * as Layer from 'ol/layer';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import data from './data.geojson';
import { OSM, Vector as VectorSource } from 'ol/source';

import Feature from 'ol/Feature';

class MapElem extends Component {

    constructor(props) {
        super(props);
    }

    PreapareMap() {
        this.Map = new Map({
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    })
                })
            ],
            projection: 'EPSG:4326',
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
    }

    PrepareData() {

        var data = require('./data.geojson'); // forward slashes will depend on the file location

        var vectorSource = new VectorSource({
            format: new GeoJSON(),
            url: data
        });

        var vectorLayer = new VectorLayer();
        vectorLayer.setStyle(function (feature) {
            var countyName = feature.get('NAME');
            if (VisaFreeCountries.indexOf(countyName) >= 0) {
                VisaFreeStyle.getText().setText(feature.get('NAME_SORT'));
                return VisaFreeStyle;

            }
            DefaultStyle.getText().setText(feature.get('NAME_SORT'));
            return DefaultStyle;
        });
        vectorLayer.setSource(vectorSource);

        this.Map.addLayer(vectorLayer);
    }

    componentDidMount() {
        this.PreapareMap();
        this.Map.setTarget('mapdiv');
        this.PrepareData();
    }

    render() {
        return (
            <div style={{ width: '100%', height: 800 }} id='mapdiv'></div>
        );
    }
}

export default MapElem;