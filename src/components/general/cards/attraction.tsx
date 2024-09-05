import { attractionsType } from "../tripList"

export interface attractionType {
    title: string,
    img: string
}

interface attractions {
    attractions: attractionsType
}

const Attraction = ({ data }: { data: attractionType }) => {

    return (
        <>
            <div className="text-center text-gray-500 dark:text-gray-400">
                <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={`${data.img ? data.img : 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png'}`} alt="Bonnie Avatar" />
                <h3 className="mb-1 text-xl font-bold tracking-tight text-gray-900 ">
                    <a href="#">{data.title} </a>
                </h3>
            </div>
        </>
    )
}
export default Attraction

export const AttractPlace = ({ attractions }: attractions) => {
    console.log(attractions);

    return (<>

        <div className="inline-grid max-w-xs sm:max-w-xs lg:max-w-lg lg:flex bg-black rounded-lg border shadow-lg pb-6 lg:pb-0">
            <div className="w-full  p-4">
                <div className="inline-grid">
                    <p className="work-sans font-semibold text-xl text-white">{attractions.text} </p>
                    <p className="raleway text-sm my-4 text-white opacity-75">{attractions.description} </p>
                </div>
            </div>
        </div>


    </>)
}

