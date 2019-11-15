import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import { DefaultStyle, VisaFreeStyle } from './data/dataStyles';
import { VisaFreeCountries } from './data/visafreeCountries'
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import './map/map.css';

class MapPage extends Component {

    constructor(props) {
        super(props);


    }

    PreapareMap() {
        this.Map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
            ],
            projection: 'EPSG:4326',
            view: new View({
                center: [0, 0],
                zoom: 6
            })
        });
    }

    PrepareData() {

        var data = require('./data/data.geojson'); // forward slashes will depend on the file location

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
            <div class="container-fluid">
                <div style={{ width: '100%', height: 800 }} id='mapdiv'></div>
            </div>
        );
    }
}

export default MapPage;