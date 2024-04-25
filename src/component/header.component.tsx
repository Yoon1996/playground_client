import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import SearchComponent from './search.component';
import { loginStateAtom, userInfoAtom } from '../atom/user.atom';
import { useEffect } from 'react';

const HeaderComponent = () => {
    const user = useRecoilValue(userInfoAtom);
    const navigate = useNavigate();
    const setLoginState = useSetRecoilState(loginStateAtom);
    const resetUserInfo = useResetRecoilState(userInfoAtom);
    const logoutHandler = () => {
        setLoginState({ state: false });
        resetUserInfo();
        navigate('/login/login-page');
    };
    useEffect(() => {
        console.log(user.length);
    }, []);
    return (
        <div className="flex justify-between items-center w-auto h-24 mb-5">
            <div className="font-bold text-28 cursor-pointer" onClick={() => navigate('/')}>
                playground
            </div>
            <div className="w-2/4">
                <SearchComponent></SearchComponent>
            </div>
            <div className="cursor-pointer flex flex-row items-center gap-2">
                <div onClick={() => navigate('/my_schedule')}>
                    <img className="size-8" src="/icon/calendar.png" alt="" />
                </div>
                <div className="cursor-pointer" onClick={() => navigate('/account/profile')}>
                    <img className="size-8" src="/icon/profile.png" alt="" />
                </div>
                {user.any === null ? (
                    <div onClick={() => navigate('/login/login-page')}>로그인</div>
                ) : (
                    <div>
                        <img className="cursor-pointer" onClick={logoutHandler} src="/icon/logout.png" alt="로그아웃" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderComponent;
