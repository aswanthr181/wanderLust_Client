import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { decodeJwt } from "jose"
import { serverApi } from "../../constants/api"
import { useAppDispatch } from "../../store/hooks"
import { updateUserLogin } from "../../store/userSlice"
interface reduxType{
    email:string | undefined,
    picture:string |undefined
}

function GoogleLogins({ setLogin }: { setLogin: (login: boolean) => void }) {
    const dispatch = useAppDispatch()
    const handleDispatch = ({email, picture}: reduxType) => {
        dispatch (updateUserLogin({ user: email, picture}))
        setLogin(false)

    }

    return (
        <div>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    const { credential } = credentialResponse
                    const payload = credential ? decodeJwt(credential) : undefined
                    if (payload) {
                        const email=payload.email as string;
                        const picture=payload.picture as string;
                        axios.post(`${serverApi}/login`, { name: payload.given_name, email: payload.email, picture: payload.picture })
                            .then((response) => {
                                if (response.status === 200) {
                                    handleDispatch({ email, picture})
                                } else {
                                    alert('errror')
                                }
                            }).catch((err) => {
                                console.log(err);
                            })
                    }
                }}
                onError={() => {
                    console.log('An error occurred');
                }}
            />
        </div>
    )
}

export default GoogleLogins