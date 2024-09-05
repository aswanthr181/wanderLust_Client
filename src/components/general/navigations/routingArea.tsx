// import { Route, Routes } from "react-router-dom"
// import HomePage from "../homePage"
// import React, { useState } from "react"
// import CreateClub from "../createClub"
// import Clubs from "../clubs"
// // import { useSelector } from "react-redux"
// // import { RootState } from "../../../store/store"
// // import { useAuth0 } from "@auth0/auth0-react"
// import ClubDetail from "../clubDetail"
// import Message from "../chat/message"
// import Calender from "../calender/googleCalender"
// import TripList from "../tripList"
// import TripDetail from "../tripDetail"
// import { useAppUseSelector } from "../../../store/hooks"
// import Login from "../../authentication/login"


// const RoutingArea = () => {
//     const { email } = useAppUseSelector((state) => state.user)
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

//     const authenticate = (Component: React.ComponentType) => {
//         if (email) {
//             return <Component />;
//         } else {
//             setIsModalOpen(true);
//             return null;
//         }
//     };
    

//     return (
//         <div>

//             <Routes>
//                 <Route
//                     path="/"
//                     element={<div><HomePage /> </div>}
//                 />
//                 {/* <Route
//                     path="/login"
//                     element={<div><Login /> </div>}
//                 /> */}

//                 <Route
//                     path='/clubs'
//                     element={
//                         <React.Suspense fallback={<div className='bg-red-800 h-screen w-full'>loadinggg....</div>} >
//                             <Clubs />
//                         </React.Suspense>}
//                 />

//                 <Route
//                     path='/createClub'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         {/* {authenticate(CreateClub)} */}
//                         <CreateClub />
//                     </React.Suspense>}
//                 />
//                 <Route
//                     path='/clubDetail/:id'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         {/* {authenticate(CreateClub)} */}
//                         <ClubDetail />
//                     </React.Suspense>}
//                 />
//                 <Route
//                     path='/chat/:id'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         {/* {authenticate(CreateClub)} */}
//                         <Message />
//                     </React.Suspense>}
//                 />
//                 <Route
//                     path='/calendar'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         {/* <Calender /> */}
//                         {/* {authenticate(Calender)} */}
//                     </React.Suspense>}
//                 />
//                 <Route
//                     path='/trips'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         <TripList />
//                     </React.Suspense>}
//                 />
//                 <Route
//                     path='/tripDetail/:id'
//                     element={<React.Suspense fallback={<><div className='bg-red-500'>loadinggg....</div> </>} >
//                         <TripDetail />
//                     </React.Suspense>}
//                 />

//                 <Route path="/map" element={<div>map</div>} />
//             </Routes>


//             {/* {isModalOpen && (
//                 <Login setIsGoogleSignedIn={() => {}} setIsModalOpen={setIsModalOpen} />
//             )} */}

//         </div>
//     )
// }
// export default RoutingArea


import { Route, Routes } from "react-router-dom";
import HomePage from "../homePage";
import React, { useState, useEffect } from "react";
import CreateClub from "../createClub";
import Clubs from "../clubs";
import ClubDetail from "../clubDetail";
import Message from "../chat/message";
import Calender from "../calender/googleCalender";
import TripList from "../tripList";
import TripDetail from "../tripDetail";
import { useAppUseSelector } from "../../../store/hooks";
import Login from "../../authentication/login";

const RoutingArea = () => {
    const { email } = useAppUseSelector((state) => state.user);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!email) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [email]);

    const renderOrShowModal = (Component: React.ComponentType) => {
        return email ? <Component /> : <>{<Login  setIsGoogleSignedIn={() => {}} setIsModalOpen={setIsModalOpen} />}</>;
    };

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/clubs"
                    element={
                        <React.Suspense fallback={<div className="bg-red-800 h-screen w-full">loadinggg....</div>}>
                            <Clubs />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/createClub"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            {renderOrShowModal(CreateClub)}
                        </React.Suspense>
                    }
                />
                <Route
                    path="/clubDetail/:id"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            {renderOrShowModal(ClubDetail)}
                        </React.Suspense>
                    }
                />
                <Route
                    path="/chat/:id"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            {renderOrShowModal(Message)}
                        </React.Suspense>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            {renderOrShowModal(Calender)}
                        </React.Suspense>
                    }
                />
                <Route
                    path="/trips"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            <TripList />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/tripDetail/:id"
                    element={
                        <React.Suspense fallback={<div className="bg-red-500">loadinggg....</div>}>
                            {renderOrShowModal(TripDetail)}
                        </React.Suspense>
                    }
                />
                <Route path="/map" element={<div>map</div>} />
            </Routes>
        </div>
    );
};

export default RoutingArea;
