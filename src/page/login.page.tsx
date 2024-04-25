import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginStateAtom, updateUserInfo, userInfoAtom } from '../atom/user.atom';
import ButtonComponent from '../component/button.component';
import InputComponent from '../component/input.component';
import { IErrors } from '../interface/error.interface';
import { ILoginUser } from '../interface/user.interface';
import { login, socialLogin } from '../service/user.service';
import { Button } from '@mui/material';
// import KakaoLogin from 'react-kakao-login'

const LoginPage = () => {
    //초기값 설정
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();
    const [password, setPassword] = useState<string>('');
    const [loginError, setLoginError] = useState<IErrors>({});
    const setUserInfo = useSetRecoilState(userInfoAtom);
    const setLoginState = useSetRecoilState(loginStateAtom);
    const setUpdateUserInfo = useSetRecoilState(updateUserInfo);

    const emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };

    const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const loginHandler = async () => {
        const loginData: ILoginUser = {
            email: email,
            password: password,
        };
        try {
            const result = await login(loginData);
            console.log('result: ', result);
            setUserInfo(result.data);
            setUpdateUserInfo(result.data);
            setLoginState({ state: true });
            navigate('/');
        } catch (error: any) {
            console.log('error: ', error);
            if (error.response.status === 422) {
                setLoginError({
                    ...loginError,
                    login: '이메일 또는 비밀번호가 맞지 않습니다.',
                });
            }
        }
    };

    //엔터 입력시 로그인
    const pressEnterLogin = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            loginHandler();
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            socialLogin(tokenResponse)
                .then((res) => {
                    console.log('res: ', res);
                    setUserInfo(res.data);
                    setUpdateUserInfo(res.data);
                    setLoginState({ state: true });
                    if (res.data.birth === null) {
                        navigate('/login/add_profile');
                    } else {
                        navigate('/');
                    }
                })
                .catch((err) => {
                    console.log('err: ', err);
                });
        },
        onError: (errorResponse) => {
            console.log('errorResponse: ', errorResponse);
        },
        ux_mode: 'popup',
        flow: 'auth-code',
    });

    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <div className="text-28 font-bold">PLAYGROUND 로그인</div>
                <div className="flex flex-col gap-5 w-full">
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
                    <div className="text-error">{loginError?.login ? <p>{loginError?.login}</p> : ''}</div>
                    <ButtonComponent ment="로그인" click={loginHandler}></ButtonComponent>
                    <ButtonComponent ment="회원가입" click={() => navigate('/login/regist-page')}></ButtonComponent>
                    {/* <ButtonComponent ment="구글로그인" click={() => googleLogin()}></ButtonComponent> */}
                </div>
            </div>
        </>
    );
};

export default LoginPage;
