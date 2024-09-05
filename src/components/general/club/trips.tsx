const Trips = (trip: any) => {
    console.log(trip.itenary,'itititititti');
    
    return (
        <div className="p-5">
            <h3 className="text-xl font-bold tracking-tight text-gray-900 ">
                <a href="#">{trip.title} </a>
            </h3>
            <span className="text-gray-500 dark:text-gray-400">{trip.startDate} </span>
            <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">{trip?.itenary[0]?.place.split(',').slice(0, 2).join(', ')} {'->'} {trip?.itenary[trip.itenary.length - 1]?.place.split(',').slice(0, 2).join(', ')} </p>

        </div>
    )
}
export default Trips