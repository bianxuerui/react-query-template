import {
    useInfiniteQuery,
    useQuery,
    UseQueryOptions,
} from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';
import request from './request';

type QueryKeyT = [string, object | undefined, string];

interface GetInfinitePagesInterface<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

// react-query请求处理
export const fetcher = <T>({
    queryKey,
    pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params, type] = queryKey;
    const method = type.toLowerCase();

    if (method === 'get') {
        return request.get(url!, { params: { ...params, page: pageParam } })
            .then((res) => res.data);
    } else if (method === 'post') {
        return request.post(url!, { ...params, page: pageParam })
            .then((res) => res.data);
    } else {
        throw new Error(`不支持的 HTTP 方法: ${method}`);
    }
};

// 用于无限加载数据
export const useLoadMore = <T>(url: string | null, params?: object) => {
    const context = useInfiniteQuery<
        GetInfinitePagesInterface<T>,
        Error,
        GetInfinitePagesInterface<T>,
        QueryKeyT
    >(
        [url!, params, 'get'],
        ({ queryKey, pageParam = 1, meta }) => fetcher({ queryKey, pageParam, meta }),
        {
            getPreviousPageParam: (firstPage) => firstPage ? firstPage.page - 1 : false,
            getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : false,
        }
    );

    return context;
}

// 用于普通的数据获取
export const useFetch = <T>(
    url: string | null,
    params?: object,
    type: string = 'get',
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const context = useQuery<T, Error, T, QueryKeyT>(
        [url!, params, type],
        ({ queryKey, meta }) => fetcher({ queryKey, meta }),
        {
            enabled: !!url,
            ...config
        }
    )

    return context;
}
