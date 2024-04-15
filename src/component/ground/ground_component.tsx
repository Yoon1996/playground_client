import { useEffect } from 'react';

interface groundComponentProps {
    name: string;
    sportsType: string;
    size: string;
    time: string;
    parking: string;
    gymId: number;
    goDetailPage: (id: number) => void;
}

const GroundComponent = ({ name, sportsType, size, time, parking, goDetailPage, gymId }: groundComponentProps) => {
    const imageUrl = `../public/image/${sportsType}.jpg`;
    useEffect(() => {}, [imageUrl]);
    return (
        <>
            {/* {gymList.map((gym, index:number) =>  */}
            <div
                className="w-60 h-80 flex flex-col justify-between shadow-xl border-2 rounded-md p-3 cursor-pointer"
                onClick={() => goDetailPage(gymId)}
            >
                <div className="w-full h-32">
                    <img className="w-full h-32" src={imageUrl} alt="" />
                </div>
                <div className="flex gap-1 justify-between items-center">
                    <div>{name}</div>
                </div>
                {/* <div className="flex justify-end gap-1"> */}
                {/* <div className="flex items-center">
                        <div>
                            <img src="../public/icon/star-f.png" alt="" />
                        </div>
                        <div>5.0</div>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <img src="../public/icon/heart.png" alt="" />
                        </div>
                        <div>210</div>
                    </div> */}
                {/* </div> */}
                <div className="flex flex-col justify-center text-primary-45 text-13 gap-1">
                    <div>{sportsType}</div>
                    <div>크기: {size}</div>
                    <div>이용 시간: {time}</div>
                    <div>주차: {parking}</div>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default GroundComponent;
