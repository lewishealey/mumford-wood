import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
export interface Props {
  height: number;
}

export const Map: React.FC<Props> = ({ height }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCCrBSmdMAhcbxkC-oGjl_cbgQ0y5-ETt0"
  });

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <div className="mb-3"><GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <></>
    </GoogleMap>
    </div>
) : <></>
};

export default Map;
