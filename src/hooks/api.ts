import { useFetch, useLoadMore } from "../utils/reactQuery"

export const useGetList = (params: any) => {
    const context = useFetch<any>(
        'http://127.0.0.1:8080/product/list',
        params,
        'get',
        {
            retry: true // 是否允许重试
        }
    )
    return { ...context, data: context };
}

export const useLogin = (params: any) => {
    const context = useFetch<any>(
        'http://127.0.0.1:8080/product/login',
        params,
        'post',
        {
            retry: false,
            enabled: false,
        }
    )
    return { ...context, data: context };
}

export const useLoadMoreProductList = (params: any) => {
    return useLoadMore('http://127.0.0.1:8080/product/list', params);
}

