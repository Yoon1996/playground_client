import {
    addDays,
    addMonths,
    endOfMonth,
    endOfWeek,
    format,
    isPast,
    isToday,
    startOfMonth,
    startOfWeek,
    subMonths,
} from 'date-fns';
import { useEffect, useState } from 'react';

interface ICalendarProps {
    changeDate: (date: string) => void;
}

const NewCalendarComponent = ({ changeDate }: ICalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const [selected, setSelected] = useState('');

    const week = ['일', '월', '화', '수', '목', '금', '토'];
    const weeks = week.map((item, index) => {
        return (
            <div
                className={
                    index === 0
                        ? ` text-error h-10 flex justify-center py-2 px-2 items-center`
                        : `h-10 flex justify-center py-2 px-2 items-center`
                }
                key={index}
            >
                {item}
            </div>
        );
    });

    const day = [];
    let startDay = startDate;
    let days = [];
    let formattedDate = '';

    while (startDay <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(startDay, 'yyyy-MM-dd');
            days.push(
                <div className="flex justify-center mx-1 my-1">
                    <div
                        onClick={(e: any) => {
                            changeDate(e.target.innerText);
                            setSelected(e.target.innerText);
                        }}
                        className={
                            isPast(formattedDate)
                                ? `w-full h-20 border-2 px-1 py-1 border-solid text-primary-a6 border-primary-45 flex justify-center items-center text-20`
                                : format(currentDate, 'M') !== format(startDay, 'M')
                                  ? `w-full h-20 border-2 px-1 py-1 border-solid text-primary-a6 border-primary-45 flex justify-center items-center text-20`
                                  : selected === formattedDate
                                    ? `w-full h-20 border-2 px-1 py-1 border-solid border-primary-45 flex justify-center items-center text-20 bg-primary-dark`
                                    : `w-full h-20 border-2 px-1 py-1 border-solid border-primary-45 flex justify-center items-center text-20 cursor-pointer`
                        }
                    >
                        {formattedDate}
                    </div>
                </div>,
            );
            startDay = addDays(startDay, 1);
        }
        // day.push(<div className="grid grid-cols-7">{days}</div>);
        day.push(days);
        days = [];
    }

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    // date-fns 함수인 addMonths를 사용하여 클릭 시 현재 달에서 1달을 더해줌
    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    useEffect(() => {}, [selected]);

    return (
        <>
            <div>
                <div className="flex justify-center py-4 px-4 text-20">
                    {format(currentDate, 'yyyy')}년 {format(currentDate, 'M')}월
                </div>
                <div className="flex justify-between">
                    <div className="cursor-pointer" onClick={prevMonth}>
                        <img src="../public/icon/left-arrow.png" alt="" />
                    </div>
                    <div className="cursor-pointer" onClick={nextMonth}>
                        <img src="../public/icon/right-arrow.png" alt="" />
                    </div>
                </div>
                <div className="grid grid-cols-7">{weeks}</div>
                {/* {day.map((e, index) => (
                    <div className="grid grid-cols-7" key={index}>
                        {e}
                    </div>
                ))} */}
                <div className="grid grid-cols-7">{day}</div>
            </div>
        </>
    );
};

export default NewCalendarComponent;
