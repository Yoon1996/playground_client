import React from 'react'
import ButtonComponent from '../component/button.component'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../atom/user.atom'

const ProfilePage = () => {
  const user = useRecoilValue(userAtom)
  const date = new Date(user.birth)
  const myBirth = date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일'
  
  return (
    <>
    <div className='flex flex-col'>
    <div className='text-28 font-bold'>PLAYGROUND 기본 설정</div>
    <div className='flex flex-col gap-5 py-5'>
      <div className='flex flex-col gap-1'>
      <div>윤성준님의 계정</div>
      <div>{user.email}</div>
      </div>
      <div className='flex flex-row items-center gap-5'>
        <div className='flex flex-col w-4/5 gap-1'>
        <div>연락처</div>
        <div>{user.phoneNumber}</div>
        </div>
        <ButtonComponent ment='수정' click={() => {}}></ButtonComponent>
      </div>
      <div className='flex flex-row items-center gap-5'>
      <div className='flex flex-col w-4/5 gap-1'>
        <div>생년월일</div>
        <div>{myBirth}</div>
        </div>
        <ButtonComponent ment='수정' click={() => {}}></ButtonComponent>
      </div>
      <div className='flex flex-row items-center gap-5'>
      <div className='flex flex-col w-4/5 gap-1'>
        <div>비밀번호 변경하기</div>
        </div>
        <ButtonComponent ment='변경' click={() => {}}></ButtonComponent>
      </div>
    </div>
    </div>
    </>
  )
}

export default ProfilePage