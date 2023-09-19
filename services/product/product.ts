import { API_URL } from "pages/utils/util"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"
import { Product } from "types/product"
import useSWR from "swr"
// import { Product } from "types/product"

export const getAllProduct = async () => {
    return APIClient<Product>(
        `${API_URL}/api/products?populate=*`,
        HTTP_METHOD.GET
    )
}

export const useProductFilter = (slug: string, pageIndex?: number, maxResult?: number, option?: any) => {
    const { data: response, error, isLoading } = useSWR<Product>(
        `${API_URL}/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        APIClient,
        {
            fallbackData: option,
        }
    );

    return { response, error, isLoading };
}

export const useProductFilterPage = (slug: string, maxResult: number) =>{
    return APIClient<Product>(
        `${API_URL}/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`,
        HTTP_METHOD.GET
    )
}


