import { useEffect, useState } from 'react';

interface timeTableProps {
    operatingTime: string;
    selectedTime: string[];
    getSelectedTime: (time: string) => void;
}

const TimeTableComponent = ({ operatingTime, getSelectedTime, selectedTime }: timeTableProps) => {
    // const [selectedDotwIndex, setSelectedDotwIndex] = useState<number | null>(null);
    const timeArray = operatingTime.split('~');
    const startTime = timeArray[0];
    const endTime = timeArray[1];
    const [timetable, setTimetable] = useState<number[]>([]);

    useEffect(() => {
        console.log('startTime: ', startTime);
        console.log('endTime: ', endTime);
        const list: number[] = [];
        for (let hour = parseInt(startTime); hour < parseInt(endTime); hour++) {
            list.push(hour);
        }
        setTimetable([...timetable, ...list]);
    }, [operatingTime]);

    return (
        <>
            <div className="flex flex-wrap w-full gap-9">
                {timetable.map((v: number, index: number) => (
                    <div
                        onClick={() => {
                            getSelectedTime(String(v));
                        }}
                        className={`flex justify-center border-2 border-solid rounded-md border-primary-e3 text-primary-45 py-3 items-center w-28 cursor-pointer ${
                            selectedTime.includes(String(v)) ? 'bg-primary-dark' : ''
                        }`}
                        key={index}
                    >
                        {v}:00 - {v + 1}:00
                    </div>
                ))}
            </div>
        </>
    );
};

export default TimeTableComponent;
