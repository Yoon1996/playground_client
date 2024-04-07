import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import HeaderComponent from '../component/header.component';
import { showDetailGym } from '../service/gym.service';
import NaverMapsComponent from '../component/naver_maps.component';
import ButtonComponent from '../component/button.component';

const MainDetailPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const gymId = searchParams.get('id');
    const [data, setData] = useState({
        size: '',
        address: '',
        facilities: '',
        name: '',
        parkingInfo: '',
        phoneNumber: '',
        price: '',
        region: '',
        sportsType: '',
        homepage: '',
        operatingTimeDay: '',
    });
    const imageUrl = `../public/image/${data.sportsType}.jpg`;
    const [isFixed, setIsFixed] = useState<boolean>(false);
    const handleScroll = () => {
        const targetDiv = document.getElementById('fixedDiv');
        const divTop = targetDiv?.getBoundingClientRect().top;

        if (divTop != undefined) {
            if (divTop < window.innerHeight) {
                setIsFixed(true);
            } else if (divTop > window.innerHeight) {
                setIsFixed(false);
            }
        }
    };

    const showHandler = () => {
        showDetailGym(Number(gymId))
            .then((res) => {
                console.log('res: ', res);
                setData(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };

    useEffect(() => {
        showHandler();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [imageUrl]);
    return (
        <>
            <HeaderComponent></HeaderComponent>
            <div className="w-full h-full flex flex-col gap-10">
                <div className="w-full">
                    <img className="w-full h-96 object-cover rounded-md" src={imageUrl} alt="" />
                </div>
                <div className="w-full flex gap-3">
                    <div className="flex flex-col gap-10 w-full">
                        <div className="flex flex-col gap-3">
                            <div className="text-20 font-bold">체육시설 정보</div>
                            <div className="flex flex-col w-full gap-1">
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6 bg-primary-e3 py-2 px-2">크기</div>
                                    <div className="flex items-center">{data.size}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6 bg-primary-e3 py-2 px-2">이용 시간</div>
                                    <div className="flex items-center">{data.operatingTimeDay}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6 bg-primary-e3 py-2 px-2">주차</div>
                                    <div className="flex items-center">{data.parkingInfo}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6  bg-primary-e3 py-2 px-2">전화번호</div>
                                    <div className="flex items-center">{data.phoneNumber}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6  bg-primary-e3 py-2 px-2">분류</div>
                                    <div className="flex items-center">{data.sportsType}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6  bg-primary-e3 py-2 px-2">편의 시설</div>
                                    <div className="flex items-center">{data.facilities}</div>
                                </div>
                                <div className="flex gap-3 border-2 border-solid border-primary-e3">
                                    <div className="font-bold w-1/6  bg-primary-e3 py-2 px-2">홈페이지</div>
                                    <Link className="flex items-center" to={data.homepage}>
                                        {data.homepage}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="text-20 font-bold">체육시설 위치</div>
                            <div className="w-auto h-96">
                                {data.address.length === 0 ? (
                                    <div>...로딩중</div>
                                ) : (
                                    <NaverMapsComponent address={data.address}></NaverMapsComponent>
                                )}
                            </div>
                            <div className="flex gap-2 items-center">
                                <div>
                                    <img src="../public/icon/marker.png" alt="" />
                                </div>
                                <div>{data.address}</div>
                            </div>
                        </div>
                    </div>
                    <div className={`w-80 flex flex-col`}>
                        <div
                            id="fixedDiv"
                            className={`w-80 border-2 border-solid border-primary-e3 rounded-lg py-3 px-3 flex flex-col gap-3 ${
                                isFixed ? 'sticky top-10' : ''
                            }`}
                        >
                            <div className="font-semibold text-20">{data.name}</div>
                            <div>{data.address}</div>
                            <div>
                                {data.price}
                                <span className="text-primary-a6">원/시간당</span>
                            </div>
                            <div className="flex justify-center items-center">
                                <ButtonComponent
                                    ment="예약하기"
                                    click={() => navigate({ pathname: '/gyms_reserve', search: `id=${gymId}` })}
                                ></ButtonComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-96"></div>
        </>
    );
};

export default MainDetailPage;
