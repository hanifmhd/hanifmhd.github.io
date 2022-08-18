import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import PropTypes from 'prop-types'

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth()
  const location = useLocation()
  const [role] = React.useState(auth?.role_id)
  const myarr = allowedRoles

  return (
    myarr.indexOf(role) > -1
      ? <Outlet/>
      : auth?.fullname
        ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
        : <Navigate to="/login" state={{ from: location }} replace/>
  )
}

RequiredAuth.propTypes = {
  allowedRoles: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ])
}

export default RequiredAuth
