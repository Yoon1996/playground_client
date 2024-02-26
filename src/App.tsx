import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RecoilEnv, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './App.css'
import { loginStateAtom, updateUserInfo, userInfoAtom } from './atom/user.atom'
import AuthGuardComponent from './component/auth_guard_component'
import './index.css'
import AddProfilePage from './page/add_profile.page'
import LoginPage from './page/login.page'
import MainPage from './page/main.page'
import ProfilePage from './page/profile.page'
import RegisterPage from './page/register.page'
import { tokenVerify } from './service/auth.service'
import AccountTemplate from './template/account.template'
import LoginTemplate from './template/login.template'
import MainTemplate from './template/main.template'
import { clearAccessToken, getAccessToken } from './util/localstorage.util'

//css 초기화
const GlobalStyle = createGlobalStyle`
  ${reset}
  `
const clientId = '78880962569-erjfo23p08dkbajteivgh93jio78k1al.apps.googleusercontent.com'
function App() {
    RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
    const setUserInfo = useSetRecoilState(userInfoAtom)
    const setUpdateUserInfo = useSetRecoilState(updateUserInfo)
    
    useEffect( () => {
    const accessToken = getAccessToken()
    const savedValue = localStorage.getItem('accessToken')
    if(savedValue === 'undefined'){
        localStorage.clear()
    }
    if(accessToken){
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        tokenVerify()
        .then((res) => {
            setUserInfo(res.data)
            setUpdateUserInfo(res.data)
        })
        .catch((err) => {
            console.log('err: ', err);
            clearAccessToken()
        })
}
},[])
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
                        <Route path="/account" element={<AuthGuardComponent><AccountTemplate></AccountTemplate></AuthGuardComponent>}>
                            <Route path='profile' element={<ProfilePage></ProfilePage>}></Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </GoogleOAuthProvider>
        </>
    )
}

export default App
