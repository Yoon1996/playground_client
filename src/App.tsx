import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginTemplate from './template/login.template'
import LoginPage from './page/login.page'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import RegisterPage from './page/register.page'
import './index.css'

//css 초기화
const GlobalStyle = createGlobalStyle`
  ${reset}
`

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
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
