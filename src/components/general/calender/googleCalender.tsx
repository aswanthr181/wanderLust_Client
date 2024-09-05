import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import { generateDate, months } from "../../../constants/functions/calender/generateDate"
import {  loadGoogleEvents } from "../../../constants/functions/calender/loadGoogleEvents";
import {  useAppUseSelector } from "../../../store/hooks";



const Calender = () => {
    const [loadingEvents, setLoadingEvents] = useState<boolean>(true)
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const currentDate = new Date();
    const { email, } = useAppUseSelector((state) => state.user)

    const [events, setEvents] = useState<any[]>([]);
    const [today, setToday] = useState(currentDate);
    const [selectDate, setSelectDate] = useState(currentDate);

  
    const loadEvents = async () => {
        if (email) {
            const googleEvents = await loadGoogleEvents(selectDate)
            console.log('Gress', googleEvents) 

            // Combine and set events
            setEvents([...googleEvents])
            setLoadingEvents(false)
        } else {
            console.log('login please');
            setLoadingEvents(false)

        }

    };
    useEffect(() => {
        if (email) {
            loadEvents();
        }
    }, [selectDate,  email])
    console.log(events)


    


    
    const handleMonthChange = (monthOffset: number) => {
        const updatedDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
        setToday(updatedDate);
    };
    const handleYearChange = (yearOffset: number) => {
        const updatedDate = new Date(today.getFullYear() + yearOffset, today.getMonth(), 1);
        setToday(updatedDate);
    };
    return (
        <>
            <div>
                <div className="flex gap-10 sm:divide-x justify-center sm:w-1/2 mx-auto h-screen items-center sm:flex-row flex-col">

                    <div className="w-96 h-96">
                        <div className="flex justify-between items-center">
                            <h1 className="select-none font-semibold">
                                {months[today.getMonth()]}, {today.getFullYear()}
                            </h1>
                            <div className="flex gap-10 items-center">
                                <div className="flex">
                                    <AiOutlineDoubleLeft
                                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                        onClick={() => handleYearChange(-1)}
                                    />
                                    <GrFormPrevious
                                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                        onClick={() => handleMonthChange(-1)}
                                    />
                                </div>
                                <h1
                                    className="cursor-pointer hover:scale-105 transition-all"
                                    onClick={() => setToday(currentDate)}
                                >
                                    Today
                                </h1>
                                <div className="flex">
                                    <GrFormNext
                                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                        onClick={() => handleMonthChange(1)}
                                    />
                                    <AiOutlineDoubleRight
                                        className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
                                        onClick={() => handleYearChange(1)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-7">
                            {days.map((day, index) => (
                                <h1
                                    key={index}
                                    className="text-sm text-center h-14 w-14 grid place-content-center text-gray-500 select-none"
                                >
                                    {day}
                                </h1>
                            ))}
                        </div>

                        <div className="grid grid-cols-7">
                            {generateDate({ month: today.getMonth(), year: today.getFullYear() }).map(
                                ({ date, currentMonth, today }, index) => (
                                    <div
                                        key={index}
                                        className="p-2 text-center h-14 grid place-content-center text-sm border-t"
                                    >
                                        <h1 onClick={() => setSelectDate(date)}
                                            className={`rounded-full h-10 w-10 grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none
                                        ${!currentMonth && "text-gray-400"} 
                                        ${today && "bg-red-600 text-white"}  ${today && !currentMonth && "bg-red-300 text-white"}
                                      ${selectDate.toDateString() === date.toDateString() && "bg-black text-white"} 
                                    `}>
                                            {date.getDate()}
                                        </h1>

                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="h-96 w-96 sm:px-5 overflow-y-scroll">
                        {loadingEvents ? <div>loading</div> : events.length > 0 &&

                            events.map((event) => {
                                const eventDate = new Date(event.start.dateTime).toLocaleDateString();
                                const eventTime = new Date(event.start.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                                return (<>

                                    <div>
                                        <h1 className="font-semibold">
                                            Schedule for {eventDate} - {eventTime}
                                        </h1>
                                        <p className="text-gray-400">{event.summary} </p>
                                    </div>


                                </>)
                            })}
                    </div>


                </div>
            </div>
        </>
    )
}
export default Calender

