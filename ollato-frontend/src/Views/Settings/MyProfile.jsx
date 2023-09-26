import React, { useEffect, useState, useRef } from 'react'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import { Link, useNavigate } from 'react-router-dom'
import profileimg from '../../assets/images/profileimg.png'
import cake from '../../assets/images/cake.svg'
import mail from '../../assets/images/mail.svg'
import phone from '../../assets/images/phone.svg'
import studenticon from '../../assets/images/student-icon.svg'
import lightlogomark from '../../assets/images/lightlogomark.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

import { viewProfileAction } from '../../Actions/auth'
function MyProfile () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const profileDataArray = useSelector(state => state.auth.profileData)
  const responseStatus = useSelector(state => state.packages.resStatus)
  const responseMessage = useSelector(state => state.packages.resMessage)
  const previousProps = useRef({ profileDataArray, responseStatus, responseMessage }).current

  const [data, setData] = useState({})
  useEffect(() => {
    if (responseStatus === 401) {
      localStorage.removeItem('token')
      enqueueSnackbar(`${responseMessage}`, {
        variant: 'error',
        autoHide: true,
        hide: 3000
      })
      navigate('/')
    }
  }, [responseStatus])
  useEffect(() => {
    if (token) {
      dispatch(viewProfileAction(token))
    }
  }, [token])
  useEffect(() => {
    if (previousProps?.profileDataArray !== profileDataArray) {
      if (profileDataArray) {
        setData(profileDataArray)
      }
    }
    return () => {
      previousProps.profileDataArray = profileDataArray
    }
  }, [profileDataArray])
  console.log('profileDataArray', data)

  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader name='My Profile'/>
            <div className='main-layout whitebox-layout my-profile-page'>
                <div className="profilebutton-box text-end">
                    <Link to='/settings/my-profile/editmyprofile' className='theme-btn text-none'>Edit My Profile</Link>
                </div>
                <div className="my-profile-box">
                    <div className="row">
                        <div className="col-xl-9">
                            <div className="profile-item">
                                <div className="row align-items-center">
                                    <div className="col-xl-8">
                                        <div className="profileinfo">
                                            <div className="profile-img">
                                                <img src={profileimg} alt="ollato-img" />
                                            </div>
                                            <div className="profiledesc">
                                                <h4>{(data && data?.first_name + ' ' + data?.middle_name + ' ' + data?.last_name) || '-'}</h4>
                                                <ul className="iconbox">
                                                    <li>
                                                        <img src={cake} alt="ollato-img" />
                                                        <p>{(data && data?.dob) || '-'}</p>
                                                    </li>
                                                    <li>
                                                        <img src={mail} alt="ollato-img" />
                                                        <p>{(data && data?.email) || '-'}</p>
                                                    </li>
                                                     <li>
                                                        <img src={phone} alt="ollato-img" />
                                                        <p>{(data && data?.mobile) || '-'}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 bio-info">
                                        <ul>
                                            <li>
                                                <label>Father&apos;s Name</label>
                                                <h4>{(data && data?.father_name) || '-'}</h4>
                                            </li>
                                            <li>
                                                <label>Mother&apos;s Name</label>
                                                <h4>{(data && data?.mother_name) || '-'}</h4>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3">
                            <div className="profile-item h-100 text-center d-flex align-items-center justify-content-center position-relative overflow-hidden">
                                <div className='student-code'>
                                    <img src={studenticon} alt="studenticon" />
                                    <p>Ollato Student Code </p>
                                    <h4>-</h4>
                                </div>
                            <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="profile-item">
                                <label>Home Address</label>
                                <h4>-</h4>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="profile-item">
                                <label>School Address</label>
                                <h4>{(data && data?.studentDetails?.school_address_1 + ' ' + data?.studentDetails?.school_address_2) || '-'}</h4>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="profile-item">
                                <label>Education Details</label>
                                {/* <h4>10th STD, CBSE, Divine Child International School</h4> */}
                                <h4>-</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default MyProfile
