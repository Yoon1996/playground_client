import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecoilEnv, useRecoilValue, useSetRecoilState } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './App.css'
import AuthGuardComponent from './component/auth_guard_component'
import './index.css'
import AddProfilePage from './page/add_profile.page'
import LoginPage from './page/login.page'
import MainPage from './page/main.page'
// import ProfilePage from './page/profile.page'
import { loginStateAtom, userInfoAtom } from './atom/user.atom'
import RegisterPage from './page/register.page'
import { tokenVerify } from './service/auth.service'
import AccountTemplate from './template/account.template'
import LoginTemplate from './template/login.template'
import MainTemplate from './template/main.template'
import { getAccessToken } from './util/localstorage.util'
import ProfilePage from './page/profile.page'

//css 초기화
const GlobalStyle = createGlobalStyle`
  ${reset}
`
const clientId = '78880962569-erjfo23p08dkbajteivgh93jio78k1al.apps.googleusercontent.com'
function App() {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
    const userInfo = useRecoilValue(userInfoAtom)
    const loginState = useRecoilValue(loginStateAtom)
    const setUserInfo = useSetRecoilState(userInfoAtom)
    
    useEffect( () => {
        const accessToken = getAccessToken()
        if(!accessToken){
            console.log('no user')
    }
    if(accessToken){
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        tokenVerify()
        .then((res) => {
            console.log('res: ', res);
            setUserInfo(res.data)
        })
        .catch((err) => {
            console.log('err: ', err);
        })
        .finally(() => {
        console.log('userInfo: ', userInfo);
    })
}
},[loginState])
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Navigate replace to='/main/main-page'/>}></Route>
                        <Route path="/main"element={<AuthGuardComponent><MainTemplate></MainTemplate></AuthGuardComponent>}>
                            <Route path='main-page' element={<MainPage></MainPage>}></Route>
                        </Route>
                        <Route path="/login" element={<LoginTemplate></LoginTemplate>}>
                            <Route
                                path="login-page"
                                element={<LoginPage></LoginPage>}
                            ></Route>
                            <Route
                                path="regist-page"
                                element={<RegisterPage></RegisterPage>}
                            ></Route>
                            <Route path='add_profile' element={<AddProfilePage></AddProfilePage>}></Route>
                        </Route>
                        <Route path="/account" element={<AccountTemplate></AccountTemplate>}>
                            <Route path='profile' element={<ProfilePage></ProfilePage>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    )
}

export default App
