import mapboxgl, { GeoJSONSource } from 'mapbox-gl'
import { mapboxApi } from "../../../constants/api";
import { useEffect } from 'react';
import axios from 'axios';
import { Feature, LineString } from 'geojson'
// import { itenaryType } from '../clubDetail';

interface type {
    // itenaries:itenaryType[]
    routeCordinate: any

}

const MapRoute = ({ routeCordinate }: type) => {

    useEffect(() => {
        mapboxgl.accessToken = mapboxApi;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [76.31789, 9.968435], // starting position
            zoom: 12
        });
        //         const coordinatesString =itenaries.map(item => `${item.longitude},${item.latitude}`).join(';')
        // console.log('coooooooordint',coordinatesString,itenaries);

        // new mapboxgl.Marker().setLngLat([76.31789,9.968435]).addTo(map);
        // new mapboxgl.Marker().setLngLat([76.658066,10.773289]).addTo(map);
        const getManpData = async () => {
            try {

                const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${routeCordinate}?geometries=geojson&access_token=${mapboxgl.accessToken} `)
                const result = response.data.routes[0]
                const route = result.geometry.coordinates
                console.log(result, 'mappppp');

                const geojson: Feature<LineString> = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                };

                if (map.getSource('route')) {
                    const source = map.getSource('route') as GeoJSONSource | undefined;
                    if (source) {
                        source.setData(geojson);
                    }
                } else {
                    map.on('load', () => {
                        map.addSource('route', {
                            type: 'geojson',
                            data: geojson, // Correctly referencing the geojson object
                        });

                        map.addLayer({
                            id: 'route',
                            type: 'line',
                            source: 'route',
                            layout: {
                                'line-join': 'round',
                                'line-cap': 'round',
                            },
                            paint: {
                                'line-color': '#339FFF',
                                'line-width': 6,
                            },
                        });
                    });
                }

            } catch (error) {
                console.log(error, 'error loading')
            }

        }
        getManpData()

    }, [routeCordinate])



    return (

        <div id='map' className='m-auto overflow-hidden  w-3/4 md:h-96 sm:h-56 h-40 pb-4' />

    )
}
export default MapRoute