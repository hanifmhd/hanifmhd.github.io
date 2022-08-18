/* eslint-disable react/react-in-jsx-scope */
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import { useProfile } from '../../hooks/useRefreshToken'
import classnames from 'classnames'
import Loader from '../../assets/icon/Loading.png'
import { loadFromLocalStorage } from '../../utils/local-storage-helper'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { auth, persist } = useAuth()
  const refresh = useProfile()
  useEffect(() => {
    const verifyRefreshProfile = async () => {
      try {
        await refresh()
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.fullname && loadFromLocalStorage('auth_token') ? verifyRefreshProfile() : setIsLoading(false)
  }, [])

  return (
        <>
            {!persist
              ? <Outlet />
              : isLoading
                ? (
                  <div className={classnames('fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center flex-col')}>
                    <img src={Loader} className={classnames('motion-safe:animate-spin 5s w-[50px] mt-[3px] text-slate-700')} alt="loader"/>
                    <p className={classnames('text-slate-400 mt-2')}>Loading...</p>
                  </div>
                  )
                : <Outlet />
            }
        </>
  )
}
export default PersistLogin
