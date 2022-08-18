import React, { useState } from 'react'
import classnames from 'classnames'
import Logo from '../../assets/image/Logo.png'
import CardUserHeader from '../CardUserHeader/CardUserHeader'
import useLogout from '../../hooks/useLogout'
import useAuth from '../../hooks/useAuth'

function Header () {
  const { auth } = useAuth()
  const controller = new AbortController()
  const [profileHeader, setProfileHeader] = useState(
    {
      fullname: '',
      role: '',
      role_id: '',
      profile: ''
    }
  )
  const logout = useLogout()
  //
  // Verify OTP
  React.useEffect(() => {
    if (auth?.fullname) {
      setProfileHeader(
        {
          fullname: auth.fullname,
          role: auth.role_name,
          role_id: auth.role_id,
          profile: auth.profile_picture,
          phone_no: auth.phone_no
        }
      )
    }
    return () => {
      controller.abort()
    }
  }, [auth])

  const signOut = async () => {
    await logout()
  }
  //
  return (
      <div className={classnames('w-full-screen h-[116px] bg-primary flex justify-between p-[40px]')}>
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
