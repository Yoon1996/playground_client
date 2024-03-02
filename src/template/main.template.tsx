import { Outlet } from 'react-router-dom'
import CategoryModal from '../component/category/category_modal'

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
