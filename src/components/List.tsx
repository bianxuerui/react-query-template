import { Fragment } from "react";
import { useLoadMoreProductList } from "../hooks/api";

const CustomList = () => {
    const { data: list, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useLoadMoreProductList({ page: 1, pageSize: 5 });

    return (
        <>
            {
                list?.pages?.map((page: any) => (
                    <Fragment key={page.nextId || 0}>
                        {page.map((item: any) => <div key={item.id}>{item.name}</div>)}
                    </Fragment>
                ))
            }
        </>
    )
}

export default CustomList;
