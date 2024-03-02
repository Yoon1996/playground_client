import { useEffect, useState } from 'react';
import CategoryButtonComponent from './category_button.component';
import { showGymList } from '../../service/gym.service';
import { IGymModel } from '../../interface/gym.interface';

const CategoryListComponent = () => {
    // const categories = ['운동종목', '지역', '날짜', '시간', '구장 크기', '실내외'];
    const [gymList, setGymList] = useState([])
    const [sportsType, setSportsType] = useState<string[]>([])
    const categories = [
      {name: '운동종목',
      menu:[]
    },
    {name: '지역',
    menu: ['서울']
  }
    ]
  return (
    <>
    <div className='flex gap-2 max-h-11 z-50'>
      <div className='text-primary-45 border-solid border-2 border-primary-a6 rounded-lg flex items-center px-3 py-2 cursor-pointer'><img src="../public/icon/map.svg" alt="" /></div>
        {categories.map((category, index) => 
        <CategoryButtonComponent onClick={() => {}} dropwdownItems={category.menu} key={index} category={category.name}></CategoryButtonComponent>
        )}
    </div>
    </>
  )
}

export default CategoryListComponent