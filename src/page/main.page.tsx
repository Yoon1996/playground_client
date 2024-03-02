import { useEffect } from 'react'
import CategoryListComponent from '../component/category/category_list.component'
import GroundListComponent from '../component/ground/ground_list.component'
import HeaderComponent from '../component/header.component'
import { showGymList } from '../service/gym.service'
import { useSetRecoilState } from 'recoil'
import { gymListAtom } from '../atom/gym.atom'


const MainPage = () => {

  const setGymList = useSetRecoilState(gymListAtom)

  useEffect(() => {
    showGymList()
    .then((res) => {
      console.log('res: ', res);
      setGymList(res.data)
    })
    .catch((err) => {
      console.log('err: ', err);
    })
  })

  return (
    <>
    <HeaderComponent></HeaderComponent>
    <div className='flex gap-4 flex-col'>
    <CategoryListComponent></CategoryListComponent>
    <GroundListComponent></GroundListComponent>
    </div>
    </>
  )
}

export default MainPage