import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 51.82024064819105,
  lng: 0.7337239986668775,
};
export interface Props {
  height: number;
}

export const Map: React.FC<Props> = ({ height }) => {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: "AIzaSyCCrBSmdMAhcbxkC-oGjl_cbgQ0y5-ETt0",
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     const bounds = new window.google.maps.LatLngBounds();
//     map.fitBounds(bounds);
//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

const onLoad = marker => {
    console.log('marker: ', marker)
  }

  return <div className="mb-3">
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_KEY}
      ><GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
       <Marker
      onLoad={onLoad}
      position={center}
    />
      </GoogleMap>
      </LoadScript>
    </div>
};

export default Map;
