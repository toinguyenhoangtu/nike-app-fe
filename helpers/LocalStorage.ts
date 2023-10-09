import { LocalStorageKey } from "../enums/LocalStorage"

export const setAccessToken = (accessToken: string) => {
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken)
  }
}

export const setRefreshToken = (refreshToken: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken)
  }
}

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LocalStorageKey.ACCESS_TOKEN) || ""
  }
  return ""
}

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LocalStorageKey.REFRESH_TOKEN) || ""
  }
  return ""
}

export const clearAccessToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
  }
}

export const clearAllToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN)
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
    //handle for PHP app
    localStorage.removeItem("customerId")
    localStorage.removeItem("customerPhone")
  }
}
