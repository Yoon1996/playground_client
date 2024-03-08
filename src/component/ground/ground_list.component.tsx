import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { gymListAtom, gymListLengthAtom } from '../../atom/gym.atom';
import PaginationComponent from '../pagination.component';
import GroundComponent from './ground_component';

const GroundListComponent = () => {
    const gymList = useRecoilValue(gymListAtom);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage, setPostsPerPage] = useState<number>(12);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const [limit, setLimit] = useState<number>(5);
    // const currentPosts = (posts: string[]) => posts.slice(indexOfFirst, indexOfLast);
    const gymLength = useRecoilValue(gymListLengthAtom);
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
                paginate={setCurrentPage}
                page={currentPage}
                totalPostsLength={gymLength}
                limit={limit}
            ></PaginationComponent>
        </>
    );
};

export default GroundListComponent;
