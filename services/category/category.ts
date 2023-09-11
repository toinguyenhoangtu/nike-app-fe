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

