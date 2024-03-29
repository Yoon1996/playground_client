import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { gymListAtom, pageAtom } from '../atom/gym.atom';
import { IFilterModel } from '../interface/filter.interface';
import { showPageGymList } from '../service/gym.service';

interface paginationProps {
    postsPerPage: number; // 페이지당 보여질 갯수
    paginate: (num: number) => void;
    totalPostsLength: number; //전체 리스트 개수
    page: number; // 현재 페이지
    limit: number; // 보여질 페이지네이션
}

const PaginationComponent = ({ postsPerPage, paginate, limit, totalPostsLength, page }: paginationProps) => {
    const setGymList = useSetRecoilState(gymListAtom);
    const setCurrentPage = useSetRecoilState(pageAtom);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams({});
    const currentPage = Number(searchParams.get('page'));
    const search = searchParams.get('search');
    const numPages = Math.ceil(totalPostsLength / postsPerPage);
    const basePage = Math.floor((currentPage - 1) / limit);
    let start = page - (page % limit) + 1;
    let end = page - (page % limit) + 5;

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
        const params: IFilterModel = {
            page: String(page),
        };
        if (search) params.search = search;
        navigate({
            pathname: '/gyms',
            search: `?${createSearchParams(params)}`,
        });
        showPageGymList(params)
            .then((res) => {
                console.log('res: ', res);
                setGymList(res.data.list);
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
                        currentPage === 1 || currentPage === 0
                            ? 'hidden'
                            : 'border-2 border-primary-light rounded-md px-2 py-1 bg-primary-light hover:bg-primary-dark hover:border-primary-dark'
                    }
                >
                    이전
                </button>
                {pageList.map((i) => (
                    <button
                        className={
                            currentPage === i || (currentPage === 0 && i === 1)
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
                        if (currentPage === 0) {
                            changePageNumber(currentPage + 2);
                            paginate(currentPage + 2);
                        } else {
                            changePageNumber(currentPage + 1);
                            paginate(currentPage + 1);
                        }
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
