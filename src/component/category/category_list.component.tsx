import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { gymListAtom } from '../../atom/gym.atom';
import CategoryButtonComponent from './category_button.component';
import { IGymModel } from '../../interface/gym.interface';

const CategoryListComponent = () => {
    const gymList = useRecoilValue(gymListAtom);
    const regionList = gymList.map((type: IGymModel) => type.region);
    const sportsTypeList = gymList.map((type: IGymModel) => type.sportsType);
    // const priceList = gymList.map((type) => type.price);
    // const sizeList = gymList.map((type) => type.size);
    const parkingList = ['가능', '불가'];

    //배열 중복 제거해주는 list 함수
    const setList = (list: string[]) => {
        return [...new Set(list)].sort();
    };
    useEffect(() => {
        // console.log('allList: ', allList.name);
    }, []);
    const categories = [
        { name: '모든지역', menu: setList(regionList) },
        { name: '운동종목', menu: setList(sportsTypeList) },
        // { name: '가격', menu: setList(priceList) },
        // { name: '구장 크기', menu: setList(sizeList) },
        { name: '주차', menu: parkingList },
    ];
    return (
        <>
            <div className="flex gap-2 max-h-11 z-50">
                <div className="text-primary-45 border-solid border-2 border-primary-a6 rounded-lg flex items-center px-3 py-2 cursor-pointer">
                    <img src="../public/icon/map.svg" alt="" />
                </div>
                {categories.map((category, index) => (
                    <CategoryButtonComponent
                        onClick={() => {}}
                        dropwdownItems={category.menu}
                        key={index}
                        category={category.name}
                    ></CategoryButtonComponent>
                ))}
            </div>
        </>
    );
};

export default CategoryListComponent;
