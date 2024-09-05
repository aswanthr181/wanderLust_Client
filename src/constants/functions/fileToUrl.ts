// export const base64 = (img: File,callback: (result: string | ArrayBuffer | null) => void) => {
//     let reader = new FileReader();
//     console.log('first')
//     reader.readAsDataURL(img)
//     reader.onload = () => {
//         console.log('bsbsbsbsb',reader.result);
        
//         callback(reader.result);
//     };
//     reader.onerror = (error) => {
//         console.log("Error: ", error);
//     };
// }



export const base64 = (
    img: File,
    setImage: (image: string) => void 
) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
        if (typeof reader.result === 'string') { 
            const url=reader.result
            setImage(url); 
        }
    };
    reader.onerror = (error) => {
        console.log("Error: ", error);
    };
};
export const base64Audio = (
    img: any,
    setImage: (image: string) => void 
) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onloadend = () => {
        if (typeof reader.result === 'string') { 
            const url=reader.result
            setImage(url); 
        }
    };
    reader.onerror = (error) => {
        console.log("Error: ", error);
    };
};