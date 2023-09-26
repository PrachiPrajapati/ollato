import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'
import logoOllato from '../../assets/images/sidebar-icons/logo-ollato.svg'
import packages from '../../assets/images/sidebar-icons/packages.svg'
// import availability from '../../assets/images/sidebar-icons/Availability.svg'
import result from '../../assets/images/sidebar-icons/result.svg'
import logout from '../../assets/images/sidebar-icons/logout.svg'
import centermanage from '../../assets/images/sidebar-icons/manage-center.svg'
// import dashboard from '../../assets/images/sidebar-icons/dashboard.svg'
// import testProcess from '../../assets/images/sidebar-icons/test-process.svg'
/* import assesment from '../../assets/images/sidebar-icons/assesment.svg' */
import counselling from '../../assets/images/sidebar-icons/Counselling.svg'
import Settings from '../../assets/images/sidebar-icons/Settings.svg'
// import usermanage from '../../assets/images/sidebar-icons/user-manage.svg'
// import leadsmanage from '../../assets/images/sidebar-icons/manage-leads.svg'
// import cmsmanage from '../../assets/images/sidebar-icons/manage-cms.svg'
// import sessionrequest from '../../assets/images/sidebar-icons/session-request.svg'
// import session from '../../assets/images/sidebar-icons/session-couns.svg'
import testmanage from '../../assets/images/sidebar-icons/manage-test.svg'
import boardmanage from '../../assets/images/sidebar-icons/manage-board.svg'
import statesmanage from '../../assets/images/sidebar-icons/manage-states.svg'
import citymanage from '../../assets/images/sidebar-icons/manage-city.svg'
import universitymanage from '../../assets/images/sidebar-icons/manage-university.svg'
/* import sessionrequest from '../../assets/images/sidebar-icons/session-request.svg' */
// import session from '../../assets/images/sidebar-icons/session-couns.svg'
import profile from '../../assets/images/profile.png'
import closebtn from '../../assets/images/close-circle-mobile.svg'
import { NavLink, useNavigate } from 'react-router-dom'

import { logoutAction } from '../../Actions/auth'
function Sidebar () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const data = useSelector((state) => state.auth.isLoggedOut)
  const dataMessage = useSelector((state) => state.auth.resMessage)
  const previousProps = useRef({ data, dataMessage }).current
  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logoutAction(token))
    navigate('/admin/login')
  }
  // Toastify Notification
  useEffect(() => {
    if (previousProps?.data !== data) {
      if (data) {
        enqueueSnackbar(`${dataMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/admin/login')
      } else if (data === false) {
        enqueueSnackbar(`${dataMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.data = data
    }
  }, [data])
  return (
    <>
      <div className='sidebar-box'>
        <div className='menu-box'>
          <div className='logo-box'>
            <a href='#'>
              <img src={logoOllato} alt='logo' />
            </a>
          </div>
          <div className='notification-close-box d-flex align-items-center justify-content-between'>
            <button className='profile-box'>
              <img src={profile} alt='profile-pic' />
            </button>
            <button type='button' className='close-btn'>
              <img src={closebtn} alt='close' />
            </button>
          </div>
          <ul className='sidebar-menu'>
            {/* <li className='has-submenu'>
              <NavLink to='/settings' className='menu-link'>
                <div className='icon-box'>
                  <img src={Settings} alt='logo sidebar' />
                </div>
                <span>Settings</span>
              </NavLink>
            </li> */}
            <li className='has-submenu'>
              <NavLink to='/settings' className='menu-link'>
                <div className='icon-box'>
                  <img src={Settings} alt='logo sidebar' />
                </div>
                <span>Settings</span>
              </NavLink>
              <ul className='submenu'>
                <li>
                  <NavLink to='/settings/myprofile'>
                    My Profile
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* <li>
              <NavLink to='/counselor' className='menu-link'>
                <div className='icon-box'>
                  <img src={dashboard} alt='logo sidebar' />
                </div>
                <span>Dashboard</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to='/availability' className='menu-link'>
                <div className='icon-box'>
                  <img src={availability} alt='logo sidebar' />
                </div>
                <span>Availability</span>
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink to='/session' className='menu-link'>
                <div className='icon-box'>
                  <img src={session} alt='logo sidebar' />
                </div>
                <span>Session</span>
              </NavLink>
            </li> */}
            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={dashboard} alt='logo sidebar' />
                </div>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={usermanage} alt='logo sidebar' />
                </div>
                <span>Manage Users</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={usermanage} alt='logo sidebar' />
                </div>
                <span>Manage Students</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={counselling} alt='logo sidebar' />
                </div>
                <span>Manage Counselors</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={centermanage} alt='logo sidebar' />
                </div>
                <span>Manage Centers</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={leadsmanage} alt='logo sidebar' />
                </div>
                <span>Manage Leads</span>
              </a>
            </li> */}

            <li>
              <NavLink to='/qualification-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={centermanage} alt='logo sidebar' />
                </div>
                <span>Manage Qualification</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/school-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={centermanage} alt='logo sidebar' />
                </div>
                <span>Manage Schools</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/software-matrix' className='menu-link'>
                <div className='icon-box'>
                  <img src={packages} alt='logo sidebar' />
                </div>
                <span>Software Matrix</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/career-profile' className='menu-link'>
                <div className='icon-box'>
                  <img src={counselling} alt='logo sidebar' />
                </div>
                <span>Career Profile</span>
              </NavLink>
            </li>
            <li className='has-submenu'>
              <NavLink to='/norms-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={packages} alt='logo sidebar' />
                </div>
                <span>Manage Norms</span>
              </NavLink>
              <ul className='submenu'>
                <li>
                  <NavLink to='/norms-management/gradenorms'>
                    Grade Norms
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/norms-management/test-time-norms'>
                    Test Time Norms
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/norms-management/test-description-norms'>
                    Test Norms Description
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={sessionrequest} alt='logo sidebar' />
                </div>
                <span>Session Request</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={testProcess} alt='logo sidebar' />
                </div>
                <span>Manage FAQ&apos;s</span>
              </a>
            </li> */}

            {/* <li>
              <a href='#' className='menu-link'>
                <div className='icon-box'>
                  <img src={cmsmanage} alt='logo sidebar' />
                </div>
                <span>Manage CMS</span>
              </a>
            </li> */}
            <li>
              <NavLink to='/package-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={packages} alt='logo sidebar' />
                </div>
                <span>Manage Package</span>
              </NavLink>
            </li>
            <li className='has-submenu'>
              <NavLink to='/test-management/questions' className='menu-link'>
                <div className='icon-box'>
                  <img src={testmanage} alt='logo sidebar' />
                </div>
                <span>Manage Test</span>
              </NavLink>
              <ul className='submenu'>
                <li>
                  <NavLink to='/test-management/questions'>Questions</NavLink>
                </li>
                <li>
                  <NavLink to='/test-management/main-category'>
                    Main Category
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/test-management/sub-category'>
                    Sub Category
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to='/grade-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={result} alt='logo sidebar' />
                </div>
                <span>Manage Grade</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/board-management' className='menu-link'>
                <div className='icon-box'>
                  <img src={boardmanage} alt='logo sidebar' />
                </div>
                <span>Manage Board</span>
              </NavLink>
            </li>
            <NavLink to='/state-management' className='menu-link'>
              <div className='icon-box'>
                <img src={statesmanage} alt='logo sidebar' />
              </div>
              <span>Manage States</span>
            </NavLink>
            <NavLink to='/city-management' className='menu-link'>
              <div className='icon-box'>
                <img src={citymanage} alt='logo sidebar' />
              </div>
              <span>Manage City</span>
            </NavLink>
            <NavLink to='/university-management' className='menu-link'>
              <div className='icon-box'>
                <img src={universitymanage} alt='logo sidebar' />
              </div>
              <span>Manage University</span>
            </NavLink>
          </ul>
        </div>
        <div className='logout-btn'>
          <button className='logout menu-link' onClick={handleLogout}>
            <div className='icon-box'>
              <img src={logout} alt='logo sidebar' />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
