import { Outlet } from 'react-router-dom'

const MainTemplate = () => {
    return (
        <>
        <div className='w-4/5 m-auto'>
        <Outlet></Outlet>
        </div>
        </>
    )
}

export default MainTemplate
