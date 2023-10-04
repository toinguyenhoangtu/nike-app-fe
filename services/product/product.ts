import { API_URL } from "pages/utils/util"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"
import { NKResponse } from "types/product"
import useSWR from "swr"
// import { Product } from "types/product"

export const getAllProduct = async () => {
    return APIClient<NKResponse.CMS.Product>(
        `${API_URL}/api/products?populate=*`,
        HTTP_METHOD.GET
    )
}

export const ProductFilter =  (slug: string, pageIndex?: number, maxResult?: number, option?: any) => {
    const { data: response, error, isLoading } = useSWR<NKResponse.CMS.Product>(
        `${API_URL}/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        APIClient,
        {
            fallbackData: option,
        }
    );

    return { response, error, isLoading };
}

export const ProductFilterPage = (slug: string, maxResult: number) => {
    return APIClient<NKResponse.CMS.Product>(
        `${API_URL}/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`,
        HTTP_METHOD.GET
    )
}

export const fetchProductEqual = (slug: string) => {
    return APIClient<NKResponse.CMS.Product>(
        `${API_URL}/api/products?populate=*&filters[slug][$eq]=${slug}`,
        HTTP_METHOD.GET
    )
}

export const fetchProductNotEqual = (slug: string) => {
    return APIClient<NKResponse.CMS.Product>(
        `${API_URL}/api/products?populate=*&filters[slug][$ne]=${slug}`,
        HTTP_METHOD.GET
    )
}


