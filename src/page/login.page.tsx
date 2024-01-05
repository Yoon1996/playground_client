import InputComponent from '../component/input.component'
import ButtonComponent from '../component/button.component'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <div className="text-28 font-bold">PLAYGROUND 로그인</div>
                <div className="flex flex-col gap-5">
                    <InputComponent type="text" placeholder="이메일"></InputComponent>
                    <InputComponent type="text" placeholder="비밀번호"></InputComponent>
                    <ButtonComponent ment="로그인" click={() => console.log(2)}></ButtonComponent>
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
