import { Outlet } from 'react-router-dom'

const MainTemplate = () => {
    return (
        <>
        <div className='max-w-screen-lg m-auto'>
        <Outlet></Outlet>
        </div>
        </>
    )
}

export default MainTemplate
