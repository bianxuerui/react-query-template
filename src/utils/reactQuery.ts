import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
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

export const fetcher = <T>({
    queryKey,
    pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params, type] = queryKey;
    const method = type.toLowerCase();

    if (method === 'get') {
        return request.get(url!, { params: { ...params, pageParam } })
            .then((res: { data: T }) => res.data);
    } else if (method === 'post') {
        return request.post(url!, { ...params, pageParam })
            .then((res: { data: T }) => res.data);
    } else {
        throw new Error(`不支持的 HTTP 方法: ${method}`);
    }
};

export const useLoadMore = <T>(url: string | null, params?: object) => {
    const context = useInfiniteQuery<
        GetInfinitePagesInterface<T>,
        Error,
        GetInfinitePagesInterface<T>,
        QueryKeyT
    >(
        [url!, params, 'get'],
        ({ queryKey, pageParam, meta }) => fetcher({ queryKey, pageParam, meta }),
        {
            getPreviousPageParam: (firstPage) => firstPage ? firstPage.page - 1 : false,
            getNextPageParam: (lastPage) => lastPage.page < lastPage.totalPages ? lastPage.page + 1 : false,
        }
    );
    return context;
}

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
