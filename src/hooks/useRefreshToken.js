import axios from '../services/api'
import { PLATFORM_LANG, PLATFORM_NAME } from '../services/helpers'
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/local-storage-helper'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const { setAuth } = useAuth()
  const refresh = async () => {
    const response = await axios.post('/v1/refresh', {
      phone_no: loadFromLocalStorage('phone_no')
    }, {
      headers: {
        'x-refresh-token': loadFromLocalStorage('refresh_token'),
        'x-platform-name': PLATFORM_NAME,
        'x-platform-lang': PLATFORM_LANG
      }
    })
    saveToLocalStorage('auth_token', response.data.data.token)
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

export default useRefreshToken
