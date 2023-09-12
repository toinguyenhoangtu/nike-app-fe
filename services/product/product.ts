import { API_URL } from "pages/utils/util"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"
import { Product } from "types/product"
// import { Product } from "types/product"

export const getAllProduct = async () => {
    return APIClient<Product>(
        `${API_URL}/api/products?populate=*`,
        HTTP_METHOD.GET
    )
}