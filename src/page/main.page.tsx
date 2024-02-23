import { useRecoilValue } from 'recoil'
import CalendarComponent from '../component/calendar.component'
import HeaderComponent from '../component/header.component'
import WeatherComponent from '../component/weather.component'
import { userInfoAtom } from '../atom/user.atom'
import { useEffect } from 'react'


const MainPage = () => {

  return (
    <>
    <HeaderComponent></HeaderComponent>
    <CalendarComponent></CalendarComponent>
    <WeatherComponent></WeatherComponent>
    </>
  )
}

export default MainPage