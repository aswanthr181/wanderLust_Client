import axios from "axios"
import { useEffect, useState } from "react"
import { serverApi } from "../../constants/api"
import { useNavigate } from "react-router-dom"
import { useAppUseSelector } from "../../store/hooks"
import { calculateDistance } from "../../constants/functions/calculateDistance"
import ModalAction from "./modals/actionModal"
import ClipLoaders from "./loader/clipLoader"

interface type {
    name: string,
    place: string,
    logo: string,
    id: number,
    isMemberOrAdmin: boolean
}

interface memberType {
    email: string,
    member: string,
    _id: string
}
const modalData = {
    text: 'Are you sure want to join ',
    action: 'JOIN'
}
const Club = ({ name, place, logo, id, isMemberOrAdmin }: type) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const { email } = useAppUseSelector((state) => state.user)
    const navigate = useNavigate()
    console.log(id, 'comppp');

    const handleJoin = async () => {
        setIsModalOpen(true)
    }
    const hanleAction = async () => {
        try {
            if (email) {
                const response = await axios.post(`${serverApi}/join`, { id, email })
                if (response.status === 200) {
                    navigate(`/clubDetail/${id}`)
                }
                console.log(response, 'resss');

            }
        } catch (error) {

        }
    }

    return (
        <>

            <div className="flex justify-evenly m-3 w-full col-span-1 h-full bg-slate-500 text-white p-2 rounded-lg hover:shadow-lg">
                <div className="w-4/12 rounded-full me-1 flex items-center">
                    <img
                        src={logo ? logo

                            : "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                        }
                        className="w-40 h-40 rounded-full"
                        alt="..."
                    />
                </div>
                <div className="md:w-full flex items-center justify-evenly ">
                    <div className="w-full flex  justify-between items-center  capitalize">
                        <div className=" flex-row items-center ">
                            <h5 className="font-medium">{name}</h5>
                            <p className="">City : {place}</p>
                            <p className="">
                                Total Members : 0
                            </p>
                            <p className="">
                                Started Year : 10/02/2444
                            </p>
                            <p className="">Admin : aswanth</p>
                        </div>
                        <div className='flex justify-end h-1/2'>
                            {isMemberOrAdmin ? <button onClick={() => navigate(`/clubDetail/${id}`)}
                                className="bg-green-900 px-3 h-1/3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                            >View</button> : <button
                                onClick={() => email ? handleJoin() : ''}
                                className="bg-green-900 px-3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                            >
                                Join
                            </button>}
                            {/* {2 < 3 ? <button
                                className="bg-green-900 px-3 h-1/3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                            >Requested</button> : 2 < 3 ? <button onClick={() => navigate(`/clubDetail/${id}`)}
                                className="bg-green-900 px-3 h-1/3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                            >View</button> : <button
                                onClick={() => navigate(`/clubDetail/${id}`)}
                                className="bg-green-900 px-3 rounded  hover:bg-green-600 hover:text-white py-1 transition-all duration-300 ease-in-out"
                            >
                                Join
                            </button>} */}

                        </div>

                    </div>
                </div>
                {isModalOpen && <ModalAction setIsModalOpen={setIsModalOpen} handleAction={hanleAction} modalData={modalData} icon='' />}

            </div>



        </>
    )
}

const Clubs = () => {
    const [clubs, setClubs] = useState<any[]>([])
    const [latitude, setLatitude] = useState<any>()
    const [longitude, setLlongitude] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)
    const { email } = useAppUseSelector((state) => state.user)

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude)
                setLlongitude(position.coords.longitude)
            })
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }, [])

    useEffect(() => {
        const getClub = async () => {
            try {
                const response = await axios.get(`${serverApi}/getClubs`)
                console.log(response.data.data)

                setClubs(response.data.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getClub()
    }, [])

    const FilterBy = () => {
        if (longitude && latitude) {
            const filteredClubs = clubs.filter((club) => {
                const distance = calculateDistance(
                    latitude,
                    longitude,
                    club.location.latitude,
                    club.location.longitude
                )
                console.log(Math.floor(distance), '100')
                return Math.floor(distance) <= Math.floor(100)
            })
            setClubs(filteredClubs)
        } else {
            console.log('Geolocation is not available');

        }

    }


    return (
        <>{
            !loading ?

                <div className="mt-10 overflow-hidden ">
                    <div className=" ">
                        <div className='flex justify-center  space-x-1'>
                            <input
                                type="search"

                                className="block w-full md:w-[20rem] px-4 py-2 text-black bg-white border rounded-full focus:border-slate-800 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                            />
                            <button

                                className="px-4 text-white bg-black rounded-full ">
                                Nearby
                                
                            </button>

                        </div>
                        <div className='absolute   w-full md:w-[40rem] top-[3.5rem] '>
                            {/* <ul className="absolute flex flex-col bg-white z-30 left-0">
                            {
                                fromSug &&
                                locationSuggestions.map((suggestion) => (
                                    <li className="text-lg border-b-2 border-white pl-5" key={suggestion.id}>
                                        <span

                                            className=" "
                                            onClick={() => {
                                                setFromSug(false);
                                                setSearch(true)
                                                setFrom(suggestion.place_name);
                                                setSelectedLocation(suggestion)
                                                // Update the input field with the selected suggestion
                                                setLocationSuggestions([]); // Clear the suggestions list
                                                // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                                                const [long, lat] = suggestion?.geometry.coordinates;
                                                // Update the turfs based on the selected location
                                                handleSearch(lat, long, 10);
                                            }}
                                        >
                                            {suggestion.place_name}
                                        </span>
                                    </li>
                                ))}
                        </ul> */}
                        </div>
                        <div className="mt-14 md:px-14 flex justify-end mr-2">
                            <button onClick={FilterBy} className="px-4 text-white bg-black rounded-full ">
                                My Location
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />

                            </button></div>
                        <div className=" grid md:grid-cols-2 grid-cols-1 gap-4 mr-5 md:px-14">

                            {clubs.length > 0 && clubs.map((club) => {
                                const isMemberOrAdmin = club.admin === email || club.members.some((member: memberType) => member.email === email);
                                return (
                                    <>
                                        <div key={club._id}>
                                            <Club name={club.clubName} place={club.location.place} logo={club.logo} id={club._id} isMemberOrAdmin={isMemberOrAdmin} />

                                        </div>
                                    </>
                                )
                            })} </div>
                    </div>
                </div>
                :
                <ClipLoaders loading={loading} />
        }
        </>
    )
}
export default Clubs



// div className="m-10 mx-4 max-w-screen-lg grid  overflow-hidden rounded-xl border shadow-lg md:pl-8">
//                 <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-52">
//                     <div className="order-first ml-auto h-48 w-1/2 bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
//                         <img className="h-full w-full" src={logo} alt="no image"
//                         // src="https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
//                         loading="lazy" />
//                     </div>
//                     <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
//                         <h4 className="text-lg font-bold text-gray-900 md:text-2xl lg:text-2xl">{name} </h4>
//                         <p className="mt-2 text-lg">{place} </p>
//                         {/* <p className="mt-4 mb-8 max-w-md text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto, cumque dolores sit odio ex.</p> */}
//                         <button onClick={()=>navigate(`/clubDetail/${id}`)} className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black hover:bg-slate-500 px-6 py-2 text-white transition">
//                             <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Visit </span>

//                         </button>
//                     </div>


//                 </div>
//             </div>