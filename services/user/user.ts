import { API_URL } from "pages/utils/Utils"
import { HTTP_METHOD } from "@enums/HTTP"
import APIClient from "@services/request/APIClient"

export const submitLogin = async (
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
