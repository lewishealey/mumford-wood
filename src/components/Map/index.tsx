import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  LoadScript,
} from "@react-google-maps/api";
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const MAP_TOKEN = publicRuntimeConfig.MAP_TOKEN;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 51.82024064819105,
  lng: 0.7337239986668775,
};

const london = {
    lat: 51.5196451914439,
    lng: -0.13164818813090556,
  };
export interface Props {
  height: number;
}

export const Map: React.FC<Props> = ({ height }) => {

  return (
    <div className="mb-3">
      <LoadScript googleMapsApiKey={MAP_TOKEN}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
          <InfoWindow position={center}><>Factory</></InfoWindow>
          <InfoWindow position={london}><>Office</></InfoWindow>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
