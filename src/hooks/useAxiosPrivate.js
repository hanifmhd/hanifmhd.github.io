/* eslint-disable no-mixed-operators */
import { axiosPrivate } from '../services/api'
import { useEffect } from 'react'
import useRefreshToken from './useRefreshToken'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'
import { loadFromLocalStorage } from '../utils/local-storage-helper'

const useAxiosPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers.Authorization) {
          config.headers.Authorization = loadFromLocalStorage('auth_token')
        }
        return config
      }, (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent || error?.response?.status === 401) {
          prevRequest.sent = true
          const jwtExpired = localStorage.getItem('expire')
          const expiryDate = (Date.now() + (jwtExpired * 1000))
          if (expiryDate < Date.now()) {
            const newAccessToken = await refresh()
            prevRequest.headers.Authorization = newAccessToken
            return axiosPrivate(prevRequest)
          } else {
            navigate('/login', { replace: true })
          }
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
