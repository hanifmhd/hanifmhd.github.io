import axios from '../services/api'
import { PLATFORM_LANG, PLATFORM_NAME } from '../services/helpers'
import { clearLocalStorage } from '../utils/local-storage-helper'
import useAuth from './useAuth'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const logout = async () => {
    setAuth({})
    clearLocalStorage('persist')
    clearLocalStorage('user')
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
    } catch (err) {
      navigate('/login', { replace: true })
    }
  }
  return logout
}

export default useLogout
