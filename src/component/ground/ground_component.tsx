import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { gymListAtom } from '../../atom/gym.atom'

interface groundComponentProps {

}

const GroundComponent = () => {
  const gymList = useRecoilValue(gymListAtom)
  useEffect(() => {
    console.log(gymList)
  })

  return (
    <>
    {gymList.map((gym, index:number) => 
    <div className='w-60 h-56 flex flex-col justify-between'>
    <div>
      <img className='w-full' src="../public/icon/sample.png" alt="" />
    </div>
    <div className='flex gap-1 justify-between items-center'>
      <div>{gym.name}</div>
      <div className='flex gap-1'>
        <div className='flex items-center'>
          <div>
            <img src="../public/icon/star-f.png" alt="" />
          </div>
          <div>5.0</div>
        </div>
        <div className='flex items-center'>
          <div>
            <img src="../public/icon/heart.png" alt="" />
          </div>
          <div>210</div>
        </div>
      </div>
    </div>
    <div className='flex flex-col justify-center text-primary-45 text-13'>
      <div>스포츠타입</div>
      <div>구장 크기</div>
      <div>이용 시간</div>
      <div>주차 가능 여부</div>
    </div>
  </div>
    )}
    </>
  )
}

export default GroundComponent