import { Fragment, useEffect } from "react";
import { useLoadMoreProductList } from "../hooks/api";

const CustomList = () => {
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useLoadMoreProductList({ page: 1, pageSize: 5 });

    return (
        <>
            {
                data?.pages?.map((page: any) => (
                    <Fragment key={page.id || 0}>
                        {page?.data?.map((item: any) => <div key={item.id}>{item.name}</div>)}
                    </Fragment>
                ))
            }
            {
                hasNextPage && <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                    {
                        isFetchingNextPage ? '已全部加载' : '加载更多'
                    }
                </button>
            }
        </>
    )
}

export default CustomList;
