import { useRecoilValue } from 'recoil'
import GroundComponent from './ground_component'
import { gymListAtom } from '../../atom/gym.atom'

const GroundListComponent = () => {
  const gymList = useRecoilValue(gymListAtom)
  return (
    <>
    <div className='flex  gap-4 justify-start flex-wrap'>
      {gymList.map((gym: object,index:number) => <GroundComponent key={index}></GroundComponent>)}
    </div>
    </>
  )
}

export default GroundListComponent