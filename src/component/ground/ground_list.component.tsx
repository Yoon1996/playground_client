import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { gymListAtom, gymListLengthAtom } from '../../atom/gym.atom';
import PaginationComponent from '../pagination.component';
import GroundComponent from './ground_component';
import { useNavigate } from 'react-router-dom';

const GroundListComponent = () => {
    const gymList = useRecoilValue(gymListAtom);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [postsPerPage, setPostsPerPage] = useState<number>(12);
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    const [limit, setLimit] = useState<number>(5);
    // const currentPosts = (posts: string[]) => posts.slice(indexOfFirst, indexOfLast);
    const gymLength = useRecoilValue(gymListLengthAtom);
    const navigate = useNavigate();

    const goDetailPage = (id: number) => {
        navigate(`/gyms_detail?id=${id}`);
    };
    return (
        <>
            <div className="flex  gap-4 justify-start flex-wrap">
                {gymList.map((gym: any) => (
                    <GroundComponent
                        key={gym.id}
                        gymId={gym.id}
                        name={gym.name}
                        sportsType={gym.sportsType}
                        size={gym.size}
                        parking={gym.parkingInfo}
                        time={gym.operatingTimeDay}
                        goDetailPage={goDetailPage}
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
