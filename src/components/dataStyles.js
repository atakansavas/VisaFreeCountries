import React, { Component } from "react";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';


export const DefaultStyle = new Style({
    fill: new Fill({
        color: 'rgba(116, 139, 133, 1)'
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: '#000'
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 3
        })
    })
});

export const VisaFreeStyle = new Style({
    fill: new Fill({
        color: 'rgba(158, 242, 141, 1)'
    }),
    stroke: new Stroke({
        color: '#319FD3',
        width: 1
    }),
    text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
            color: 'white'
        }),
        stroke: new Stroke({
            color: '#fff',
            width: 3
        })
    })
});
