import { parse } from 'path';
import React, { useEffect, useState } from 'react';
import { arrayBuffer } from 'stream/consumers';

interface timeTableProps {
    operatingTime: string;
    selectedTime: string[];
    getSelectedTime: (time: string) => void;
}

const TimeTableComponent = ({ operatingTime, getSelectedTime, selectedTime }: timeTableProps) => {
    const [selectedDotwIndex, setSelectedDotwIndex] = useState<number | null>(null);
    const timeArray = operatingTime.split('-');
    const startTime = timeArray[0];
    const endTime = timeArray[1];

    //선택된 시간 배열에 시간이 포함되어있는지 확인하는 함수
    const timeClickHandler = (time: any) => {
        if (selectedTime.includes(time)) {
            console.log(selectedTime.includes(time));
        }
    };

    const timetable: any = [];
    for (let hour = parseInt(startTime); hour < parseInt(endTime); hour++) {
        timetable.push(hour);
    }

    useEffect(() => {
        // console.log('timetable: ', timetable);
    }, []);
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
