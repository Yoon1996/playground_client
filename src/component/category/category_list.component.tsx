import { useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gymListAtom, gymListLengthAtom } from '../../atom/gym.atom';
import { showCategoryList } from '../../service/category.service';
import { showPageGymList } from '../../service/gym.service';
import CategoryButtonComponent from './category_button.component';
import MapModalComponent from '../modal/map_modal.component';

const CategoryListComponent = () => {
    const [regionList, setRegionList] = useState([]);
    const [sportsTypeList, setSportsTypeList] = useState([]);
    const parkingList = ['가능', '불가'];
    const [searchParams, setSearchParams] = useSearchParams();
    const [regionName, setRegionName] = useState('모든지역');
    const [sportsTypeName, setSportsTypeName] = useState('운동종목');
    const [parkingName, setParkingName] = useState('주차');
    const setGymList = useSetRecoilState(gymListAtom);
    const setGymLength = useSetRecoilState(gymListLengthAtom);

    //searchParams 의 key, value 값을 가져오기 위한 함수
    const params: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    //새로고침시 url 에 초기값 지정
    const [filterParams, setFilterParams] = useState(params);

    //map 모달 불러오는 함수
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (filterParams.region) {
            setRegionName(filterParams.region);
        }
        if (filterParams.sportsType) {
            setSportsTypeName(filterParams.sportsType);
        }
        if (filterParams.parkingInfo) {
            setParkingName(filterParams.parkingInfo);
        }
        showCategoryList()
            .then((res) => {
                // console.log('res: ', res);
                setRegionList(res.data.region);
                setSportsTypeList(res.data.sportsType);
                navigate({
                    pathname: '/gyms',
                    search: `?${createSearchParams(filterParams)}`,
                });
                filterParams.page = '1';
                showPageGymList(filterParams)
                    .then((res) => {
                        console.log('res: ', res);
                        setGymList(res.data.list);
                        setGymLength(res.data.length);
                    })
                    .catch((err) => {
                        console.log('err: ', err);
                    });
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    }, [filterParams]);
    const categories = [
        { name: `${regionName}`, menu: regionList },
        { name: `${sportsTypeName}`, menu: sportsTypeList },
        { name: `${parkingName}`, menu: parkingList },
    ];

    const updateFilters = (mode: string, item: string) => {
        if (mode === `${regionName}`) {
            setRegionName(item);
            setFilterParams({ ...filterParams, region: item });
        } else if (mode === `${sportsTypeName}`) {
            setSportsTypeName(item);
            setFilterParams({ ...filterParams, sportsType: item });
        } else if (mode === `${parkingName}`) {
            setParkingName(item);
            setFilterParams({ ...filterParams, parkingInfo: item });
        }
    };
    return (
        <>
            <div className="flex gap-2 max-h-11">
                <div
                    onClick={openModal}
                    className="text-primary-45 border-solid border-2 border-primary-a6 rounded-lg flex items-center px-3 py-2 cursor-pointer"
                >
                    <img src="/icon/map.svg" alt="" />
                </div>
                {categories.map((category, index) => (
                    <CategoryButtonComponent
                        dropwdownItems={category.menu}
                        key={index}
                        category={category.name}
                        updateFilters={updateFilters}
                        filterMode={categories[index].name}
                    ></CategoryButtonComponent>
                ))}
                <div
                    className="text-primary-45 border-solid border-2 border-primary-a6 px-3 py-2 cursor-pointer rounded-lg flex items-center gap-2 max-h-11"
                    onClick={() => navigate('/')}
                >
                    필터 초기화
                </div>
            </div>
            <div>
                <MapModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}></MapModalComponent>
            </div>
        </>
    );
};

export default CategoryListComponent;
