import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
    UseQueryOptions,
} from 'react-query';
import { QueryFunctionContext } from 'react-query/types/core/types';
import request from './request';

type QueryKeyT = [string, object | undefined];

export const fetcher = <T>({
    queryKey,
    pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
    const [url, params] = queryKey;
    return request
        .get(url!, { params: { ...params, pageParam } })
        .then((res) => res.data);
};

export const useFetch = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const context = useQuery<T, Error, T, QueryKeyT>(
        [url!, params],
        ({ queryKey, meta }) => fetcher({ queryKey, meta }),
        {
            enabled: !!url,
            ...config
        }
    )

    return context;
}