import axios from '../services/api'
import { PLATFORM_LANG, PLATFORM_NAME } from '../services/helpers'
import { clearLocalStorage } from '../utils/local-storage-helper'
import useAuth from './useAuth'

const useLogout = () => {
  const { auth, setAuth } = useAuth()
  const logout = async () => {
    setAuth({})
    clearLocalStorage('persist')
    clearLocalStorage('user')
    clearLocalStorage('auth_token')
    clearLocalStorage('refresh_token')
    clearLocalStorage('phone_no')
    clearLocalStorage('expire')
    try {
      await axios.post('/v1/sign-out', {}, {
        headers: {
          'Content-Type': 'application/json',
          'x-platform-name': PLATFORM_NAME,
          'x-platform-lang': PLATFORM_LANG,
          Authorization: auth?.accessToken
        }
      })
      clearLocalStorage('redirect')
      location.reload('/login')
    } catch (err) {
      location.reload('/login')
    }
  }
  return logout
}

export default useLogout
