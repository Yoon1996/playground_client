import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gymListAtom } from '../atom/gym.atom';
import CategoryListComponent from '../component/category/category_list.component';
import GroundListComponent from '../component/ground/ground_list.component';
import HeaderComponent from '../component/header.component';
import { showPageGymList } from '../service/gym.service';

const MainPage = () => {
    const setGymList = useSetRecoilState(gymListAtom);
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page');

    useEffect(() => {
        showPageGymList(page)
            .then((res) => {
                console.log('res: ', res);
                setGymList(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    }, []);

    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="flex gap-4 flex-col">
                <CategoryListComponent></CategoryListComponent>
                <GroundListComponent></GroundListComponent>
            </div>
        </>
    );
};

export default MainPage;
