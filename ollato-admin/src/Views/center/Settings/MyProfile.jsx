import React from 'react'
/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { Link, useNavigate } from 'react-router-dom'
import profileimg from '../../../assets/images/profile-picture.png'
import userIc from '../../../assets/images/user-manage.svg'
import studenticon from '../../../assets/images/student-icon.svg'
import lightlogomark from '../../../assets/images/lightlogomark.svg'

function MyProfile () {
  const navigate = useNavigate()
  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown admin-myprofile no-btn-box'>
        <Sidebar location={location} />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader title='My Profile' />
          <div className='main-layout whitebox-layout my-profile-page'>
            <div className="profilebutton-box text-end">
              <Link to='/settings/my-profile/editmyprofile' className='theme-btn text-none d-inline-block' onClick={navigate('/center/settings/editmyprofile')} >Edit My Profile</Link>
            </div>
            <div className="my-profile-box center-profile">
              <div className="row ">
                <div className="col-xl-9">
                  <div className="profile-item h-100">
                    <div className="row align-items-center">
                      <div className="col-xl-8">
                        <div className="profileinfo flex-column flex-sm-row">
                          <div className="profile-img mb-3 mb-sm-0">
                            <img src={profileimg} alt="ollato-img" />
                          </div>
                          <div className="profiledesc text-center text-sm-left">
                            <h4>Roy Harvey Spector</h4>
                            <ul className="iconbox d-flex justify-content-center justify-content-sm-start">
                              <li>
                                <img src={userIc} alt="ollato-img" />
                                <p>26-10-1991</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-3">
                  <div className="profile-item h-100 text-center d-flex align-items-center justify-content-center position-relative overflow-hidden">
                    <div className='student-code'>
                      <img src={studenticon} alt="studenticon" />
                      <p>Ollato Expert Code </p>
                      <h4>OEC000001</h4>
                    </div>
                    <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
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
