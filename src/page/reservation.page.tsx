import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../atom/user.atom';
import ButtonComponent from '../component/button.component';
import HeaderComponent from '../component/header.component';
import NewCalendarComponent from '../component/newCalendar.component';
import ReservationCardComponent from '../component/reservationCard.component';
import TimeTableComponent from '../component/timeTable.component';
import { showDetailGym } from '../service/gym.service';
import { canNotReservation, createReservation } from '../service/reservation.service';

const ReservationPage = () => {
    const user = useRecoilValue(userInfoAtom);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gymId = searchParams.get('id');
    const [alreadySelectedTime, alreadySetSelectedTime] = useState([]);

    const [data, setData] = useState({
        size: '',
        address: '',
        facilities: '',
        name: '',
        parkingInfo: '',
        phoneNumber: '',
        price: '',
        region: '',
        sportsType: '',
        homepage: '',
        operatingTimeDay: '',
    });
    const [selectedTimeArray, setSelectedTimeArray] = useState<string[]>([]);
    const getSelectedTime = (time: string) => {
        if (!selectedDate) {
            alert('원하시는 날짜를 먼저 선택해주세요!');
        } else {
            if (selectedTimeArray.includes(time)) {
                const filteredTimeArray = selectedTimeArray.filter((e) => e !== time);
                setSelectedTimeArray(filteredTimeArray);
            } else {
                setSelectedTimeArray([...selectedTimeArray, time]);
            }
        }
    };
    const [people, setPeople] = useState<string>('');
    const showHandler = () => {
        showDetailGym(Number(gymId))
            .then((res) => {
                // console.log('res: ', res);
                setData(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    const reserve = () => {
        const params = {
            userId: user.id,
            gymId: Number(gymId),
            locationName: data.name,
            date: selectedDate,
            people: String(people),
            phoneNumber: user.phoneNumber,
            time: selectedTimeArray.join(','),
            price: String(peoplePrice),
        };
        if (params.date === undefined) {
            alert('날짜 입력 바람');
        } else if (params.time.length === 0) {
            alert('시간 선택 바람');
        } else if (params.people === '') {
            alert('인원 수 입력 바람');
        } else {
            createReservation(params)
                .then((res) => {
                    // console.log('res: ', res);
                    alert('예약이 완료되었습니다!');
                    navigate('/');
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        }
    };

    const [selectedDate, setSelectedDate] = useState<string>();

    const changeDate = (date: string) => {
        canNotReservation(date)
            .then((res) => {
                console.log('res: ', res);
                alreadySetSelectedTime(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
        setSelectedDate(date);
    };
    const peopleChange = (event: SelectChangeEvent) => {
        setPeople(event.target.value as string);
    };

    const peoplePrice =
        !selectedDate || !people || selectedTimeArray.length === 0 || data.price === '무료'
            ? 0
            : Number(data.price) * Number(people) * selectedTimeArray.length;

    useEffect(() => {
        showHandler();
    }, [selectedDate, selectedTimeArray, data.operatingTimeDay, alreadySelectedTime]);
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="my-6 text-20">1. 예약을 진행 하고 싶으신 날짜를 선택해주세요!</div>
            {/* <CalendarComponent date={date} changeDate={changeDate}></CalendarComponent> */}
            <NewCalendarComponent changeDate={changeDate}></NewCalendarComponent>
            <div className="my-6 text-20">2. 예약 시간을 선택해주세요!</div>
            <div className="my-6">
                <TimeTableComponent
                    selectedTime={selectedTimeArray}
                    getSelectedTime={getSelectedTime}
                    operatingTime={data.operatingTimeDay}
                    alreadySelectedTime={alreadySelectedTime}
                ></TimeTableComponent>
            </div>
            <div className="my-6 text-20">3. 예약 인원을 선택해주세요!</div>
            <div className="my-6">
                <FormControl className="w-2/12 my-5">
                    <InputLabel id="demo-simple-select-label">인원</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={people || ''}
                        label="people"
                        onChange={peopleChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <ReservationCardComponent
                locationName={data.name}
                locationType={data.sportsType}
                locationPhoneNumber={data.phoneNumber}
                date={selectedDate}
                people={people}
                price={peoplePrice}
                selectedTime={selectedTimeArray}
            ></ReservationCardComponent>
            <ButtonComponent ment="예약 하기" click={reserve}></ButtonComponent>
        </>
    );
};

export default ReservationPage;
