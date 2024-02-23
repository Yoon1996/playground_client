import React, { useState } from 'react'
import { IErrors } from '../interface/error.interface'
import { changeProfile } from '../service/user.service'
import ButtonComponent from './button.component'
import InputComponent from './input.component'


interface IModal {
    title: String
    cancel: () => void
}
const Modal = ({title, cancel}:IModal) => {

    
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [birth, setBirth] = useState<string>('')

    const [birthError, setBirthError] = useState<IErrors>({})

    const numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value)
    }

    const birthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(event.target.value)
        if (event.target.value.length !== 8) {
            setBirthError({
                ...birthError,
                birth: '생년월일은 8개의 숫자를 입력해주세요.',
            })
        } else {
            setBirthError({
                ...birthError,
                birth: null,
            })
        }
    }
    
    const editPhoneNumber = () => {
        const editData = {
            phoneNumber: phoneNumber,
        }
        changeProfile(editData, 5)
        .then((res) => {
            console.log('res: ', res);
        })
        .catch((err) => {
            console.log('err: ', err);
        })
    }

    const editBirth = () => {
        const editData = {
            birth: birth
        }
        changeProfile(editData, 5)
        .then((res) => {
            console.log('res: ', res);
        })
        .catch((err) => {
            console.log('err: ', err);
        })
    }

    const changePassword = () => {
        // const editData = {
        //     phoneNumber: phoneNumber,
        // }
        // changeProfile(editData)
        // .then((res) => {
        //     console.log('res: ', res);
        // })
        // .catch((err) => {
        //     console.log('err: ', err);
        // })
    }

  return (
    <>
    <div className='w-full h-full flex justify-center items-center bg-primary-a6 bg-opacity-80 tra absolute'>
    {title === 'birth' ? <div className='w-96 h-44 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
            <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/close.png" onClick={cancel} alt="" />
            <div className='text-20'>생년월일 수정</div>
            <InputComponent change={birthChange} placeholder='' type='text'></InputComponent>
            <ButtonComponent ment='저장하기' click={editBirth}></ButtonComponent>
        </div> : ""}
        {title === 'phoneNumber' ? <div className='w-96 h-44 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
        <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/close.png" onClick={cancel} alt="" />
            <div className='text-20'>연락처 수정</div>
            <InputComponent change={numberChange} placeholder='예)01051865289' type='text'></InputComponent>
            <ButtonComponent ment='저장하기' click={editPhoneNumber}></ButtonComponent>
        </div>:''}
        
        {title === 'password' ? <div className='w-96 h-72 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
        <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/close.png" onClick={cancel} alt="" />
            <div className='flex flex-col gap-4'>
            <div className='text-20'>비밀번호 변경</div>
            <div className='flex justify-between items-center gap-7'>
                <div>현재 비밀번호</div>
                <div className='w-3/5'>
                <InputComponent type='text' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex justify-between items-center gap-7'>
                <div>새 비밀번호</div>
                <div className='w-3/5'>
                <InputComponent type='text' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex justify-between items-center gap-7'>
                <div>새 비밀번호 확인</div>
                <div className='w-3/5'>
                <InputComponent type='text' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex gap-3'>
                <ButtonComponent ment='비밀번호 변경하기' click={changePassword}></ButtonComponent>
                <ButtonComponent ment='다음에 변경하기' click={cancel}></ButtonComponent>
            </div>
            </div>
        </div> : ''}
    </div>
    </>
  )
}

export default Modal