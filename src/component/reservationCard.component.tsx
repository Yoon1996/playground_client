import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { updateUserInfo } from '../atom/user.atom';

interface ReCardProps {
    date: string | undefined;
    locationName: string;
    locationPhoneNumber: string;
    locationType: string;
    people: string | undefined;
    price: number;
    selectedTime: string[];
}

const ReservationCardComponent = ({
    date,
    locationName,
    locationPhoneNumber,
    locationType,
    people,
    price,
    selectedTime,
}: ReCardProps) => {
    const user = useRecoilValue(updateUserInfo);

    useEffect(() => {}, [date]);

    return (
        <>
            <div className="w-full h-96 border-2 border-solid rounded-md flex flex-col px-4 py-4">
                <div className="font-bold text-20">장소: {locationName}</div>
                <div className="font-bold text-20">분류: {locationType}</div>
                <div className="font-bold text-20">이름: {user.name}</div>
                <div className="font-bold text-20">인원: {!people ? '0' : people}명</div>
                <div className="font-bold text-20">휴대폰 번호: {user.phoneNumber}</div>
                <div className="font-bold text-20">날짜: {date}</div>
                <div className="font-bold text-20">
                    이용 시간:{' '}
                    {selectedTime.map((time, index) => (
                        <div key={index} className="flex">
                            <span>
                                {time}:00 - {Number(time) + 1}:00
                            </span>
                        </div>
                    ))}
                </div>
                <div className="font-bold text-20">문의: {locationPhoneNumber}</div>
                <div className="font-bold text-20">가격: {price}원</div>
            </div>
        </>
    );
};

export default ReservationCardComponent;
