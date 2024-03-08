import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginStateAtom } from '../atom/user.atom';

const AuthGuardComponent = ({ children }: any) => {
    const loginState = useRecoilValue(loginStateAtom);
    return loginState?.state ? children : <Navigate to="/login/login-page" replace={true}></Navigate>;
};

export default AuthGuardComponent;
