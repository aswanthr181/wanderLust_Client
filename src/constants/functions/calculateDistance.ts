const toRadians = (degrees: number) => {
    return (degrees * Math.PI) / 180;
}

export const calculateDistance = (la1:number, lo1:number, la2:number, lo2:number) => {
    console.log(la1, lo1, la2, lo2);

    const R = 6371;
    const latDiffrence = toRadians(la2 - la1)
    const lonDifference = toRadians(lo2 - lo1)
    //Haversine Formula
    const a =
        Math.sin(latDiffrence / 2) * Math.sin(latDiffrence / 2) +
        Math.cos(toRadians(la1)) * Math.cos(toRadians(la2)) * Math.sin(lonDifference / 2) * Math.sin(latDiffrence / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = R * c * 1; 
    return distance;
}

export const getNearBy=()=>{
    
}