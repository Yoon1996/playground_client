import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../atom/user.atom';
import ButtonComponent from '../component/button.component';
import HeaderComponent from '../component/header.component';
import YesOrNoModal from '../component/modal/yes_or_no.modal';
import { deleteReservation, getReservation } from '../service/reservation.service';
import { useNavigate } from 'react-router-dom';

const MySchedulePage = () => {
    const user = useRecoilValue(userInfoAtom);
    const [reservation, setReservation] = useState([
        { date: '', id: 0, locationName: '', people: '', phoneNumber: '', price: '', gymId: 0, time: '' },
    ]);
    const [propId, setPropId] = useState<number>(0);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const openModal = (id: number) => {
        setPropId(id);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    useEffect(() => {
        getMySchedule();
        const dd = '16,18';
        console.log(
            'dd: ',
            dd.split(',').map((i) => i + '시 ~' + (Number(i) + 1) + '시'),
        );
    }, [user, propId]);

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

    const deleteHandler = () => {
        deleteReservation(propId)
            .then((res) => {
                console.log('res: ', res);
                closeModal();
                navigate('/');
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="font-bold text-28 mb-10">예약 내역</div>
            {reservation.length == 0 ? (
                <div>예약 내역이 없습니다.</div>
            ) : (
                <div className="flex flex-col gap-10">
                    {reservation.map((e: any, index) => (
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
                                <div>시간: </div>
                                <div className="font-semibold">
                                    {e.time.split(',').map((i: any) => i + '시 ~ ' + (Number(i) + 1) + '시 ')}
                                </div>
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
                                <ButtonComponent click={() => openModal(e.id)} ment="삭제"></ButtonComponent>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div>
                <YesOrNoModal
                    id={propId}
                    deleteOk={deleteHandler}
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                ></YesOrNoModal>
            </div>
        </>
    );
};

export default MySchedulePage;
