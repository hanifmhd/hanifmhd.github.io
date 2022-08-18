/* eslint-disable no-unused-vars */
// import axios from 'axios'
import axios from '../services/api'
import { PLATFORM_LANG, PLATFORM_NAME } from '../services/helpers'
import { clearLocalStorage, loadFromLocalStorage, saveToLocalStorage } from '../utils/local-storage-helper'
import { decrypt } from '../utils/crypt'
import useAuth from './useAuth'
import { DETAIL_PROFILE } from '../constants/serviceURL'
import useAxiosPrivate from './useAxiosPrivate'
import useLogout from './useLogout'

export const useRefreshToken = () => {
  const { setAuth } = useAuth()
  const refresh = async () => {
    const response = await axios.post('/v1/refresh', {
      phone_no: decrypt(loadFromLocalStorage('phone_no') ? loadFromLocalStorage('phone_no') : '')
    }, {
      headers: {
        'x-refresh-token': loadFromLocalStorage('refresh_token'),
        'x-platform-name': PLATFORM_NAME,
        'x-platform-lang': PLATFORM_LANG
      }
    })
    const encryptToken = response.data.data.token
    saveToLocalStorage('auth_token', encryptToken)
    setAuth(prev => {
      return {
        ...prev,
        accessToken: response.data.data.token
      }
    })
    return response.data.data.token
  }
  return refresh
}
export const useProfile = () => {
  const { setAuth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const logout = useLogout()
  const refreshProfile = async () => {
    try {
      const response = await axiosPrivate.get(`${process.env.REACT_APP_SERVICE_URL}${DETAIL_PROFILE}`, {
        headers: {
          'x-platform-name': PLATFORM_NAME,
          'x-platform-lang': PLATFORM_LANG,
          'content-type': 'application/json',
          Authorization: loadFromLocalStorage('auth_token') ? loadFromLocalStorage('auth_token') : ''
        }
      })
      setAuth(prev => {
        return {
          ...prev,
          accessToken: loadFromLocalStorage('auth_token'),
          fullname: response.data.data.fullname,
          profile_picture: response.data.data.profile_picture,
          role_id: response.data.data.current_role.id,
          role_name: response.data.data.current_role.code,
          phone_no: response.data.data.phone_no
        }
      })
      return response.data
    } catch (error) {
      console.log('Error : ', error)
      if (error.response.status === 412 || error.response.status === 403) {
        setAuth({})
        clearLocalStorage('persist')
        clearLocalStorage('user')
        clearLocalStorage('auth_token')
        clearLocalStorage('refresh_token')
        clearLocalStorage('phone_no')
        clearLocalStorage('expire')
        logout()
      }
    }
  }
  return refreshProfile
}
