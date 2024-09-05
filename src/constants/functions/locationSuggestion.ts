import axios from "axios";
import { mapboxApi } from "../api";

const getPlaces = async (text: string) => {
    try {
        const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${text}.json`
        const params = {
            access_token: mapboxApi,
            types: "place,locality",
            limit: 10, 
            country: "IN",
          }
        const response = await axios.get(mapboxUrl,{ params })
        return response.data.features
    } catch (error) {
        console.log(error);
    }
}

export const getLocationSuggestion=async(text:string)=>{
    const result = await getPlaces(text)
    return result
}