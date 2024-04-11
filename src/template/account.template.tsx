import { Outlet } from 'react-router-dom';
import HeaderComponent from '../component/header.component';

const AccountTemplate = () => {
    return (
        <>
            <div className="max-w-screen h-screen flex justify-center items-center">
                <Outlet></Outlet>
            </div>
        </>
    );
};

export default AccountTemplate;
