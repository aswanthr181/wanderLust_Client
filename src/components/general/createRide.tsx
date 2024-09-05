import { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'

import { DISCOVERY_DOCS, gClientId, googleApi, gSCOPES, serverApi } from '../../constants/api';
import { getLocationSuggestion } from '../../constants/functions/locationSuggestion';
import { addEventToGoogle } from '../../constants/functions/calender/loadGoogleEvents';
import { initializeGapi } from '../../constants/functions/calender/initializeGapi';
import Map from './modals/mapModal';
import { generateError } from '../../constants/alerts/alerts';
interface formType {
    id: string | undefined
}

export interface itenaryType {
    place: string
    longitude: number
    latitude: number
}

const CreateRide = ({ id }: formType) => {
    useEffect(() => {

        initializeGapi(gClientId, googleApi, DISCOVERY_DOCS, gSCOPES, () => {
        });
    }, []);

    const [itenary, setItenary] = useState<string>('')
    const [places, setPlaces] = useState<any[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [longitude, setLongitude] = useState<number>(0)
    const [latitude, setLatutude] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<Date | undefined>()
    const [itenaries, setItenaries] = useState<itenaryType[]>([])
    const [isMap, setIsmap] = useState<boolean>(false)
    const [routeCordinate, setRouteCordinate] = useState<string>()


    const handleAddNewItenary = () => {
        if (itenary.trim()) {
            setItenaries([...itenaries, { place: itenary, longitude: longitude, latitude: latitude }]);
            // setIsmap(true)
            setItenary("");
        }
    };
    const handleRomove = (index: number) => {
        setItenaries([
            ...itenaries.slice(0, index),
            ...itenaries.slice(index + 1)
        ]);
    }
    useEffect(() => {
        const coordinatesString = itenaries.map(item => `${item.longitude},${item.latitude}`).join(';')
        setRouteCordinate(coordinatesString)
    }, [itenaries])

    const handleGetPlaces = async (text: string) => {
        setItenary(text)
        const result = await getLocationSuggestion(text)
        setPlaces(result)
        setIsSearch(true)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title.trim() || date === null) {
            generateError('Please fill all details')
            return
        }
        if(itenaries.length<2){
            generateError('Please add atleast 2 places')
        }
        try {
            const response = await axios.post(`${serverApi}/addTrip`, { title, date, itenaries, id })
            console.log(response.status);
            if (response.status === 200 && date) {

                const eventData = {
                    summary: title,
                    location: itenaries[0].place, // Update with dynamic data if necessary
                    description: 'ride', // Update with dynamic data if necessary
                    startTime: '17:00',
                    endTime: '18:00'
                };
                await addEventToGoogle(eventData, date);
                console.log('Event added successfully');
            }
        } catch (error) {
            console.log('Error oocured==>', error);

        }

    }
    return (
        <>
            <div className="relative bg-white  w-full md:px-10   ">
            <Toaster />

                <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
                        <div className="min-w-0 flex-1 space-y-8">
                            <h2 className="text-xl  font-semibold text-gray-900 ">Ride Details</h2>
                            <div className=" flex gap-4">
                                <div className="w-1/2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 "> TITLE </label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Club Name" />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-900 "> DATE</label>
                                        <input value={date ? date.toISOString().substring(0, 10) : ''}
                                            onChange={(e) => setDate(new Date(e.target.value))} type="date" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Place" />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div className='flex gap-3'>
                                        <div className='w-3/4'>
                                            <label className="mb-2 block text-sm font-medium text-gray-900 "> Itenary Place </label>
                                            <input value={itenary}
                                                onChange={(e) => handleGetPlaces(e.target.value)}
                                                type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="place..." />

                                            {isSearch && <div className="z-10 h-16 overflow-y-scroll ">
                                                <ul>
                                                    {places.map((place, i) => {
                                                        return (
                                                            <>
                                                                <li key={i} className="hover:bg-slate-200">
                                                                    <button type="button" onClick={() => {
                                                                        setItenary(place.place_name)
                                                                        setIsSearch(false)
                                                                        const [long, lat] = place.geometry.coordinates
                                                                        setLatutude(lat)
                                                                        setLongitude(long)
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
                                        <div className='w-1/4'>
                                            <label className="mb-2 block text-sm font-medium text-white ">. </label>
                                            <button onClick={handleAddNewItenary} type="button" className="bg-slate-300 hover:bg-slate-400 p-1 w-full   rounded-lg">add</button>
                                        </div>
                                    </div>
                                    <ol>
                                        <label className=" block text-sm font-medium text-gray-900 "> Itenary Place </label>

                                        <div className=''>
                                            {itenaries.map((itenary, index) => (
                                                <li
                                                    className="relative  px-4 py-2 bg-purple-200 border border-purple-700 rounded-md"
                                                    key={index}
                                                >
                                                    {index + 1} . {itenary.place}
                                                    <button onClick={() => handleRomove(index)} className="absolute top-1 right-1">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={2}
                                                            stroke="currentColor"
                                                            className="w-4 h-4 text-purple-500 hover:text-purple-700"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </li>
                                            ))}
                                        </div>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 sm:flex sm:justify-end">
                        <button type="submit"
                            className="hover:shadow-form  lg:w-1/8 rounded-md bg-orange-500 hover:bg-orange-400 py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            SUBMIT
                        </button>
                    </div>
                </form >


                {isMap && <Map routeCordinate={routeCordinate} setIsmap={setIsmap} />}
            </div >
        </>
    )
}
export default CreateRide

// {itenaries.map((itenary, index) => (
//     <li
//         className="px-4 py-2 bg-purple-200 border border-purple-700 rounded-md"
//         key={index}
//     >
//         {itenary.place}
//     </li>
// ))}


{/* <div className="flex flex-col justify-between items-center relative">
                <div className=' relative'>
                    <div className="flex flex-col justify-center gap-2">
                        <input
                            className="border p-2 rounded-md text-black"
                            type="text"
                            value={title} onChange={(e) => setTitle(e.target.value)}

                            placeholder="Enter job Title"
                        />
                        <div>
                            <input
                                className="sm:w-96 border p-2 rounded-md text-black"
                                type="text"
                                value={itenary}
                                onChange={(e) => handleGetPlaces(e.target.value)}
                                placeholder="Enter job requirements"
                            />
                            <button
                                className="px-8 py-1 border border-purple-500 rounded-full"
                                onClick={handleAddNewItenary}
                                style={{ marginLeft: "10px" }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <ul
                        className="flex w-full flex-wrap gap-5 justify-center pt-5"
                        style={{ marginBottom: "10px" }}
                    >
                        {itenaries.map((itenary, index) => (
                            <li
                                className="px-4 py-2 bg-purple-200 border border-purple-700 rounded-md"
                                key={index}
                            >
                                {itenary.place}
                            </li>
                        ))}
                    </ul>
                    <div>

                        {/* <ul className="flex w-full flex-wrap justify-center gap-3 pt-10">
                            {selectedFiles.map((file, index) => (
                                <li className="px-4 py-2 rounded-full bg-purple-200" key={index}>
                                    {file.name}
                                </li>
                            ))}
                        </ul> */}
