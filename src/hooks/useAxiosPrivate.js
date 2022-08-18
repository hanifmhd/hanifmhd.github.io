import { axiosPrivate } from '../services/api'
import { useEffect } from 'react'
import { useRefreshToken } from './useRefreshToken'
import useAuth from './useAuth'
import { clearLocalStorage, loadFromLocalStorage } from '../utils/local-storage-helper'
import useLogout from './useLogout'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          const decryptToken = loadFromLocalStorage('auth_token')
          config.headers.Authorization = decryptToken
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const logout = useLogout()
        const prevRequest = error?.config
        if (error?.response?.status === 417 || error?.response?.data?.meta?.code === '8206') {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.headers.Authorization = newAccessToken
          return axiosPrivate(prevRequest)
        } else if (error?.response?.status === 412 || error?.response?.status === 403) {
          clearLocalStorage('persist')
          clearLocalStorage('user')
          clearLocalStorage('auth_token')
          clearLocalStorage('refresh_token')
          clearLocalStorage('phone_no')
          logout()
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept)
      axiosPrivate.interceptors.response.eject(responseIntercept)
    }
  }, [auth, refresh])
  return axiosPrivate
}

export default useAxiosPrivate
