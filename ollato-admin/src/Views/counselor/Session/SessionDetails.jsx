import React from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
/* import timeslotmorning from '../../../assets/images/timeslotmorning.svg'
import timeslotnoon from '../../../assets/images/timeslotnoon.svg'
import timeslotnight from '../../../assets/images/timeslotnight.svg' */
import accepttick from '../../../assets/images/accept-tick.svg'
import repeat from '../../../assets/images/reschedule-blue.svg'
import cancel from '../../../assets/images/cancel.svg'
import lightlogomark from '../../../assets/images/lightlogomark.svg'
import userimg from '../../../assets/images/userimg.svg'
import calendaricon from '../../../assets/images/calendaricon.svg'
import timeicon from '../../../assets/images/timeicon.svg'
import reports from '../../../assets/images/reports.svg'
import { Link } from 'react-router-dom'
function SessionDetails () {
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form session-detail-page'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Pending Session Details' title='Sessions'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>Session Details</h5>
                      <div className="btn-box">
                          <Link to='/'><button className='action-btns green-bg' type='button'> <img src={accepttick} alt='' /> Accept</button></Link>
                          <Link to='/'><button className='action-btns light-blue-bg' type='button'> <img src={repeat} alt='' /> Reschedule</button></Link>
                          <Link to='/'><button className='action-btns light-red-bg' type='button'> <img src={cancel} alt='' /> Reject</button></Link>
                      </div>
                  </div>
                  <div className="session-det-content">
                    <div className="row">
                      <div className="col-xxl-6">
                        <div className="logo-border-box text-center  position-relative overflow-hidden">
                          <div className="user-info-content-box">
                            <div className="userimg-box">
                              <img src={userimg} alt="userimg" />
                            </div>
                            <div className="user-infobox">
                              <h4>Roy Harvey Spector</h4>
                              <h6>brooklynroy_s@mail.com</h6>
                            </div>
                          </div>
                            <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
                          </div>
                      </div>
                      <div className="col-xxl-3 col-sm-6">
                        <div className="logo-border-box text-center  position-relative overflow-hidden">
                            <div className="user-info-content-box">
                              <div className="userimg-box big-cal">
                                <img src={calendaricon} alt="calendaricon" />
                              </div>
                              <div className="user-infobox">
                                <h6>Date</h6>
                                <h4>29-06-2020</h4>
                              </div>
                            </div>
                            </div>
                      </div>
                      <div className="col-xxl-3 col-sm-6">
                        <div className="logo-border-box text-center  position-relative overflow-hidden">
                            <div className="user-info-content-box">
                              <div className="userimg-box big-cal">
                                <img src={timeicon} alt="timeicon" />
                              </div>
                              <div className="user-infobox">
                                <h6>Time</h6>
                                <h4>12:45 PM</h4>
                              </div>
                            </div>
                            </div>
                      </div>
                    </div>
                    <div className="view-stu-report secondary-bg">
                      <a href="#"> <img src={reports} alt="" />  View Student Report</a>
                    </div>
                  </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default SessionDetails
