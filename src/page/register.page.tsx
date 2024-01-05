import React, { useState } from 'react'
import ButtonComponent from '../component/button.component'
import InputComponent from '../component/input.component'
import SelectComponent from '../component/select.component'

const RegisterPage = () => {
    const [email, setEmail] = useState<string>('')
    const [pw, setPw] = useState<string>('')
    const [rePw, setRePw] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [birth, setBirth] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPw(event.target.value)
    }
    const rePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRePw(event.target.value)
    }
    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const sexChange = (event: React.ChangeEvent<HTMLElement>) => {
        const clickedValue = event.target.innerText
        setSex(clickedValue)
        console.log(sex)
    }
    const birthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirth(event.target.value)
        console.log(birth)
    }
    const numberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value)
    }
    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="text-28 font-bold">PLAYGROUND 회원가입</div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div>이메일</div>
                        <InputComponent
                            value={email}
                            change={emailChange}
                            type="text"
                            placeholder="이메일을 입력해주세요."
                        ></InputComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>비밀번호</div>
                        <InputComponent
                            value={pw}
                            change={pwChange}
                            type="password"
                            placeholder="비밀번호를 입력해주세요."
                        ></InputComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>비밀번호 확인</div>
                        <InputComponent
                            value={rePw}
                            change={rePwChange}
                            type="password"
                            placeholder="비밀번호를 한 번 더 입력해주세요."
                        ></InputComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>이름</div>
                        <InputComponent
                            value={name}
                            change={nameChange}
                            type="text"
                            placeholder="이름을 입력해주세요."
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
                        ></SelectComponent>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>생년월일</div>
                        <div className="flex flex-row gap-4">
                            <InputComponent
                                value={birth}
                                change={birthChange}
                                type="text"
                                placeholder="19961025"
                            ></InputComponent>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>휴대폰 번호</div>
                        <InputComponent
                            value={phoneNumber}
                            change={numberChange}
                            type="text"
                            placeholder="예)010-1234-5678."
                        ></InputComponent>
                    </div>
                    <ButtonComponent
                        click={() => console.log(22)}
                        ment="가입하기"
                    ></ButtonComponent>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
