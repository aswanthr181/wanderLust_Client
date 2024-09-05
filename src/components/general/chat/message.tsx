import { useEffect, useRef, useState } from "react"
import { useAppUseSelector } from "../../../store/hooks"
import { useNavigate, useParams } from "react-router-dom"
import { io } from "socket.io-client"
import { serverApi } from "../../../constants/api"
import axios from "axios"
import { GrFormPrevious } from "react-icons/gr";
import { GrFormClose } from 'react-icons/gr';
import { recordAudio, stopAudioRecord } from "../../../constants/functions/audioRecording"
import ButtonCmp from "../../ui/button/button"
import { generateError } from "../../../constants/alerts/alerts"

interface messageType {
    type: string
    text: string,
    sender: string
    picture: string
}
interface clubType{
    _id:string
    logo:string
    clubName:string
}
const socket = io(serverApi)
const Message = () => {
    const { id } = useParams<string>()
    const { email, picture } = useAppUseSelector((state) => state.user)
    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<messageType[]>([])
    const [club,setClub]=useState<clubType>()
    const [recordComplete, setRecordComplete] = useState<boolean>(false)
    const messageHolder = useRef<HTMLDivElement | null>(null)

    const [image, setImage] = useState<string>('');
    const [isRecording, setIsRecording] = useState<boolean>(false)
    const mediaStream = useRef<MediaStream | null>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);
    const [timer, setTimer] = useState<number>(0)
    const navigate = useNavigate()
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRecording) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
        } else if (!isRecording && timer !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRecording]);

    useEffect(() => {
        socket.emit('joinRoom', id)
        axios.get(`${serverApi}/getChat`, { params: { club: id } }).then((response) => {
            const msgs = response.data.data[0].messages
            setClub(response.data.clubdata)
            
            if (msgs.length > 0) {
                setMessages(msgs)
            }
        })

    }, [])

    useEffect(() => {
        socket.on('sendMessage', (messageData: messageType) => {
            setMessages((preMsg) => [...preMsg, messageData])
        })
        return () => {
            socket.off('sendMessage')
        }
    }, [])

    const sendMessage = async () => {
        const room = id
        if (message.trim() || image.trim() && email) {
            let messageData: messageType | null = null;

            messageData = {
                type: message.trim() ? 'text' : 'audio',
                text: message.trim() ? message : image,
                sender: email,
                picture: picture
            }
            if (messageData !== null) {
                setMessages((prev) => [...prev, messageData])
                socket.emit('sendMessage', { room, messageData })
                await axios.post(`${serverApi}/newchat`, { club: id, messageData })
                setMessage('')
                setImage('')
                setRecordComplete(false)
            }
        }
    }

    const startRecording = async () => {
        try {
            setTimer(0)
            await recordAudio({ mediaStream, mediaRecorder, chunks, setImage, setIsRecording })
        } catch (error) {
            console.error('Error accessing microphone:', error);
            generateError('Error accessing microphone')
        }
    }
    const stopRecording = () => {
        try {
            stopAudioRecord({ mediaRecorder, mediaStream, setIsRecording })
            setRecordComplete(true)
            setTimer(0)
        } catch (error) {
            console.error(error);
        }
    };
    useEffect
    useEffect(() => {
        if (messageHolder.current)
            messageHolder.current.scrollTop = messageHolder.current.scrollHeight
    }, [messages])
    return (
        <>
            <div className=" ">
                <div className="h-screen bg-gray-200  flex flex-wrap justify-center  ">
                    <div className="relative safelist w-full h-[85%] md:w-5/6 md:mt-10  bg-white  shadow-2xl  ">
                        <div className=" flex flex-col flex-auto h-[89%]  px-3 py-2 ">
                            <div className="flex flex-col flex-auto flex-shrink-0  bg-gray-200 h-16 p-4">
                                <div className="flex items-center space-x-4 ml-5">
                                    <div onClick={() => navigate(-1)}>
                                        <GrFormPrevious size={20} className="hover:size-4" />
                                    </div>
                                    <div className="flex-shrink-0">
                                        <img className="w-8 h-8 rounded-full" src={`${club?club.logo:''}`} alt="Neil image" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-md font-medium text-gray-900 truncate ">
                                            {club?.clubName}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            <div className="flex flex-col flex-auto flex-shrink-0   bg-gray-100 h-full p-4">
                                <div className="flex flex-col h-full overflow-x-auto mb-4  " ref={messageHolder}>
                                    <div className="flex flex-col h-full ">
                                        <div className="grid grid-cols-12 gap-y-2 " >
                                            {messages.map((message) => {
                                                return (
                                                    <>
                                                        <div className={`p-3 rounded-lg   ${message.sender === email ? 'col-start-6 col-end-13 ' : 'col-start-1 col-end-8 '}`}  >
                                                            <div className={`flex items-center ${message.sender === email ? '  justify-start flex-row-reverse' : ' flex-row '}`} >
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                                                                    <img
                                                                        src={message.picture ? message.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGlZkIqki43f4vMGa-DljqZBCOr6D6Cm_l_kDM06YEjL2QWlKZY_glSuSJGybsUIHmdpc&usqp=CAU'}
                                                                        className="h-full w-full rounded-full"
                                                                        alt="" />
                                                                </div>
                                                                {message.type === 'text' ?
                                                                    <div className={`relative  text-sm  py-2 px-4 shadow rounded-xl ${message.sender === email ? 'mr-3 bg-indigo-100' : 'ml-3 bg-white'}`}>
                                                                        <div>{message.text} </div>
                                                                        <small className="text-xs text-gray-400"> {new Date().toLocaleString('en-US', {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            hour12: true
                                                                        })}</small>
                                                                    </div>
                                                                    :
                                                                    <div className={`relative  text-sm  py-2 px-4 shadow rounded-xl ${message.sender === email ? 'mr-3 bg-indigo-100' : 'ml-3 bg-white'}`}>

                                                                        <audio controls src={message.text} />
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                    <div className="flex-grow ml-4">
                                        <div className="relative w-full">
                                            <input type="text" placeholder="Type your message..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        sendMessage()
                                                    }

                                                }}
                                                className={` flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 ${isRecording || image ? 'hidden' : 'block'}`} />

                                        </div>
                                    </div>
                                    <div className="ml-4 flex">
                                        <div className={`${image ? 'block' : 'hidden'} bg-red-50 flex rounded-3xl `} >
                                            <audio controls src={image} className="h-9" />
                                            <div onClick={() => setImage('')} className="flex items-center">
                                                <GrFormClose className="cursor-pointer hover:size-6" size={20} onClick={() => {/* Add your close logic here */ }} />
                                            </div>
                                        </div>
                                        <div className={`${isRecording ? 'block' : 'hidden'} flex items-center mr-2`}>
                                            <p><span>Recording...</span> {String(Math.floor(timer/60)).padStart(2, '0')}: {String(timer%60).padStart(2, '0')}</p>
                                        </div>
                                        <button onClick={() => isRecording ? stopRecording() : startRecording()} className={`${image || message ? 'hidden' : 'block'}  flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0`}>
                                            <span>{isRecording ? 'Stop' : 'Rec'} </span>
                                        </button>
                                    </div>
                                    <div className={`ml-4 ${message.trim() || image.trim() ? 'block' : 'hidden'}`}>
                                        <ButtonCmp action={sendMessage} title="SEND" classN="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Message