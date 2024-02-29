import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { constSelector } from 'recoil';

const CalendarComponent = () => {

  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState()

  //day of the week 요일
  const dotw = ['일', '월', '화', '수', '목', '금','토']
  const renderDotw = () => {
    return dotw.map((dotw, index) => <div key={index} className='flex justify-center w-8'>{dotw}</div>)
  }

  const getStartOfWeek = (date:any) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  const renderCalendar = () => {
    const startOfWeek = getStartOfWeek(date);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i-1);
      days.push(currentDate);
    }

    return days.map((day, index) => (
      <div onClick={() => handleDateClick(day)} className='flex justify-center items-center w-8 h-8 hover:bg-primary-light hover:rounded-md cursor-pointer' key={index}>
        {day.getDate()}
      </div>
    ));
  };
  const handleDateClick = (selectedDay:any) => {
    setSelectedDate(selectedDay)
  };
  
  useEffect(() => {
  },[handleDateClick])
  return(
        <>
        <div className="w-full flex flex-col gap-4 justify-center items-center">
            <div className="flex w-full justify-between items-center">
                <div onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7))}>
                  <img className='cursor-pointer' src="../public/left-arrow.png" alt="" />
                </div>
                <div>{date.getFullYear()}년 {date.toLocaleString('default', { month: 'long' })}</div>
                <div onClick={() => setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7))}>
                  <img className='cursor-pointer' src="../public/right-arrow.png" alt="" />
                </div>
            </div>
            <div className="flex w-full justify-between gap-6">
                {renderDotw()}
            </div>
            <div className="flex w-full justify-between gap-6">
                {renderCalendar()}
            </div>
        </div>
        </>
    )
}

export default CalendarComponent