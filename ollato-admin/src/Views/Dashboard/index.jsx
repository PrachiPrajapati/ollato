import React from 'react'
import { useNavigate } from 'react-router-dom'

const Index = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('url')
    navigate('/')
  }
  return (
       <>
         <p>Dashboard Page</p>
         <button onClick={handleLogout}>Logout</button>
       </>
  )
}

export default Index
