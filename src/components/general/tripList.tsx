import axios from "axios"
import { useEffect, useState } from "react"
import { serverApi } from "../../constants/api"
import { useNavigate } from "react-router-dom"
import { format } from 'date-fns';
import { getLocationSuggestion } from "../../constants/functions/locationSuggestion"
import { calculateDistance } from "../../constants/functions/calculateDistance"
import Empty from "./empty"
import { getGeminiData } from "../../constants/getGeminiData"
import { AttractPlace } from "./cards/attraction"
import ClipLoaders from "./loader/clipLoader"
export interface attractionsType {
    text: string
    description: string
}
export interface tripType {
    _id: string
    title: string
    club: string
    startDate: Date
    itenary: {
        place: string
        longitude: string
        latitude: string
        _id: string
    }[]
    members: {
        _id: string
        email: string
        member: string
    }[]
}
const TripList = () => {
    const [trips, setTrips] = useState<tripType[]>([])
    const [filteredTrip, setFilteredTrip] = useState<tripType[]>([])
    const [place, setPlace] = useState<string>('')
    const [places, setPlaces] = useState<any[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [longitude, setLongitude] = useState<number>(0)
    const [latitude, setLatutude] = useState<number>(0)
    const [attractions, setAttraction] = useState<attractionsType[]>([])
    const [aloading, setAloading] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        const getTrips = async () => {
            try {
                const response = await axios.get(`${serverApi}/getTrips`)
                setTrips(response.data.data)
                setFilteredTrip(response.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getTrips()
    }, [])
    const handleGetPlaces = async (text: string) => {
        setPlace(text)
        const result = await getLocationSuggestion(text)
        console.log(result[0],'555');
        
        setPlaces(result)
        setIsSearch(true)
    }
    const handleGetNearByTrips = ({ dis, lati, long }: { dis: number, lati: number, long: number }) => {
        if (lati && long) {
            const filteredTrips = trips.filter((trip) => {
                const itenary = trip.itenary
                const length = itenary.length
                const startLatitude = parseFloat(itenary[length - 1].latitude);
                const startLongitude = parseFloat(itenary[length - 1].longitude)
                const distance = calculateDistance(
                    lati, long,
                    startLatitude, startLongitude
                )
                return Math.floor(distance) <= Math.floor(dis)
            })
            setFilteredTrip(filteredTrips)
        } else {
            console.log('no long mat');
        }
    }
    const handleGemini = async () => {
        try {
            setAloading(true)
            const response = await getGeminiData({ place })
            console.log(response);

            if (response.result) {
                setAttraction(response.result)
            } else if (response.results) {
                setAttraction(response.results)
            } else if (response.attractions) {
                setAttraction(response.attractions)
            }
            setAloading(false)
        } catch (error) {
            console.error('Error in API call', error);
        }
    }

    return (
        <>
            <section className="bg-white ">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className='flex justify-center  space-x-1'>
                        <div className="relative">
                            <input value={place}
                                onChange={(e) => {
                                    handleGetPlaces(e.target.value)
                                }}
                                type="search"
                                className="block w-full md:w-[25rem] px-4 py-2 text-black bg-white border rounded-full focus:border-slate-800 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                            />
                            {isSearch &&
                                <div className="absolute z-10 w-full px-1  h-24 overflow-y-scroll no-scrollbar ">
                                    <ul className="bg-white w-full rounded-lg">
                                        {places.map((place, i) => {
                                            return (
                                                <>
                                                    <li key={i} className="hover:bg-slate-200 shadow-sm rounded-xl">
                                                        <button type="button" onClick={() => {
                                                            setPlace(place.place_name)
                                                            setIsSearch(false)
                                                            const [long, lat] = place.geometry.coordinates
                                                            setLatutude(lat)
                                                            setLongitude(long)
                                                            handleGetNearByTrips({ dis: 5, lati: lat, long: long })
                                                        }}>
                                                            {place.place_name}
                                                        </button>

                                                    </li>
                                                </>
                                            )
                                        })}
                                    </ul>
                                </div>}
                        </div>
                        <button className="px-4 text-white hover:text-black bg-black border hover:border-black hover:bg-white rounded-full "
                            onClick={() => handleGetNearByTrips({ dis: 100, lati: latitude, long: longitude })}>
                            Nearby
                        </button>
                        <div className=" flex justify-end">
                            <button className="px-4 h-full text-white hover:text-black bg-black border hover:border-black hover:bg-white rounded-full "
                                onClick={handleGemini}>
                                {longitude ? 'Attraction' : 'My Trips'}
                            </button>
                        </div>
                    </div>
                    <div className={` grid gap-8 mb-6 lg:mb-16 md:grid-cols-2 mt-14`}>
                        {trips &&
                            filteredTrip.length > 0 ? filteredTrip.map((trip) => {
                                const id = trip?._id
                                const formattedDate = format(trip?.startDate, 'dd-MM-yyyy')
                                return (
                                    <div key={id} onClick={() => navigate(`/tripDetail/${id}`)} className="items-center bg-gray-50 rounded-lg shadow sm:flex  border-black">
                                        <div className="p-5">
                                            <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                                                <a href="#">{trip?.title} </a>
                                            </h3>
                                            <span className="text-gray-500 dark:text-gray-400">{formattedDate} </span>
                                            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{trip?.itenary[0]?.place.split(',').slice(0, 2).join(', ')} {'->'} {trip?.itenary[trip.itenary.length - 1]?.place.split(',').slice(0, 2).join(', ')} </p>

                                        </div>
                                    </div>
                                )
                            })
                            :
                            <div>
                                <Empty message={`No Trips to ${place}`} />
                            </div>}
                    </div>
                    {aloading ? <ClipLoaders loading={aloading} /> :
                        attractions.length > 0 &&
                        <div className=" mx-auto py-12 px-4 grid grid-cols-3">
                            {attractions.map((attraction: attractionsType) => {
                                return (
                                    <AttractPlace attractions={attraction} />
                                )
                            })}
                        </div>
                    }
                </div>
            </section>

        </>)
}
export default TripList



