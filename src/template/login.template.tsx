import { Outlet } from 'react-router-dom'

const LoginTemplate = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Outlet></Outlet>
        </div>
    )
}

export default LoginTemplate
