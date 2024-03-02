import React, { useState } from 'react'
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { loginStateAtom, updateUserInfo, userInfoAtom } from '../../atom/user.atom'
import { IErrors } from '../../interface/error.interface'
import { changeBirth, changePhoneNumber, changePw } from '../../service/user.service'
import ButtonComponent from '../button.component'
import InputComponent from '../input.component'
import { IChangePw } from '../../interface/user.interface'


interface IModal {
    title: String
    cancel: () => void
}
const Modal = ({title, cancel}:IModal) => {
    
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [birth, setBirth] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [phoneNumberError, setPhoneNumberError] = useState<IErrors>({})
    const [birthError, setBirthError] = useState<IErrors>({})
    const userInfo = useRecoilValue(updateUserInfo)
    const setUpdateUserInfo = useSetRecoilState(updateUserInfo)
    const setLoginState = useSetRecoilState(loginStateAtom)
    const resetUserInfo = useResetRecoilState(userInfoAtom)

    const numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value)
    }

    const birthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(event.target.value)
    }
    const oldNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(event.target.value)
    }
    const newNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const newNumberCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value)
    }
    
    const editPhoneNumber = () => {
        const editData = {
            phoneNumber: phoneNumber,
        }
        if(phoneNumber.length !== 11){
            setPhoneNumberError({
                ...phoneNumberError,
                number: '형식에 맞게 작성해주세요.'
            })
        }else {
            setPhoneNumberError({
                ...phoneNumberError,
                number: null
            })
            changePhoneNumber(editData, userInfo.id)
            .then((res) => {
                console.log('res: ', res);
                setUpdateUserInfo(res.data)
                cancel()
            })
            .catch((err) => {
                console.log('err: ', err);
            })
        }
    }

    const editBirth = () => {
        const editData = {
            birth: birth
        }
        if (birth.length !== 8) {
            setBirthError({
                ...birthError,
                birth: '생년월일은 8개의 숫자를 입력해주세요.',
            })
        } else {
            setBirthError({
                ...birthError,
                birth: null,
            })
            changeBirth(editData, userInfo.id)
            .then((res) => {
                console.log('res: ', res);
                setUpdateUserInfo(res.data)
                cancel()
            })
            .catch((err) => {
                console.log('err: ', err);
            })
        }
    }

    const editPw = () => {
        const editData:IChangePw = {
            oldPassword: oldPassword,
            password: password,
            newPassword: newPassword
        }
        changePw(editData, userInfo.id)
        .then((res) => {
            console.log('res: ', res);
            cancel()
            alert('다시 로그인 해주세요.');
            setLoginState({state: false})
            resetUserInfo()
        })
        .catch((err) => {
            console.log('err: ', err);
            if(err.response.data.message === '현재 비밀번호가 일치하지 않습니다.'){
                alert('현재 비밀번호가 일치하지 않습니다.')
            } else if(err.response.data.message === '입력하신 새 비밀번호가 일치 하지 않습니다.'){
                alert('입력하신 새 비밀번호가 일치 하지 않습니다.')
            } else if(err.response.data.message === '새 비밀번호는 현재 비밀번호와 일치하면 안됩니다.'){
                alert('새 비밀번호는 현재 비밀번호와 일치하면 안됩니다.')
            }
        })
    }

  return (
    <>
    <div className='w-full h-full flex justify-center items-center bg-primary-a6 bg-opacity-80 tra absolute'>
    {title === 'birth' ? <div className='w-96 h-44 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
            <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/icon/close.png" onClick={cancel} alt="" />
            <div className='text-20'>생년월일 수정</div>
            <InputComponent change={birthChange} placeholder='예)19961025' type='text'></InputComponent>
            {birthError?.birth ? <div className='text-error'>{birthError.birth}</div> : ''}
            <ButtonComponent ment='저장하기' click={editBirth}></ButtonComponent>
        </div> : ""}
        {title === 'phoneNumber' ? <div className='w-96 h-44 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
        <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/icon/close.png" onClick={cancel} alt="" />
            <div className='text-20'>연락처 수정</div>
            <InputComponent change={numberChange} placeholder='예)01051865289' type='text'></InputComponent>
            {phoneNumberError?.number ? <div className='text-error'>{phoneNumberError.number}</div> : ''}
            <ButtonComponent ment='저장하기' click={editPhoneNumber}></ButtonComponent>
        </div>:''}
        
        {title === 'password' ? <div className='w-96 h-72 p-5 flex flex-col justify-center items-center gap-2 bg-white rounded-md shadow-md relative'>
        <img className='w-6 h-6 absolute right-2 top-2 cursor-pointer' src="../public/icon/close.png" onClick={cancel} alt="" />
            <div className='flex flex-col gap-4'>
            <div className='text-20'>비밀번호 변경</div>
            <div className='flex justify-between items-center gap-7'>
                <div>현재 비밀번호</div>
                <div className='w-3/5'>
                <InputComponent change={oldNumberChange} type='password' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex justify-between items-center gap-7'>
                <div>새 비밀번호</div>
                <div className='w-3/5'>
                <InputComponent change={newNumberChange} type='password' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex justify-between items-center gap-7'>
                <div>새 비밀번호 확인</div>
                <div className='w-3/5'>
                <InputComponent change={newNumberCheckChange} type='password' placeholder=''></InputComponent>
                </div>
            </div>
            <div className='flex gap-3'>
                <ButtonComponent ment='비밀번호 변경하기' click={editPw}></ButtonComponent>
                <ButtonComponent ment='다음에 변경하기' click={cancel}></ButtonComponent>
            </div>
            </div>
        </div> : ''}
    </div>
    </>
  )
}

export default Modal