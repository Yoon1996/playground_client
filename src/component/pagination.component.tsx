import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gymListAtom, pageAtom } from '../atom/gym.atom';
import { showPageGymList } from '../service/gym.service';
import { homedir } from 'os';

interface paginationProps {
    postsPerPage: number; // 페이지당 보여질 갯수
    totalPosts: number; // 전체 게시물
    paginate: (num: number) => void;
    page: number; // 현재 페이지
    limit: number; // 보여질 페이지네이션
}

const PaginationComponent = ({ postsPerPage, totalPosts, paginate, page, limit }: paginationProps) => {
    const setGymList = useSetRecoilState(gymListAtom);
    const setCurrentPage = useSetRecoilState(pageAtom);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page'));
    const numPages = Math.ceil(totalPosts / postsPerPage);
    const basePage = Math.floor((currentPage - 1) / limit);
    let start = basePage * limit + 1;
    let end = start + limit;
    if (end > numPages) {
        end = numPages;
    }
    if (start <= 1) {
        start = 1;
    }
    const pageList = [];
    for (let i = start; i <= end; i++) {
        pageList.push(i);
    }

    const changePageNumber = (page: number) => {
        setCurrentPage(page);
        navigate({
            pathname: '/gyms',
            search: `?page=${page}`,
        });
        showPageGymList(page)
            .then((res) => {
                console.log('res: ', res);
                setGymList(res.data);
            })
            .catch((err) => {
                console.log('err: ', err);
            });
    };
    return (
        <>
            <div className="flex justify-center items-center gap-8 h-6">
                <button
                    onClick={() => {
                        changePageNumber(currentPage - 1);
                        paginate(currentPage - 1);
                    }}
                    className={
                        currentPage === 1
                            ? 'hidden'
                            : 'border-2 border-primary-light rounded-md px-2 py-1 bg-primary-light hover:bg-primary-dark hover:border-primary-dark'
                    }
                >
                    이전
                </button>
                {pageList.map((i) => (
                    <button
                        className={
                            currentPage === i
                                ? 'flex justify-center items-center w-6 h-full border-2 rounded-3xl border-primary-dark bg-primary-dark text-white font-bold'
                                : 'flex justify-center items-center w-6 h-full'
                        }
                        key={i}
                        onClick={() => {
                            changePageNumber(i);
                        }}
                        aria-current={currentPage === i + 1 ? 'page' : undefined}
                    >
                        {i}
                    </button>
                ))}
                <button
                    onClick={() => {
                        changePageNumber(currentPage + 1);
                        paginate(currentPage + 1);
                    }}
                    // disabled={currentPage === numPages}
                    className={
                        currentPage === numPages
                            ? 'hidden'
                            : 'border-2 border-primary-light rounded-md px-2 py-1 bg-primary-light hover:bg-primary-dark hover:border-primary-dark'
                    }
                >
                    다음
                </button>
            </div>
        </>
    );
};

export default PaginationComponent;
