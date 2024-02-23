import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoAtom } from '../atom/user.atom'
import ButtonComponent from '../component/button.component'
import Modal from '../component/modal.component'

const ProfilePage = () => {
  const user = useRecoilValue(userInfoAtom)
  console.log('user: ', user);
  const date = new Date(user.birth)
  const myBirth = date.getFullYear() + '년 ' + date.getMonth() + '월 ' + date.getDay() + '일'

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<String>('')

  //연락처 수정 핸들러
  const phoneNumberHandler = () => {
    setModalOpen(true)
    setTitle('phoneNumber')
  }
  //생년월일 수정 핸들러
  const birthHandler = () => {
    setModalOpen(true)
    setTitle('birth')
  }
  //비밀번호 변경 핸들러
  const passwordHandler = () => {
    setModalOpen(true)
    setTitle('password')
  }

  const handelCancle = () => {
    setModalOpen(false)
    setTitle('')
  }
  
  return (
    <>
    <div className='flex flex-col'>
    <div className='text-28 font-bold'>PLAYGROUND 기본 설정</div>
    <div className='flex flex-col gap-5 py-5'>
      <div className='flex flex-col gap-1'>
      <div>{user.name}님의 계정</div>
      <div>{user.email}</div>
      </div>
      <div className='flex flex-row items-center gap-5'>
        <div className='flex flex-col w-4/5 gap-1'>
        <div>연락처</div>
        <div>{user.phoneNumber}</div>
        </div>
        <ButtonComponent ment='수정' click={phoneNumberHandler}></ButtonComponent>
      </div>
      <div className='flex flex-row items-center gap-5'>
      <div className='flex flex-col w-4/5 gap-1'>
        <div>생년월일</div>
        <div>{myBirth}</div>
        </div>
        <ButtonComponent ment='수정' click={birthHandler}></ButtonComponent>
      </div>
      <div className='flex flex-row items-center gap-5'>
      <div className='flex flex-col w-4/5 gap-1'>
        <div>비밀번호 변경하기</div>
        </div>
        <ButtonComponent ment='변경' click={passwordHandler}></ButtonComponent>
      </div>
    </div>
    </div>
    {modalOpen ? <Modal title={title} cancel={handelCancle}></Modal> : null }
    </>
  )
}

export default ProfilePage