import axios from "axios"
import { useEffect, useState } from "react"
import { serverApi } from "../../constants/api"
import { useNavigate, useParams } from "react-router-dom"
import ModalForm from "./modals/modalForm"
import MapRoute from "./map/map"
import CreateRide from "./createRide"
import { useAppUseSelector } from "../../store/hooks"
import ModalAction from "./modals/actionModal"
import Member from "./club/members"
import Trips from "./club/trips"

export interface itenaryType {
    place: string
    longitude: number
    latitude: number
}

const modalData = {
    text: 'Are you sure want to exit from thi group',
    action: 'EXIT'
}

const ClubDetail = () => {
    const [data, setData] = useState<any>()
    const [trips, setTrips] = useState<any[]>([])
    const { id } = useParams<string>()
    const [itenaries, setItenaries] = useState<itenaryType[]>([])
    const [isMap, setIsmap] = useState<boolean>(false)
    const [routeCordinate, setRouteCordinate] = useState<string>()
    const [page, setPage] = useState<boolean>(true)
    const navigate = useNavigate()
    const { email } = useAppUseSelector((state) => state.user)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isViewMembers, setIsViewMembers] = useState<boolean>(true)

    useEffect(() => {
        const coordinatesString = itenaries.map(item => `${item.longitude},${item.latitude}`).join(';')
        setRouteCordinate(coordinatesString)
    }, [itenaries])

    useEffect(() => {
        const getClubDetail = async () => {
            try {
                const response = await axios.get(`${serverApi}/detail/`, { params: { id } })
                console.log(response.data.data.members, 'deded', response.data.trip);

                setData(response.data.data)
                setTrips(response.data.trip)
            } catch (error) {
                console.log(error)
            }
        }
        getClubDetail()
    }, [])

    const handleAction = async () => {
        if (email) {
            const response = await axios.post(`${serverApi}/join`, { id, email })
            if (response.status === 200) {
                navigate('/clubs')
            }
            console.log(response, 'resss');
        }
    }
    const handleExit = () => {
        setIsModalOpen(true)
    }

    return (
        <>{data &&
            <div className="  ">
                <div className="h-screen bg-gray-200    flex flex-wrap    justify-center  ">
                    <div className="relative safelist sm:w-full md:w-5/6 mt-10  bg-white  shadow-lg  ">
                        <div className=" h-20 w-full gap-2 overflow-hidden bg-slate-50 flex items-center justify-between" >
                            <button onClick={() => navigate(`/chat/${id}`)} className="h-3/4 safelist  text-center w-1/2 p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer">
                                <p><span className="font-semibold">CHAT</span></p>
                            </button>
                            <button onClick={handleExit} className={`${data.admin === email ? 'hidden' : 'block'} h-3/4 safelist  text-center w-1/2 p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer`}>
                                <p><span className="font-semibold">EXIT</span></p>
                            </button>
                            <button onClick={() => setPage((page) => !page)} className={`${data.admin === email ? 'block' : 'hidden'} h-3/4 text-center w-1/2 p-4 bg-gray-100 hover:bg-gray-200 cursor-pointer`}>
                                <p><span className="font-semibold">{page ? 'CREATE RIDE' : 'HOME'} </span></p>
                            </button>
                        </div>
                        {page ?
                            <div>
                                <div className="flex justify-center px-5  -mt-12">
                                    <img className="h-44 w-44 bg-white p-2 rounded-full   " src={`${data ? data.logo : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}`} alt="" />

                                </div>
                                <div className=" ">
                                    <div className="text-center px-14">
                                        <h2 className="text-gray-800 text-3xl font-bold">{(data?.clubName)} </h2>
                                        <a className="text-gray-400 mt-2 hover:text-blue-500" href="" >{data?.admin} </a>
                                        {/* <p className="mt-2 text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p> */}
                                    </div>
                                    <hr className="mt-6" />
                                    <div className="flex  bg-gray-50 ">
                                        <div onClick={() => setIsViewMembers(true)} className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                            <p><span className="font-semibold">{data?.members.length} </span> Members</p>
                                        </div>
                                        <div className="border"></div>
                                        <div onClick={() => setIsViewMembers(false)} className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                                            <p> <span className="font-semibold">{trips.length} </span> TRIPS</p>
                                        </div>

                                    </div>
                                    <div>
                                        <div className={`${isViewMembers ? 'block' : 'hidden'} w-full`}>
                                            <Member members={data.members} />
                                        </div>
                                        <div className={`${isViewMembers ? 'hidden' : 'block'} w-full`}>
                                            {trips.length > 0 &&
                                                <div className="p-5">
                                                    <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                                                        <a href="#">{trips[0].title} </a>
                                                    </h3>
                                                    <span className="text-gray-500 dark:text-gray-400">{trips[0].startDate} </span>
                                                    <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{trips[0]?.itenary[0]?.place.split(',').slice(0, 2).join(', ')} {'->'} {trips[0]?.itenary[trips[0].itenary.length - 1]?.place.split(',').slice(0, 2).join(', ')} </p>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>
                                <CreateRide id={id} />
                            </div>
                        }
                    </div>
                </div>
                {isModalOpen && <ModalAction setIsModalOpen={setIsModalOpen} handleAction={handleAction} modalData={modalData} icon='' />}
            </div>
        }
        </>
    )
}
export default ClubDetail