import { useNavigate } from "react-router-dom"

const Empty = ({message}:{message:string}) => {
    const navigate=useNavigate()
    return (
        <>
            <div className=" h-full flex justify-center items-center ">
                <div className="bg-white p-6  ">
                    <div className="text-center">
                        <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center capitalize">{message}!</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Empty