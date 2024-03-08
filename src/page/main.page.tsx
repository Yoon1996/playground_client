import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gymListAtom, gymListLengthAtom } from '../atom/gym.atom';
import CategoryListComponent from '../component/category/category_list.component';
import GroundListComponent from '../component/ground/ground_list.component';
import HeaderComponent from '../component/header.component';
import { getGymsLength, showPageGymList } from '../service/gym.service';

const MainPage = () => {
    const setGymList = useSetRecoilState(gymListAtom);
    const setGymListLength = useSetRecoilState(gymListLengthAtom);
    const [searchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));

    const getGymsLengthF = () => {
        getGymsLength()
            .then((res) => {
                console.log('res: ', res);
                setGymListLength(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    const paginateF = (pageNum: number) => {
        showPageGymList(pageNum)
            .then((res) => {
                console.log('res: ', res);
                setGymList(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    useEffect(() => {
        if (page === 0) {
            paginateF(1);
            getGymsLengthF();
        } else {
            paginateF(page);
            getGymsLengthF();
        }
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
