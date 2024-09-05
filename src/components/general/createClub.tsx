import { useState } from "react"
import { serverApi } from "../../constants/api"
import axios from "axios"
import ClipLoaders from "./loader/clipLoader"
import { getLocationSuggestion } from "../../constants/functions/locationSuggestion"
import { validImageCheck } from "../../constants/functions/validImageCheck"
import { getAiGeneratedImage } from "../../constants/functions/textToImageGenerator"



const CreateClub = () => {
    const [clubName, setClubName] = useState<string>('')
    const [place, setPlace] = useState<string>('')
    const [longitude, setLongitude] = useState<number>(0)
    const [latitude, setLatutude] = useState<number>(0)
    const [image, setImage] = useState<string>('')

    const [places, setPlaces] = useState<any[]>([])
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [imgtext, setImgtext] = useState<string>('')
    const [isImageGenerating, setIsImageGenerating] = useState<boolean>(false)

    const handleGetPlaces = async (text: string) => {
        setPlace(text)
        const result = await getLocationSuggestion(text)
        setPlaces(result)
        setIsSearch(true)
    }

    const handleImageUpload = (img: File) => {
        validImageCheck(img, setImage)
    }


    const handleLogoGeneration = async () => {
        if (!imgtext.trim()) {
            alert('enter')
            return
        }
        try {
            setIsImageGenerating(true)
            await getAiGeneratedImage(imgtext, setImage)
        } catch (error) {
            console.error(error);
        }
        setIsImageGenerating(false)
    }

    const handleSubmission = async (e: any) => {
        try {
            const admin = 'aswanthr181@gmail.com'
            e.preventDefault()
            const response = await axios.post(`${serverApi}/create`, { admin, logo: image, longitude, latitude, place, clubName })
            console.log(response.data)
        } catch (error) {
            alert('error')
        }
    }
    console.log(image);

    return (
        <>
            <div className="relative bg-white py-8 w-full    md:py-16">

                <form onSubmit={handleSubmission} className="mx-auto max-w-screen-xl px-14 ">
                    <h2 className="font-bold text-black" >CLUB DETAILS </h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">

                        <div className="w-full flex flex-wrap sm:flex-nowrap  gap-5 ">
                            <div className="space-y-4 w-full md:w-1/2">

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Club Name </label>
                                    <input onChange={(e) => setClubName(e.target.value)} maxLength={50} type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Club Name" />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> Description </label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Description" />
                                </div>

                                <div className="relative">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 "> place </label>
                                    <input value={place} onChange={(e) => {

                                        handleGetPlaces(e.target.value)
                                    }} maxLength={25} type="search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 " placeholder="Place" />
                                    {isSearch &&
                                        <div className="absolute z-10 w-full   h-28 overflow-y-scroll no-scrollbar ">
                                            <ul className="bg-white w-full rounded-lg">
                                                {places.map((place, i) => {
                                                    return (
                                                        <>
                                                            <li key={i} className="hover:bg-slate-200">
                                                                <button type="button" onClick={() => {
                                                                    setPlace(place.place_name)
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

                                <div className="">
                                    <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Logo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{image ? 'Change Image' : 'Upload Logo'} </span>
                                                <input className="sr-only" onChange={(e) => { if (e.target.files && e.target.files[0]) { handleImageUpload(e.target.files[0]) } }} type="file" id="file-upload" />
                                            </label>
                                        </button>
                                        <button onClick={handleLogoGeneration}
                                            type="button"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >

                                            <span>{image ? 'Change Image' : 'Generate '} </span>
                                        </button>
                                        <input value={imgtext} onChange={(e) => setImgtext(e.target.value)} className="rounded-lg border border-gray-300 bg-gray-50 p-1.5 text-sm text-gray-900" type="text" placeholder="Enter Text For Image" />

                                    </div>
                                </div>

                            </div>
                            <div className=" w-full md:w-1/2">
                                <div className={`relative mt-8 flex justify-center rounded-lg border border-dashed border-gray-900/25    ${image || isImageGenerating ? 'block' : 'py-24'} `}>
                                    {image && <div className=" mx-3 mt-3 mb-3 flex h-60 overflow-hidden rounded-xl">
                                        <img className="peer h-full w-full object-cover" src={image} alt="product image" />

                                    </div>}
                                    {isImageGenerating &&
                                        <div className="h-full w-full absolute    animated fadeIn faster  flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover" id="modal-id">
                                            <div className="absolute  bg-black opacity-40 inset-0 z-0"></div>
                                            <ClipLoaders loading={true} />
                                        </div>}
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



            </div >


        </>
    )
}
export default CreateClub

