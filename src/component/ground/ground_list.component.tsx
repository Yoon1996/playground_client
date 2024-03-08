import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gymListAtom, gymListLengthAtom } from '../../atom/gym.atom';
import { showGymList } from '../../service/gym.service';
import PaginationComponent from '../pagination.component';
import GroundComponent from './ground_component';

const GroundListComponent = () => {
    const gymList = useRecoilValue(gymListAtom);
    const allGymListLength = useRecoilValue(gymListLengthAtom);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage, setPostsPerPage] = useState<number>(12);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const [limit, setLimit] = useState<number>(5);
    const setGymListLength = useSetRecoilState(gymListLengthAtom);

    useEffect(() => {
        showGymList()
            .then((res) => {
                console.log('res: ', res);
                setGymListLength(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    }, []);
    // const currentPosts = (posts: string[]) => posts.slice(indexOfFirst, indexOfLast);
    return (
        <>
            <div className="flex  gap-4 justify-start flex-wrap">
                {gymList.map((gym: any) => (
                    <GroundComponent
                        key={gym.id}
                        name={gym.name}
                        sportsType={gym.sportsType}
                        size={gym.size}
                        parking={gym.parkingInfo}
                        time={gym.operatingTimeDay}
                    ></GroundComponent>
                ))}
            </div>
            <PaginationComponent
                postsPerPage={postsPerPage}
                totalPosts={allGymListLength}
                paginate={setCurrentPage}
                page={currentPage}
                limit={limit}
            ></PaginationComponent>
        </>
    );
};

export default GroundListComponent;
