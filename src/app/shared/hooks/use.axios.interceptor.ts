import { useEffect } from "react"
import { useAuth } from "../contexts/auth.context"
import { ApiConfig } from "@/app/core/api/api.config"

export const useAxiosInterceptor = () => {
  const { token, logout } = useAuth()

  useEffect(() => {
    const requestInterceptor = ApiConfig.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      }
    )

    const responseInterceptor = ApiConfig.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout()
        }
        return Promise.reject(error)
      }
    )

    return () => {
      ApiConfig.interceptors.request.eject(requestInterceptor)
      ApiConfig.interceptors.response.eject(responseInterceptor)
    }
  }, [token, logout])
}