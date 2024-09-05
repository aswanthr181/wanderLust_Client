import axios from "axios";
import { useAppDispatch } from "../../store/hooks";
import { updateUserLogin, updateUserLogout } from "../../store/userSlice";
// import GoogleLogins from "./googleLogin"
import { gapi } from 'gapi-script';
import { serverApi } from "../../constants/api";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


const Login = ({ setIsGoogleSignedIn, setIsModalOpen }: { setIsGoogleSignedIn: (login: boolean) => void, setIsModalOpen: (login: boolean) => void }) => {
    const dispatch = useAppDispatch()
    const navigate=useNavigate()
   

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
            setIsModalOpen(false)
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
                setIsGoogleSignedIn(true); // Set to true on sign-in
            });
            setIsModalOpen(false)

        }
    };
    return (
        <>
            <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl  shadow-lg  bg-white ">
                    <div className="">
                        <div className="bg-red-50  rounded-lg shadow relative ">
                            <div className="flex justify-end p-2">
                                <button onClick={() => {
                                    setIsModalOpen(false)
                                    navigate(-1) }} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="authentication-modal">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                </button>
                            </div>
                            <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8 " action="#">
                                <div className="flex justify-center">
                                    <h3 className="text-xl font-medium text-gray-900 ">Sign in to our platform</h3>
                                </div>
                                <div onClick={handleGoogleLogin} className="w-full  flex justify-center  ">
                                    <div className="flex justify-center gap-2 w-1/2 items-center bg-white hover:bg-slate-50 p-2 rounded-2xl">
                                        <FcGoogle size={28} />
                                        <h3 className="capitalize"> sign in with google</h3>
                                       
                                    </div>
                                    {/* <GoogleLogins setLogin={setLogin} /> */}
                                </div>




                            </form>
                        </div>
                    </div>
                </div>


            </div>


        </>
    )
}
export default Login