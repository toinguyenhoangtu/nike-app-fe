import { STRAPI_API_TOKEN, API_URL } from "../utils/util";
import { HTTP_METHOD, HTTP_STATUS } from "../../enums/HTTP";

export const fetchDataFromApi = async (enpoint: string) => {
    const options = {
        method: HTTP_METHOD.GET,
        headers: {
            Authorization: 'Bearer ' + STRAPI_API_TOKEN
        }
    };
    const res = await fetch(`${API_URL}${enpoint}`, options);
    const data = await res.json();
    return data;
}
