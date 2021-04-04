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
    const [lat, setLat] = useState(51.820042);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('load', function () {
            map.addSource('maine', {
                    'type': 'geojson',
                    'data': {
                    'type': 'Feature',
                    'geometry': {
                    'type': 'Polygon',
                    'coordinates': London
                    }
                }
            });
            map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': 'maine',
            'layout': {},
            'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
            }
            });
        });

        return () => map.remove();
        }, []);

    return (
        <div className="pb-3">
           <div className="map-container" ref={mapContainer} style={{ height }}/>
        </div>
    )
  }

  export default Map;
