
import { HTTP_METHOD } from "@enums/HTTP";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { STRAPI_API_TOKEN } from "pages/utils/Utils";

const instanceAxios = axios.create({
    method: HTTP_METHOD.GET,
    headers: {
        Authorization: 'Bearer ' + STRAPI_API_TOKEN
    }
})

const APIClient = async <T = any,D = any>(
    path: string,
    method: Method,
    data?: any,
    options?: AxiosRequestConfig
) => {
    const reqData =
        method === HTTP_METHOD.GET ? { params: { ...data } } : { data }
    return new Promise<T>((resolve, reject) => {
        instanceAxios(path,
            {
                method,
                ...reqData,
                ...options,
            }
        )
            .then((response: AxiosResponse<T, D>) => {
                const { data } = response
                resolve(data)
            })
            .catch((error: AxiosError<T, D>) => {
                const { response } = error
                reject(response?.data)
            })
    })
}
export {instanceAxios};
export default APIClient;
