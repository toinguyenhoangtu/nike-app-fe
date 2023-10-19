import { API_URL } from "pages/utils/Utils"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"

export const submitRegister = async (
    payload: {
        email: string,
        password: string,
        username: string
    }
) => {
    return APIClient<NKResponse.Customers.Customer>(
        `${API_URL}/api/auth/local/register`,
        HTTP_METHOD.POST,
        payload
    )
}

export const submitLogin = async (
    payload: {
        identifier: string,
        password: string,
    }
) => {
    return APIClient<NKResponse.Customers.CustomerRespones>(
        `${API_URL}/api/auth/local`,
        HTTP_METHOD.POST,
        payload
    )
}
