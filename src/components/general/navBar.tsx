import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppUseSelector } from "../../store/hooks"
import { useEffect, useState } from "react"
import { gapi } from 'gapi-script';
import { updateUserLogin, updateUserLogout } from "../../store/userSlice";
import ModalAction from "./modals/actionModal";
import { DISCOVERY_DOCS, gClientId, googleApi, gSCOPES, serverApi } from "../../constants/api";
import { initializeGapi } from "../../constants/functions/calender/initializeGapi";
import axios from "axios";
import Login from "../authentication/login";

const modalData = {
    text: '',
    action: 'LogOut'
}

const navigations = [
    { title: 'Home', url: '/' },
    { title: 'Clubs', url: '/clubs' },
    { title: 'Create', url: '/createClub' },
    { title: 'Calender', url: '/calendar' },
    { title: 'Trips', url: '/trips' }
]

const Navbar = () => {
    useEffect(() => {
        initializeGapi(gClientId, googleApi, DISCOVERY_DOCS, gSCOPES, () => {
        });
    }, []);

    const navigate = useNavigate()
    const [isGoogleSignedIn, setIsGoogleSignedIn] = useState<boolean>(false);
    const { picture, email } = useAppUseSelector((state) => state.user)
    const dispatch = useAppDispatch()
    const [navbar, setNavbar] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)


    const handleGoogleLogin = async () => {
        console.log('hii');

        const authInstance = gapi.auth2.getAuthInstance();

        if (authInstance.isSignedIn.get()) {
            //logout
            authInstance.signOut().then((res: any) => {
                console.log(res, 'resout');
                setIsGoogleSignedIn(false);
                dispatch(updateUserLogout())

            })
            setIsLogoutModalOpen(false)
        } else {
            console.log("before signing in")
            //login
            authInstance.signIn().then((res: any) => {
                const result = res.wt
                console.log(result.cu, result.hK, result, 'resss');

                console.log("Hello..u are signed in")

                axios.post(`${serverApi}/login`, { name: result.Ad, email: result.cu, picture: result.hK }).then((res) => {
                    if (res.status === 200) {
                        dispatch(updateUserLogin({ user: result.cu, picture: result.hK }))
                    }
                })
                setIsGoogleSignedIn(true)
            });
        }
    };

    const handleAuthentication = () => {

        if (email) {
            console.log('lllll');

            setIsLogoutModalOpen(true)
        } else {
            console.log('login');
            setIsModalOpen(true)
            // handleGoogleLogin()
        }

    }
    console.log(isGoogleSignedIn);

    return (
        <>

            <nav className={`w-full z-50  ${navbar ? "bg-slate-300" : "bg-slate-200"} md:bg-opacity-100 md:bg-slate-300 shadow sticky sm:text-sm text-xs top-0 `}>
                <div className={`justify-between px-4 mx-auto  lg:max-w-7xl md:items-center md:flex md:px-8`}>
                    <div className=''>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" >
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <p>
                                <span className="self-center text-lg font-semibold whitespace-nowrap"><span className="text-cyan-700">Wander</span><span>Lust</span></span>
                            </p>
                        </div>
                    </div>
                    <div className={`${navbar ? 'w-full h-full fixed md:h-auto md:flex' : 'md:flex'}`}>
                        <div className={`${navbar ? "w-full block fixed md:bg-transparent md:bg-opacity-0 md:backdrop-blur-none bg-opacity-70 bg-slate-500 backdrop-blur-[2px] left-0 md:left-auto" : "hidden md:flex"
                            }`}>
                            <div
                                className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 `}
                            >
                                <ul className="ms-2 hover:cursor-pointer items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                    {navigations.map((item) => {
                                        return (<>
                                            <li className={`${location.pathname == '/' ? 'md:text-slate-600 text-gray-400' : 'md:text-black  text-white'}hover:text-slate-700`}>
                                                <div className='flex' onClick={() => { navigate(item.url) }}>
                                                    <p>{item.title} </p>

                                                </div>
                                            </li>
                                        </>)
                                    })}

                                    <li className="md:text-black text-white md:hidden  hover:text-slate-700">
                                        <div className='flex'>
                                            <p>Login</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='hidden md:flex'>
                        <ul className="items-center  hover:cursor-pointer justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src={picture ? picture :
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU"
                                    }
                                    alt='no'
                                />
                            </li>


                            <li onClick={handleAuthentication} className="md:text-black text-white  md:flex  hover:text-slate-700">
                                <div className='flex'>
                                    {/* <PowerIcon className="h-5 w-5 me-2 md:hidden" /> */}
                                    <p>{email ? 'Logout' : 'Login'} </p>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>

                {isModalOpen && <Login setIsGoogleSignedIn={setIsGoogleSignedIn} setIsModalOpen={setIsModalOpen} />}

                {isLogoutModalOpen && <ModalAction setIsModalOpen={setIsLogoutModalOpen} handleAction={handleGoogleLogin} modalData={modalData} icon={''} />}
            </nav>

        </>
    )
}

export default Navbar