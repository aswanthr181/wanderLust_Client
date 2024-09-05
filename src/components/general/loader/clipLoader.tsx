import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
const ClipLoaders = ({loading}:{loading:boolean}) => {

    return (
        <>
            <div className="flex  items-center justify-center h-screen  w-full">
            <ClipLoader color="green" loading={loading} size={70} />
        </div>

        </>
    )
}
export default ClipLoaders