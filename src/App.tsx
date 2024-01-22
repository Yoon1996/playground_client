import axios from 'axios'
import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import './App.css'
import { userAtom } from './atom/user.atom'
import './index.css'
import LoginPage from './page/login.page'
import RegisterPage from './page/register.page'
import LoginTemplate from './template/login.template'
import MainTemplate from './template/main.template'
import { getAccessToken } from './util/localstorage'
import AuthGuardComponent from './component/auth_guard_component'

//css 초기화
const GlobalStyle = createGlobalStyle`
  ${reset}
`
function App() {
    console.log('import.meta.env.VITE_APP_HOST', import.meta.env.VITE_APP_HOST)
    const user = useRecoilValue(userAtom)
    useEffect(() => {
        const accessToken = getAccessToken()
        console.log('user: ', user)
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }, [])
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <AuthGuardComponent>
                                <MainTemplate></MainTemplate>
                            </AuthGuardComponent>
                        }
                    ></Route>
                    <Route path="/login" element={<LoginTemplate></LoginTemplate>}>
                        <Route path="/login/login-page" element={<LoginPage></LoginPage>}></Route>
                        <Route
                            path="/login/regist-page"
                            element={<RegisterPage></RegisterPage>}
                        ></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
