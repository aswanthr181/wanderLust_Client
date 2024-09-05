import { base64 } from "./fileToUrl";

export const validImageCheck = (img: File, setImage: (image:string)=>void) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(img.type)) {
        base64(img,setImage)
        // setImage(URL.createObjectURL(img))
    } else {
        alert("Please select a valid image")
    }
}