import CategoryListComponent from '../component/category/category_list.component'
import HeaderComponent from '../component/header.component'


const MainPage = () => {

  return (
    <>
    <HeaderComponent></HeaderComponent>
    <div className='flex gap-4 flex-col'>
    <div className='text-20 font-semibold text-primary-45'>체육 시설 예약하기</div>
    <CategoryListComponent></CategoryListComponent>
    </div>
    {/* <CalendarComponent></CalendarComponent>
    <WeatherComponent></WeatherComponent> */}
    </>
  )
}

export default MainPage