import axios from "axios"
import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { useParams } from "react-router-dom"
import { serverApi } from "../../constants/api"
import MapRoute from "./map/map";
import { itenaryType, itenaryType as BaseItenaryType } from './createRide'
import ClipLoaders from "./loader/clipLoader";
import ModalAction from "./modals/actionModal";
import { useAppUseSelector } from "../../store/hooks";
import { generateError, Toast } from "../../constants/alerts/alerts";
import { addEventToGoogle } from "../../constants/functions/calender/loadGoogleEvents";
import { tripType } from "./tripList";

export interface ExtendedItenaryType extends BaseItenaryType {
    _id: string;
}
const modalData = {
    text: 'Join Ride',
    action: 'JOIN'
}
interface memberType {
    _id: string
    email: string
    member: {
        picture: string
        name: string

    }
}
const TripDetail = () => {
    const { id } = useParams<string>()
    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>()
    const [routeCordinate, setRouteCordinate] = useState<any>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { email } = useAppUseSelector((state) => state.user)
    const [isMember, setIsMember] = useState<boolean>(false)

    useEffect(() => {
        const getTripDetail = async () => {
            setLoading(true)
            const response = await axios.get(`${serverApi}/getTripDetail`, { params: { id } })
            console.log(response.data, 'dete');
            const members = response.data.data.members
            const memberExists = members.some((member: { email: string }) => member.email === email);
            setIsMember(memberExists);
            setData(response.data.data)

            setLoading(false)
        }
        getTripDetail()
    }, [])
    useEffect(() => {
        if (data && data.itenary.length > 1) {
            const coordinatesString = data.itenary.map((item: itenaryType) => `${item.longitude},${item.latitude}`).join(';')
            setRouteCordinate(coordinatesString)
        }

    }, [data])
    const handleJoinRide = () => {
        setIsModalOpen(true)
    }
    const handleAction = async () => {
        setIsModalOpen(false)
        try {
            const result = await axios.post(`${serverApi}/joinRide`, { id, email })
            console.log(result, '525252')
            if (result.status === 200) {
                Toast.fire({
                    icon: "success",
                    title: result.data.action === 'exit' ? "Exit from Ride" : 'Joined To Ride',
                })
                const members = result.data.data.members
                const memberExists = members.some((member: { email: string }) => member.email === email);
                setIsMember(memberExists)
                setData(result.data.data)
                const eventData = {
                    summary: result.data.data.title,
                    location: result.data.data.itenary[0].place,
                    description: 'ride',
                    startTime: '17:00',
                    endTime: '18:00'
                }
                console.log(result.data.action);
                
                if (result.data.action === 'join') {

                    await addEventToGoogle(eventData, result.data.data.startDate)
                }
            }
        } catch (error) {
            console.log(error);
            generateError(String(error))
        }
    }
    return (
        <>
            {loading ?
                <ClipLoaders loading={loading} />
                :
                <div className=" h-screen  ">
                    <div className="h-full bg-red-50 flex flex-wrap justify-center  ">
                        <div className="bg-white flex justify-between py-8 rounded-3xl w-10/12  md:w-5/6 mt-10">
                            <div className="container mx-auto md:px-28 px-14">
                                <h1 className="text-lg md:text-3xl font-bold text-gray-800 mb-2 capitalize ">{(data?.title).toUpperCase()} </h1>
                                <p className="text-gray-600"> <span className="text-bold">DATE:</span> {(new Date(data.startDate)).toISOString().split('T')[0]} </p>
                            </div>
                            <div className="mx-auto px-5 md:px-14">
                                <button onClick={handleJoinRide} className="bg-gray-100 hover:bg-gray-200 text-bold  p-4 rounded-xl">{isMember ? 'EXIT' : 'JOIN'} </button>
                            </div>
                        </div>
                        <div className="relative safelist sm:w-full md:w-5/6 mt-4  bg-white rounded-3xl shadow-lg  ">
                            <div className="flex flex-col">

                                <div className="bg-white py-8">
                                    <div className="container mx-auto md:px-4 flex flex-col lg:flex-row">
                                        {/* <div className="w-full lg:w-8/12 ">
                                        {routeCordinate && data && <MapRoute routeCordinate={routeCordinate} />}

                                    </div> */}
                                        <div className="w-full lg:w-4/12 px-6 lg:px-4 mt-4 lg:mt-0">
                                            <div className="bg-gray-100 p-4">
                                                <h2 className="text-xl font-bold text-gray-800 mb-4">Routes</h2>
                                                <ul className="list-none">
                                                    {data?.itenary.map((item: ExtendedItenaryType) => {
                                                        return (
                                                            <div key={item._id} className="flex mb-3">
                                                                <div className="h-full flex items-center">

                                                                    <CiLocationOn size={20} />
                                                                </div>
                                                                <li className=" ml-1">
                                                                    <span className="text-gray-700 hover:text-gray-900">{item.place} </span>
                                                                </li>
                                                            </div>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="bg-gray-100 p-4 mt-4">
                                                <h2 className="text-xl font-bold text-gray-800 mb-4">Peoples</h2>
                                                <ul className="list-none">
                                                    {data?.members.map((member: memberType) => {
                                                        return (
                                                            <li key={member._id} className="mb-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="flex-shrink-0">
                                                                        <img className="w-6 h-6 rounded-full" src={`${member.member ? member?.member.picture : 'https://flowbite.com/docs/images/people/profile-picture-1.jpg'} `} alt=" image" />
                                                                    </div>

                                                                    <span className="text-gray-700 hover:text-gray-900">{member?.member?.name} </span>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && <ModalAction setIsModalOpen={setIsModalOpen} handleAction={handleAction} modalData={modalData} icon={''} />}
                </div >
            }
        </>
    )
}
export default TripDetail