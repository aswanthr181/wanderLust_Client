import axios from "axios";
import { useState } from "react";
import Attraction, { attractionType } from "./cards/attraction";
import { aboutSite } from "../../constants/text";

const HomePage = () => {
    const [place, setPlace] = useState<string>('')
    const [data, setData] = useState<attractionType[]>([])
    const [isAttraction, setIsAttraction] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const handleLocationSearch = async () => {
        try {
            setIsAttraction(false)
            setLoading(true)
            const response = await axios.get('http://localhost:3000/attractions', {
                params: { place }
            })
            const result = response.data.data
            console.log(result)
            setData(result)
            setIsAttraction(true)
            const element = document.getElementById('att');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleSearch = (e: any) => {
        setLoading(false)
        setPlace(e)
    }

    return (
        <>


            <div className="max-w-xl mx-auto text-center py-24 md:py-32">
                <div className="w-24 h-2 bg-black mb-4 mx-auto"></div>
                <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-5xl mb-6 m-1">
                    FUELING YOUR JOURNEY
                </h2>
                <p className="font-light text-gray-600 mb-6 leading-relaxed m-2 md:m-0">
                    {aboutSite}
                </p>
                <div className='flex justify-center mt-5  space-x-1'>
                    <input value={place} onChange={(e) => handleSearch(e.target.value)} type="search" className="block w-full md:w-[20rem] px-4 py-2 text-black bg-white border rounded-full focus:border-slate-800 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search place..."/>
                    <button className="px-4 text-white bg-black rounded-full"
                        onClick={() => handleLocationSearch()}>
                        Search
                    </button>
                </div>
            </div>
            {loading &&
                <section id='att' className="bg-white ">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
                        <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
                            <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 capitalize ">Explore the Attractions of {place}</h2>
                        </div>
                        <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {!isAttraction ? <div>loading...</div> : data && data.map((data) => {
                                return (
                                    <Attraction data={data} />
                                )
                            })}
                        </div>
                    </div>
                </section>}


            <div className="relative rounded-lg py-12 px-40 mr-1 lg:ml-10 lg:mr-10 ml-1  mt-1">
                <div className="relative z-10 text-center py-12 md:py-24">
                    <h1 className="text-white hover:text-slate-300 text-center text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-display font-bold mb-6">
                        JOIN IN CLUBS
                    </h1>
                    <p className="text-white mb-10 text-base md:text-lg font-bold">
                        Dive into a community of like-minded individuals who share your
                        enthusiasm for travelling and active living.
                    </p>
                    <button

                        className="inline-block bg-black text-white uppercase border-2 border-white text-sm tracking-widest font-heading px-8 py-4"
                    >
                        {" "}
                        JOIN IN CLUBS
                    </button>
                </div>
                <img
                    src="https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    className="w-full h-full absolute inset-0 object-cover"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 mr-1 ml-1 mt-1">
                <div className="bg-white p-12 md:p-24 flex justify-start items-center">
                    <a href="/blog/my-third-big-post/">
                        <img
                            src="https://media.istockphoto.com/id/1912688381/photo/safari-jeep-driving-at-sunset-golden-hour-in-yala-national-park-jungle-bush-lands.jpg?s=2048x2048&w=is&k=20&c=heC-WjDC5GeIiAWNWNDpNt98VQQyHDMIb67AkFwgM9k="
                            className="w-full max-w-md"
                        />
                    </a>
                </div>
                <div className="md:order-first bg-gray-100 p-12 md:p-24 flex justify-end items-center lg:ml-9">
                    <div className="max-w-md">
                        <div className="md:ml-4 md:w-96 h-2 bg-black mb-4"></div>
                        <h2 className="font-display font-bold text-2xl md:text-2xl lg:text-3xl mb-6">
                            JOIN YOUR FAVORITE TRIP
                        </h2>
                        <p className="font-light text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                            "Experience convenience like never before with our 'Book Your
                            Favorite Turf' feature. Whether you're gearing up for an intense
                            match or simply looking for a place to have fun with friends, our
                            seamless booking system empowers you to reserve the turf that
                            suits your needs. Say goodbye to hassles and long waits – with
                            just a few clicks, you can secure your spot on the field and get
                            ready to play"
                        </p>
                        <button className="inline-block border-2 border-black font-light text-black text-sm uppercase tracking-widest py-3 px-8 hover:bg-black hover:text-white">
                            {" "}
                            VIEW CLUBS
                        </button>
                    </div>
                </div>
            </div>


        </>
        // <div className='bg-slate-100 h-full'>
        //     <div className="py-10">
        //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        //             <div className="h-24 flex w-full ">
        //                 <div className="w-full flex justify-center items-center">
        //                     {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
        //             <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
        //         </div> */}
        //                     <input onChange={(e) => setPlace(e.target.value)} type="text" className="w-1/4 bg-gray-50  border border-gray-300 text-gray-900 sm:text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block  pl-10 p-2" placeholder="Search..." />
        //                     <button onClick={handleLocationSearch} className="p-1 bg-orange-400">get attractions</button>
        //                 </div>
        //             </div>
        //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        //                 {data.map((data) => {
        //                     return (
        //                         <>
        //                             <Attraction data={data} />
        //                         </>
        //                     )
        //                 })}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}
export default HomePage