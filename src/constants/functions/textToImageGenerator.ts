// import axios from "axios";
// import { huggingApi } from "../api";

// const generateImage = async (data: string) => {
//     console.log('generate2', JSON.stringify(data));
//     const huggingFaceUrl = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"

//     const response = await axios.post(
//         huggingFaceUrl, data,
//         {
//             headers: {
//                 Authorization: `Bearer ${huggingApi}`,
//                 "Content-Type": "application/json",
//             },
//             responseType: 'blob',
//         }
//     );
//     console.log(response.data, 'dataaaaaaaaa');

//     return response.data;
// }

// export const getAiGeneratedImage = async (text: string) => {
//     try {
//         const result = await generateImage(text)
//         return result
//     } catch (error) {
//         console.log(error);

//     }

// }

import axios from "axios";
import { huggingApi } from "../api";
import { base64 } from "./fileToUrl";

// Function to generate image using Hugging Face API
const generateImage = async (data: string): Promise<Blob> => {
    console.log('generate2', JSON.stringify(data));
    const huggingFaceUrl = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";

    const response = await axios.post(
        huggingFaceUrl, 
        data, 
        {
            headers: {
                Authorization: `Bearer ${huggingApi}`,
                "Content-Type": "application/json",
            },
            responseType: 'blob',
        }
    );
    console.log(response.data, 'dataaaaaaaaa');

    return response.data; // This is a Blob object
}

// Function to get AI generated image and convert to base64
export const getAiGeneratedImage = async (text: string,setImage:(image:string)=>void) => {
    try {
        // Get the Blob from the API
        const blob = await generateImage(text);
        
        // Convert Blob to File object
        const file = new File([blob], "generated-image.jpg", { type: blob.type });
        // return file
        
        // Convert the File object to base64 and set the image
        base64(file, setImage);
        
    } catch (error) {
        console.log(error);
    }
}
