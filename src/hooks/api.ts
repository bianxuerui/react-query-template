import { useFetch } from "../utils/reactQuery"

export const useGetList = (params: any) => {
    const context = useFetch<any>(
        'http://127.0.0.1:8080/product/list',
        params,
        {
            retry: false // 禁止重试
        }
    )

    return context;
}