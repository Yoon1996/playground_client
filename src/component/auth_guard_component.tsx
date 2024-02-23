import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { loginStateAtom } from '../atom/user.atom'

const AuthGuardComponent = ({ children }: any) => {
    const loginState = useRecoilValue(loginStateAtom)
    return loginState?.state ? children : <Navigate to="/login/login-page" replace={true}></Navigate> 
    // if(!user.email){
    //     return <div>Loading...</div>
    // }else if(user.email){
    //     return children
    // } else {
    //     console.log("not user")
    //     return <Navigate to="/login/login-page" replace={true}></Navigate>
    // }
}

export default AuthGuardComponent
