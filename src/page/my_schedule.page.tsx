import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../atom/user.atom';
import { deleteReservation, getReservation } from '../service/reservation.service';
import HeaderComponent from '../component/header.component';
import ButtonComponent from '../component/button.component';
import { IReservationDelete } from '../interface/reservation.interface';

const MySchedulePage = () => {
    const user = useRecoilValue(userInfoAtom);
    const [reservation, setReservation] = useState([
        { date: '', id: 0, locationName: '', people: '', phoneNumber: '', price: '', gymId: 0 },
    ]);
    useEffect(() => {
        getMySchedule();
    }, [user]);
    const getMySchedule = async () => {
        if (!user.id) {
            console.log('...로딩중');
        } else {
            try {
                const result = await getReservation(user.id);
                console.log('result: ', result);
                setReservation(result.data);
            } catch (err) {
                console.log('err: ', err);
            }
        }
    };

    const deleteHandler = (id: number) => {
        deleteReservation(id)
            .then((res) => {
                console.log('res: ', res);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="font-bold text-28 mb-10">예약 내역</div>
            <div className="flex flex-col gap-10">
                {reservation.map((e, index) => (
                    <div className="flex flex-col gap-1 border-2 border-solid px-2 py-2 " key={index}>
                        <div className="flex gap-3">
                            <div>번호: </div>
                            <div className="font-semibold">{e.id}</div>
                        </div>
                        <div className="flex gap-3">
                            <div>날짜: </div>
                            <div className="font-semibold">{e.date.slice(0, 10)}</div>
                        </div>
                        <div className="flex gap-3">
                            <div>장소: </div>
                            <div className="font-semibold">{e.locationName}</div>
                        </div>
                        <div className="flex gap-3">
                            <div>인원: </div>
                            <div className="font-semibold">{e.people}명</div>
                        </div>
                        <div className="flex gap-3">
                            <div>전화번호: </div>
                            <div className="font-semibold">{e.phoneNumber}</div>
                        </div>
                        <div className="flex gap-3">
                            <div>결제 금액: </div>
                            <div className="font-semibold">{e.price}원</div>
                        </div>
                        <div className="flex gap-2">
                            <ButtonComponent ment="수정"></ButtonComponent>
                            <ButtonComponent click={() => deleteHandler(e.id)} ment="삭제"></ButtonComponent>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MySchedulePage;
