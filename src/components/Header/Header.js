import React, { useState } from 'react'
import classnames from 'classnames'
import Logo from '../../assets/image/Logo.png'
import CardUserHeader from '../CardUserHeader/CardUserHeader'
import { useSelector } from 'react-redux'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom'
import { loadFromLocalStorage } from '../../utils/local-storage-helper'

function Header () {
  const profileSelector = useSelector(state => state)
  const controller = new AbortController()
  const user = loadFromLocalStorage('user')
  const [profileHeader, setProfileHeader] = useState(
    {
      fullname: '',
      role: '',
      role_id: '',
      profile: ''
    }
  )

  const navigate = useNavigate()
  const logout = useLogout()
  // Verify OTP
  React.useEffect(() => {
    const decryptUser = atob(user.email)
    console.log('Descrypt ', decryptUser)
    if (user) {
      setProfileHeader(
        {
          fullname: user.fullname,
          role: user.role_name,
          role_id: user.role_id,
          profile: user.profile_picture,
          phone_no: user.phone_no
        }
      )
    }
    return () => {
      controller.abort()
    }
  }, [profileSelector?.profile])

  const signOut = async () => {
    await logout()
    navigate('login')
  }
  //
  return (
      <div className={classnames('w-full-screen h-[116px] bg-[#00446A] flex justify-between p-[40px]')}>
            <img src={Logo} className={classnames('w-[250px]')}/>
            <CardUserHeader
            fullname={profileHeader.fullname}
            role={profileHeader.role}
            role_id={profileHeader.role_id}
            icon={profileHeader.profile}
            onClick={() => { signOut() }}
            />

      </div>
  )
}

export default Header
