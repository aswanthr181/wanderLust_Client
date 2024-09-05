import Swal from "sweetalert2"
import { toast } from 'react-hot-toast'


export const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});


export const generateError = (err:string) => {
    if (typeof err === 'string') {
        toast.error(err, { position: "bottom-center" });
    } else {
        toast.error("An unexpected error occurred", { position: "bottom-center" });
    }
};