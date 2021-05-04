import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import { London } from "@utils/coordinates";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoibGV3aXNoZWFsZXkiLCJhIjoiY2tuMW1ic3ZiMHpiMDJwdHA3YngyZGw3NCJ9.HIUEFGrQfzLWF-c7sShszg';
export interface Props {
    height: number;
}

export const Map: React.FC<Props> = ({
    height
}) => {
    const mapContainer = useRef();
    const [lng, setLng] = useState(0.739470);
    const [lat, setLat] = useState(51.820040);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        var marker1 = new mapboxgl.Marker()
        .setLngLat([0.739470, 51.820040])
        .addTo(map);

        return () => map.remove();
        }, []);

    return (
        <div className="pb-3 overflow-hidden">
           <div className="relative" ref={mapContainer} style={{ height }}/>
        </div>
    )
  }

  export default Map;
