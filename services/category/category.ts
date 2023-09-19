import { API_URL } from "pages/utils/util"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"
import { CategoryData } from "types/categories"


export const getAllCategories = async () => {
    return APIClient<CategoryData>(
        `${API_URL}/api/categories?populate=*`,
        HTTP_METHOD.GET
    )
}

// pagination
export const fetchDataPagination = async (
    slug: string, maxResult?: number
) => {
    return APIClient<any>(
        `${API_URL}/api/products?populate=*&[filters][categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
        , HTTP_METHOD.GET
    )
}

export const filterCategory = async (
    slug: string
) => {
    return APIClient<CategoryData>(
        `${API_URL}/api/categories?filters[slug][$eq]=${slug}`,
        HTTP_METHOD.GET
    )
}
