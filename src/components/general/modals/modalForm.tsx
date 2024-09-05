import { useEffect, useState } from "react";
import { itenaryType } from "../clubDetail";
import { getLocationSuggestion } from "../../../constants/functions/locationSuggestion";
import axios from "axios";
import { serverApi } from "../../../constants/api";

interface formType {
    setIsForm: (isForm: boolean) => void;
    itenaries: itenaryType[];
    setItenaries: (itenaries: itenaryType[]) => void;
    id: string | undefined
}

const ModalForm = ({ setIsForm, itenaries, setItenaries, id }: formType) => {
    const [page, setPage] = useState<number>(0);
    const [itenary, setItenary] = useState<string>('')
    const [places, setPlaces] = useState<any[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [longitude, setLongitude] = useState<number>(0)
    const [latitude, setLatutude] = useState<number>(0)
    const [title, setTitle] = useState<string>('')
    const [date, setDate] = useState<string>('')




    const handleAddNewItenary = () => {
        if (itenary.trim()) {
            setItenaries([...itenaries, { place: itenary, longitude: longitude, latitude: latitude }]);
            // setIsmap(true)
            setItenary("");
        }
    };

    useEffect(() => {
        console.log('itt===>', itenaries);
    }, [itenaries]);

    const handleGetPlaces = async (text: string) => {
        setItenary(text)
        const result = await getLocationSuggestion(text)
        setPlaces(result)
        setIsSearch(true)
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!title.trim() || !date.trim()) {
            alert('fill all')
            return
        }
        try {

            const response = await axios.post(`${serverApi}/addTrip`, { title, date, itenaries, id })
            console.log(response.data);
        } catch (error) {
            console.log('Error oocured==>', error);

        }

    }
    return (
        <>
            <div className="overflow-x-hidden overflow-y-scroll fixed h-modal h-80 top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center">
                <div className="relative w-full max-w-md px-4 h-full md:h-auto">
                    <div className="bg-white rounded-lg shadow relative">
                        <div className="flex justify-end p-2">
                            <button onClick={() => setIsForm(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" >
                            <h3 className="text-xl font-medium text-gray-900">Create A Ride</h3>
                            {page === 0 && (
                                <div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-900 block mb-2 ">Title</label>
                                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-900 block mb-2 ">Date</label>
                                        <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                </div>
                            )}
                            {page === 1 && (
                                <div><div className="flex justify-between mb-5">

                                    <h6 className="text-sm font-medium text-gray-900">Itenary</h6>
                                </div>
                                    {itenaries.map((itenary, index) => (
                                        <div key={index} className="flex gap-5">
                                            <div className="w-[75%]">
                                                <input
                                                    value={itenary.place}
                                                    type="text"
                                                    readOnly
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                />
                                            </div>
                                            <button className="bg-slate-300 hover:bg-slate-400 p-1 h-1/3 rounded-lg">del</button>
                                        </div>
                                    ))}
                                    <div className="flex gap-5">
                                        <div className="w-[75%]">
                                            <input
                                                value={itenary}
                                                onChange={(e) => {

                                                    handleGetPlaces(e.target.value)
                                                }}
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                placeholder="Title"
                                            />
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
                                        <button onClick={handleAddNewItenary} type="button" className="bg-slate-300 hover:bg-slate-400 p-1 h-1/3 rounded-lg">add</button>
                                    </div>
                                    <button type="submit" className="mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                </div>
                            )}
                            <div className={`flex ${page < 1 ? 'justify-end' : 'justify-start'} mt-5`}>
                                <button onClick={() => setPage((page) => page - 1)} type="button" className={`${page < 1 ? 'hidden' : 'block'} w-1/4 text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>prev</button>
                                <button onClick={() => setPage((page) => page + 1)} type="button" className={`${page > 0 ? 'hidden' : 'block'} w-1/4 text-white bg-slate-400 hover:bg-slate-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalForm;
