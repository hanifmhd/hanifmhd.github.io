/* eslint-disable react/react-in-jsx-scope */
import { useLocation, Navigate, Outlet } from 'react-router-dom'
// import useAuth from '../../hooks/useAuth'
import { loadFromLocalStorage } from '../../utils/local-storage-helper'

const RequiredAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth()
  const location = useLocation()
  const user = loadFromLocalStorage('user')
  const checkRole = () => {
    const myarr = allowedRoles
    const arraycontainsturtles = (myarr.indexOf(user?.role_id) > -1)
    if (arraycontainsturtles) {
      return <Outlet/>
    } else {
      // if(auth?.user){
      if (user?.fullname) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace/>
      } else {
        return <Navigate to="/login" state={{ from: location }} replace/>
      }
    }
  }

  return checkRole()
}

export default RequiredAuth
