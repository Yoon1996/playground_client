import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../component/button.component'
import InputComponent from '../component/input.component'
import SelectComponent from '../component/select.component'
import { IErrors } from '../interface/error.interface'
import { IUser } from '../interface/user.interface'

const RegisterPage = () => {
    //초기값 설정
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePw, setRePw] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [sex, setSex] = useState<string>('')
    const [selectedSex, setSelectedSex] = useState<number>(1)
    const [birth, setBirth] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    //에러처리
    const [emailError, setEmailError] = useState<IErrors>({})
    const [pwError, setPwError] = useState<IErrors>({})
    const [birthError, setBirthError] = useState<IErrors>({})

    const navigate = useNavigate()

    useEffect(() => {
        if (selectedSex === 1) {
            setSex('MALE')
        } else if (selectedSex === 2) {
            setSex('FEMALE')
        }
    }, [selectedSex])

    //이메일 검증
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        setEmail(newEmail)

        const checkRes = expression.test(newEmail)
        if (checkRes) {
            setEmailError({ ...emailError, email: null })
        } else {
            setEmailError({ ...emailError, email: '이메일 형식이 아닙니다.' })
        }
    }

    const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const rePwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRePw(event.target.value)
    }

    //비밀번호 확인
    useEffect(() => {
        if (password && rePw && password !== rePw) {
            setPwError({ ...pwError, password: '비밀번호가 맞지 않습니다.' })
        } else {
            setPwError({ ...pwError, password: null })
        }
    }, [password, rePw])

    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

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

    //회원가입
    const userRegist = async () => {
        // if (!email || !password || !rePw || !name || !sex || !birth || !phoneNumber) {
        //     alert('빈칸을 모두 채워주세요.')
        // }
        const data: IUser = {
            email: email,
            password: password,
            name: name,
            sex: sex,
            birth: birth,
            phoneNumber: phoneNumber,
            provider: 'email',
        }
        if (Object.values(data).every((value) => value !== '')) {
            try {
                const response = await axios.post('http://localhost:3000/user/regist', data)
                console.log('response: ', response)
                alert('회원가입이 완료되었습니다.')
                navigate('/login/login-page')
            } catch (error: any) {
                console.log('error: ', error)
                if (error.response.status === 409) {
                    setEmailError({
                        ...emailError,
                        email: '중복된 이메일입니다.',
                    })
                } else {
                    setEmailError({
                        ...emailError,
                        email: null,
                    })
                }
            }
        } else {
            alert('빈 칸을 모두 채워주세요.')
        }
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
                        <div className="text-error">
                            {emailError?.email ? <p>{emailError?.email}</p> : ''}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div>비밀번호</div>
                        <InputComponent
                            value={password}
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
                        <div className="text-error">
                            {pwError?.password ? <p>{pwError?.password}</p> : ''}
                        </div>
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
                                placeholder="19961025"
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
                    <ButtonComponent click={userRegist} ment="가입하기"></ButtonComponent>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
