import React from 'react'
import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'

function PublicRoute ({ element: Component }) {
  const token = localStorage.getItem('token')
  const location = useLocation()
  const redirect =
    location?.pathname === '/admin/login' ? location?.pathname : '/norms-management'
  if (token) return <Navigate to={redirect} replace />
  return Component
}

PublicRoute.propTypes = {
  element: PropTypes.element.isRequired
}
export default PublicRoute
