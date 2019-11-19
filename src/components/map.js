import React, { Component } from "react";
import Map from 'ol/Map';
import View from 'ol/View';
import { DefaultStyle, VisaFreeStyle, SelectedCountryStyle } from './data/dataStyles';
import { VisaFreeCountries } from './data/visafreeCountries'
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import './map/map.css';

class MapPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCountryName: this.props.selectedCountryName
        }
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
                VisaFreeStyle.getText().setText(feature.get('NAME'));
                return VisaFreeStyle;

            }
            DefaultStyle.getText().setText(feature.get('NAME'));
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

    setFeatureStyle(feature) {
        var countryName = feature.get('NAME');
        DefaultStyle.getText().setText(feature.get('NAME'));
        VisaFreeStyle.getText().setText(feature.get('NAME'));
        if (VisaFreeCountries.indexOf(countryName) >= 0) {
            // VisaFreeStyle.getText().setText(feature.get('NAME'));
            feature.setStyle(VisaFreeStyle);
        }
        else {
            // DefaultStyle.getText().setText(feature.get('NAME'));
            feature.setStyle(DefaultStyle);
        }
    }

    flyToFeature() {
        var countryName = this.props.selectedCountryName;
        if (countryName !== "") {

            //This gives vector source.
            var source = this.Map.getLayers(0).array_[1].getSource();
            var featureList = source.getFeatures();
            var geom;

            for (let i = 0; i < featureList.length; i++) {
                var feat = featureList[i];
                var featName = feat.get("NAME");
                if (featName == countryName) {
                    SelectedCountryStyle.getText().setText(feat.get('NAME'));
                    feat.setStyle(SelectedCountryStyle);
                    geom = feat.getGeometry();
                }
                else {
                    feat.setStyle(function (feature) {
                        var countyName = feature.get('NAME');
                        if (VisaFreeCountries.indexOf(countyName) >= 0) {
                            VisaFreeStyle.getText().setText(feature.get('NAME'));
                            return VisaFreeStyle;

                        }
                        DefaultStyle.getText().setText(feature.get('NAME'));
                        return DefaultStyle;
                    });
                    // this.setFeatureStyle(feat);
                }
            }

            this.Map.getView().fit(geom, {
                duration: 1500
            });
        }
    }

    render() {
        this.flyToFeature();
        return (
            <div class="container-fluid">
                <div style={{ width: '100%', height: 800 }} id='mapdiv'></div>
            </div>
        );
    }
}

export default MapPage;