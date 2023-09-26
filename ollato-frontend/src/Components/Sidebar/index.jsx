import React, { useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

/* Icons */
import logoOllato from '../../assets/images/sidebar-icons/logo-ollato.svg'
import dashboard from '../../assets/images/sidebar-icons/dashboard.svg'
import packages from '../../assets/images/sidebar-icons/packages.svg'
import testProcess from '../../assets/images/sidebar-icons/test-process.svg'
// import assesment from '../../assets/images/sidebar-icons/assesment.svg'
// import result from '../../assets/images/sidebar-icons/result.svg'
// import counselling from '../../assets/images/sidebar-icons/Counselling.svg'
import settings from '../../assets/images/sidebar-icons/Settings.svg'
import logout from '../../assets/images/sidebar-icons/logout.svg'
import profile from '../../assets/images/profile.png'
import closebtn from '../../assets/images/close-circle-mobile.svg'

import { logoutAction } from '../../Actions/auth'

function Sidebar (props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const data = useSelector(state => state.auth.isLoggedOut)
  const dataMessage = useSelector(state => state.auth.resMessage)
  const responseStatus = useSelector(state => state.auth.resStatus)
  const previousProps = useRef({ data, dataMessage, responseStatus }).current
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('EmailMobile')
    dispatch(logoutAction(token))
    // navigate('/')
  }
  useEffect(() => {
    if (responseStatus === 401) {
      localStorage.removeItem('token')
      navigate('/')
    }
  }, [responseStatus])
  // Toastify Notification
  useEffect(() => {
    if (previousProps?.data !== data) {
      if (data) {
        enqueueSnackbar(`${dataMessage}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
        navigate('/')
      } else if (data === false) {
        enqueueSnackbar(`${dataMessage}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.data = data
    }
  }, [data])
  // eslint-disable-next-line react/prop-types
  return (
    <>
        <div className="sidebar-box">
            <div className="menu-box">
                <div className="logo-box">
                    <a href="#"><img src={logoOllato} alt="logo" /></a>
                </div>
                <div className="notification-close-box d-flex align-items-center justify-content-between">
                    <button className="profile-box">
                        <img src={profile} alt="profile-pic" />
                    </button>
                    <button type='button' className="close-btn"><img src={closebtn} alt="close" /></button>
                </div>
                <ul className="sidebar-menu">
                    <li
                    //   className='active'
                      className={`${props?.location.pathname === '/dashboard' ? 'active' : ''} `}
                      >
                        <NavLink to="/dashboard" className='menu-link'>
                            <div className="icon-box">
                                <img src={dashboard} alt="logo sidebar" />
                            </div>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li className={`${props?.location.pathname?.includes('/package') ? 'active' : ''} `}>
                        <NavLink to="/package" className='menu-link'>
                            <div className='icon-box'>
                              <img src={packages} alt="logo sidebar" />
                            </div>
                            <span>Package</span>
                        </NavLink>
                    </li>
                    <li className={`${props?.location.pathname?.includes('/test-process') ? 'active' : ''} `}>
                        <NavLink to="/test-process" className='menu-link'>
                            <div className="icon-box">
                                <img src={testProcess} alt="logo sidebar" />
                            </div>
                            <span>Test Process</span>
                        </NavLink>
                    </li>
                    {/* <li className={`${props?.location.pathname === '/assessment' ? 'active' : ''} `}>
                        <NavLink to="/assessment" className='menu-link'>
                            <div className="icon-box">
                                <img src={assesment} alt="logo sidebar" />
                            </div>
                            <span>Assessment</span>
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <NavLink to="" className='menu-link'>
                            <div className="icon-box">
                                <img src={result} alt="logo sidebar" />
                            </div>
                            <span>Result</span>
                        </NavLink>
                    </li> */}
                    {/* <li className={`${props?.location.pathname === '/counselling' ? 'active' : ''} `}>
                        <NavLink to="/counselling" className='menu-link'>
                            <div className="icon-box">
                                <img src={counselling} alt="logo sidebar" />
                            </div>
                            <span>Counselling</span>
                        </NavLink>
                    </li> */}
                    <li className={`${props?.location.pathname === '/settings/change-password' ? 'active' : ''} `}>
                        <NavLink to="/settings/change-password" className='menu-link'>
                            <div className="icon-box">
                                <img src={settings} alt="logo sidebar" />
                            </div>
                            <span>Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="logout-btn">
                    <button className="logout menu-link" onClick={handleLogout}>
                        <div className="icon-box">
                            <img src={logout} alt="logo sidebar" />
                        </div>
                        <span>Logout</span>
                    </button>
            </div>
        </div>
    </>
  )
}

export default Sidebar

Sidebar.propTypes = {
  location: PropTypes.string
}
