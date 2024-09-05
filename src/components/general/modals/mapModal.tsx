import { useEffect } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl'

import axios from 'axios';
import { Feature, LineString } from 'geojson'
// import { itenaryType } from '../clubDetail';
import { mapboxApi } from '../../../constants/api';

interface type {
    // itenaries: itenaryType[]
    setIsmap:(isMap:boolean)=>void
    routeCordinate: any

}

const Map = ({setIsmap,  routeCordinate }: type) => {
console.log(routeCordinate,'coooo');

    useEffect(() => {
        mapboxgl.accessToken = mapboxApi;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [76.31789, 9.968435], // starting position
            zoom: 12
        });
        

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
        <>
            <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                <div className="absolute bg-black opacity-80 inset-0  z-0"></div>
                <div className="w-[90%]  max-w-lg p-5 relative mx-auto my-auto rounded-xl  shadow-lg  bg-white ">
                    <div className="">
                        <div className="bg-red-50 w-full  rounded-lg shadow relative ">
                            <div className="flex justify-end p-2">
                                <button onClick={()=>setIsmap(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                </button>
                            </div>
                            <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 " action="#">
                                <div className="flex justify-center">
                                    <h3 className="text-xl font-medium text-gray-900 ">Route Map</h3>
                                </div>
                                <div className="w-full flex justify-center">
                                    <div id='map' className='m-auto overflow-hidden w-3/4 md:h-96 sm:h-56 h-40 pb-4' />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
export default Map