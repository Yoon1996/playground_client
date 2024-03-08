interface groundComponentProps {
    name: string;
    sportsType: string;
    size: string;
    time: string;
    parking: string;
}

const GroundComponent = ({ name, sportsType, size, time, parking }: groundComponentProps) => {
    return (
        <>
            {/* {gymList.map((gym, index:number) =>  */}
            <div className="w-60 h-80 flex flex-col justify-between">
                <div>
                    <img className="w-full" src="../public/icon/sample.png" alt="" />
                </div>
                <div className="flex gap-1 justify-between items-center">
                    <div>{name}</div>
                    <div className="flex gap-1">
                        <div className="flex items-center">
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
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-primary-45 text-13">
                    <div>{sportsType}</div>
                    <div>{size}</div>
                    <div>{time}</div>
                    <div>{parking}</div>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default GroundComponent;
