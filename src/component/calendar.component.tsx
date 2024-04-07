import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

interface calendarProps {
    changeDate: (date: Date) => void;
}

const CalendarComponent = ({ changeDate }: calendarProps) => {
    const [date, setDate] = useState(new Date());
    const [selectedDotwIndex, setSelectedDotwIndex] = useState<number | null>(null);

    //day of the week 요일
    const dotw = ['일', '월', '화', '수', '목', '금', '토'];
    const renderDotw = () => {
        return dotw.map((dotw, index) => (
            <div
                key={index}
                className={`flex justify-center items-center w-10 px-3 py-2 font-semibold border-b-0 rounded-t-md ${
                    selectedDotwIndex === index ? 'bg-primary-dark' : ''
                }`}
                onClick={() => {
                    setSelectedDotwIndex(index);
                }}
            >
                {dotw}
            </div>
        ));
    };

    const getStartOfWeek = (date: Date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const renderCalendar = () => {
        const startOfWeek = getStartOfWeek(date);
        const days = [];

        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i - 1);
            days.push(currentDate);
        }

        return days.map((day, index) => (
            <div
                onClick={() => {
                    setSelectedDotwIndex(index);
                    changeDate(day);
                }}
                className={`flex justify-center items-center w-10 px-3 py-2 font-semibold border-t-0 rounded-b-md cursor-pointer hover:bg-primary-light ${
                    selectedDotwIndex === index ? 'bg-primary-dark' : ''
                }`}
                key={index}
            >
                {day.getDate()}
            </div>
        ));
    };

    return (
        <>
            <div className="w-full flex flex-col gap-5 justify-center items-center">
                <div className="flex w-full justify-between items-center">
                    <div
                        onClick={() => {
                            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
                            setSelectedDotwIndex(null);
                        }}
                    >
                        <img className="cursor-pointer" src="../public/icon/left-arrow.png" alt="" />
                    </div>
                    <div>
                        {date.getFullYear()}년 {date.toLocaleString('default', { month: 'long' })}
                    </div>
                    <div
                        onClick={() => {
                            setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
                            setSelectedDotwIndex(null);
                        }}
                    >
                        <img className="cursor-pointer" src="../public/icon/right-arrow.png" alt="" />
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex w-full justify-between">{renderDotw()}</div>
                    <div className="flex w-full justify-between">{renderCalendar()}</div>
                </div>
            </div>
        </>
    );
};

export default CalendarComponent;
