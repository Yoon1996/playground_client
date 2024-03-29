import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../component/button.component'
import InputComponent from '../component/input.component'
import SelectComponent from '../component/select.component'
import { IErrors } from '../interface/error.interface'
import { IAddProfile } from '../interface/user.interface'
import { addProfile } from '../service/user.service'
import { useRecoilValue } from 'recoil'
import { userInfoAtom } from '../atom/user.atom'

const AddProfilePage = () => {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoAtom)
    //초기값 설정
    const [sex, setSex] = useState<string>('')
    const [selectedSex, setSelectedSex] = useState<number>(1)
    const [birth, setBirth] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const [birthError, setBirthError] = useState<IErrors>({})

    useEffect(() => {
        if (selectedSex === 1) {
            setSex('MALE')
        } else if (selectedSex === 2) {
            setSex('FEMALE')
        }
    }, [selectedSex])

    const sexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSex(Number(event.target.value))
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

    const numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value)
    }

    const updateProfile = async () => {
        const profileData:IAddProfile = {
            id: userInfo.id,
            sex: sex,
            birth: birth,
            phoneNumber: phoneNumber
        }
        try {
                if(birthError.birth === null && phoneNumber){
                const result = await addProfile(profileData)
                console.log('result: ', result);
                navigate('/')
                }
            }
            catch(err){
                console.log('err: ', err);
            }
    }
  return (
    <>
    <div className="flex flex-col gap-5">
                <div className="text-28 font-bold">PLAYGROUND 추가 정보 입력</div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div>이메일</div>
                        <InputComponent
                            notChangedValue={userInfo.email}
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            readonly={true}
                        ></InputComponent>
                        <div className="text-error">
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>이름</div>
                        <InputComponent
                            notChangedValue={userInfo.name}
                            type="text"
                            placeholder="이름을 입력해주세요."
                            readonly={true}
                        ></InputComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>성별</div>
                        <SelectComponent
                            change={sexChange}
                            optionList={[
                                { name: '남자', value: 1 },
                                { name: '여자', value: 2 },
                            ]}
                            selectedValue={selectedSex}
                        ></SelectComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>생년월일</div>
                        <div className="flex flex-row gap-4">
                            <InputComponent
                                value={birth}
                                change={birthChange}
                                type="text"
                                placeholder="예}19961025"
                            ></InputComponent>
                        </div>
                        <div className="text-error">
                            {birthError?.birth ? <p>{birthError?.birth}</p> : ''}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>휴대폰 번호</div>
                        <InputComponent
                            value={phoneNumber}
                            change={numberChange}
                            type="text"
                            placeholder="예)01012345678."
                        ></InputComponent>
                    </div>
                    <ButtonComponent click={() => {updateProfile()}} ment="입력하기"></ButtonComponent>
                </div>
            </div>
        </>
  )
}

export default AddProfilePage