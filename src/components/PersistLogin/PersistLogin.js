/* eslint-disable react/react-in-jsx-scope */
import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from '../../hooks/useAuth'
import { clearLocalStorage } from '../../utils/local-storage-helper'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      const jwtExpired = localStorage.getItem('expire')
      const expiryDate = (Date.now() + (jwtExpired * 1000))
      try {
        if (expiryDate < Date.now()) {
          await refresh()
        }
      } catch (err) {
        clearLocalStorage('user')
        navigate('/login', { replace: true })
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])

  useEffect(() => {
  }, [isLoading])

  return (
        <>
            {!persist
              ? <Outlet />
              : isLoading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
  )
}
export default PersistLogin
