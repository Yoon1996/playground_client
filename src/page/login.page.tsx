import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atom/user.atom'
import ButtonComponent from '../component/button.component'
import InputComponent from '../component/input.component'
import { ILoginUser } from '../interface/user.interface'
import { getAccessToken, setAccessToken } from '../util/localstorage'
import { IErrors } from '../interface/error.interface'

const LoginPage = () => {
    //초기값 설정
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState<IErrors>({})
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useRecoilState(userAtom)

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value
        setEmail(newEmail)
    }

    const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const loginHandler = async () => {
        const loginData: ILoginUser = {
            email: email,
            password: password,
        }
        try {
            const result = await axios.post('http://localhost:3000/auth/login', loginData)
            console.log('result: ', result)
            setAccessToken(result.data.jwt)
            setLoggedIn(result.data)
            const accessToken = getAccessToken()
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            navigate('/')
        } catch (error: any) {
            console.log('error: ', error)
            if (error.response.status === 422) {
                setLoginError({
                    ...loginError,
                    login: '이메일 또는 비밀번호가 맞지 않습니다.',
                })
            }
        }
    }
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <div className="text-28 font-bold">PLAYGROUND 로그인</div>
                <div className="flex flex-col gap-5 max-w-full">
                    <InputComponent
                        change={emailChange}
                        value={email}
                        type="text"
                        placeholder="이메일"
                    ></InputComponent>
                    <InputComponent
                        change={pwChange}
                        value={password}
                        type="text"
                        placeholder="비밀번호"
                    ></InputComponent>
                    <div className="text-error">
                        {loginError?.login ? <p>{loginError?.login}</p> : ''}
                    </div>
                    <ButtonComponent ment="로그인" click={loginHandler}></ButtonComponent>
                    <div className="flex flex-row justify-center gap-6">
                        <div className="cursor-pointer">아이디/비밀번호 찾기</div>
                        <div
                            className="cursor-pointer"
                            onClick={() => {
                                navigate('/login/regist-page')
                            }}
                        >
                            회원가입
                        </div>
                    </div>
                    <div className="cursor-pointer">
                        <img src="../public/kakao-login.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage
