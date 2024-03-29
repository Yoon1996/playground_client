import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { loginStateAtom, updateUserInfo, userInfoAtom } from '../atom/user.atom'
import ButtonComponent from '../component/button.component'
import InputComponent from '../component/input.component'
import { IErrors } from '../interface/error.interface'
import { ILoginUser } from '../interface/user.interface'
import { login, socialLogin } from '../service/user.service'
// import KakaoLogin from 'react-kakao-login'

const LoginPage = () => {
    //초기값 설정
    const [email, setEmail] = useState<string>('')
    const navigate = useNavigate()
    const [password, setPassword] = useState<string>('')
    const [loginError, setLoginError] = useState<IErrors>({})
    const setUserInfo = useSetRecoilState(userInfoAtom)
    const setLoginState = useSetRecoilState(loginStateAtom)
    const setUpdateUserInfo = useSetRecoilState(updateUserInfo)
    
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
            const result = await login(loginData)
            console.log('result: ', result);
            setUserInfo(result.data)
            setUpdateUserInfo(result.data)
            setLoginState({state: true})
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

    //엔터 입력시 로그인
    const pressEnterLogin = (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            loginHandler()
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('tokenResponse: ', tokenResponse);
            socialLogin(tokenResponse)
            .then((res) => {
                console.log('res: ', res);
                setUserInfo(res.data)
                setUpdateUserInfo(res.data)
                setLoginState({state: true})
                if(res.data.birth === null){
                    navigate('/login/add_profile')
                } else {
                    navigate('/')
                }
            })
            .catch((err) => {
                console.log('err: ', err);

            })
        },
        onError: (errorResponse) => {
          console.log("errorResponse: ", errorResponse);
        },
        ux_mode: "popup",
        flow: "auth-code",
      });

    //카카오 로그인(카카오 이메일 가져오기 불가)
    // const kakaoClientId = '023830c29b998f688a6ac45d285dc358'
    // const kakaoOnSuccess = async (data: any) => {
    //     // console.log(data)
    //     const idToken = data.response.access_token
    //     const dd = {
    //         token: idToken,
    //     }
    //     // console.log('idToken: ', idToken)
    //     const result = await axios.post('http://localhost:3000/auth/kakao-login', dd)
    //     console.log('result: ', result)
    // }
    // const kakaoOnFailure = (error: any) => {
    //     console.log(error)
    // }
    // const kakaoLoginHandler = async () => {
    //     const REST_API_KEY = '20028888d92bfd0b1c1b3c9241d655af'
    //     const REDIRECT_URI = 'http://localhost:5173/auth'
    //     const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    //     const code = new URL(window.location.href).searchParams.get('code')
    //     console.log('code: ', code)
    //     window.location.href = KAKAO_AUTH_URL


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
                        press={pressEnterLogin}
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
                    <ButtonComponent ment='구글로그인' click={() => googleLogin()}></ButtonComponent>
                    {/* <div className="cursor-pointer" onClick={kakaoLoginHandler}>
                        <KakaoLogin
                            token={kakaoClientId}
                            onSuccess={kakaoOnSuccess}
                            onFail={kakaoOnFailure}
                        />
                        <img src="../public/kakao-login.svg" alt="" />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default LoginPage
