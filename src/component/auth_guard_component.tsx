import React from 'react'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../atom/user.atom'
import { Navigate } from 'react-router-dom'

const AuthGuardComponent = ({ children }: any) => {
    const user = useRecoilValue(userAtom)
    if (user?.email.length === 0) {
        return <Navigate to="/login/login-page" replace={true}></Navigate>
    } else if (user?.email) {
        return children
    }
}

export default AuthGuardComponent
