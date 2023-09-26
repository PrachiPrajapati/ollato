import React from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
/* import timeslotmorning from '../../../assets/images/timeslotmorning.svg'
import timeslotnoon from '../../../assets/images/timeslotnoon.svg'
import timeslotnight from '../../../assets/images/timeslotnight.svg' */
// import accepttick from '../../../assets/images/accept-tick.svg'
import repeat from '../../../assets/images/reschedule-blue.svg'
import cancel from '../../../assets/images/cancel.svg'
import lightlogomark from '../../../assets/images/lightlogomark.svg'
import userimg from '../../../assets/images/userimg.svg'
import calendaricon from '../../../assets/images/calendaricon.svg'
import timeicon from '../../../assets/images/timeicon.svg'
import reports from '../../../assets/images/reports.svg'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
function RescheduleSessionDetails () {
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
                    <div className="reason-box text-start light-bg">
                        <h4 className='black-font'>Reschedule Session</h4>
                      <Form>
                        <div className="row">
                          <div className="col-xxl-4 col-md-6">
                          <Form.Group className="form-group" controlId="formdate">
                              <Form.Label>Date</Form.Label>
                              <Form.Control type="date" placeholder="DD/MM/YYYY" />
                            </Form.Group>
                          </div>
                          <div className="col-xxl-4 col-md-6">
                            <Form.Group className="form-group" controlId="formtime">
                              <Form.Label>Select Time Slot</Form.Label>
                              <Form.Control type="time" placeholder="DD/MM/YYYY" />
                            </Form.Group>
                          </div>
                        </div>
                          <Form.Group className="form-group border-line-dark mb-0" controlId="reason">
                            <Form.Label>Reason for Reschedule Session</Form.Label>
                              <Form.Control as="textarea" className='big-textarea' placeholder="Reason for Reschedule Session...." />
                            </Form.Group>
                          </Form>
                    </div>
                    <div className="reason-box text-start">
                        <h4 className='black-font'>Cancel Session</h4>
                      <Form>
                        <Form.Group className="form-group border-line-dark" controlId="reason">
                        <Form.Label>Reason for Reschedule Session</Form.Label>
                          <p>I regret to inform you that I am unable to attend our business analysis meeting this afternoon. I have a family emergency that requires me to be out of town for the rest of the day. I am attaching the presentation I put together to share with you during our meeting in case you would like to review these in my absence. If you have questions regarding this presentation</p>
                          <p>I apologize for any inconvenience this may cause, and I hope to reconnect with you when I am back in the office tomorrow.</p>
                        </Form.Group>
                        <Form.Label className='mb-0'>Session Canceled By</Form.Label>
                        <h4 className='black-font'>Roy Harvey Spector <a href="#">(Student)</a></h4>
                      </Form>
                      <div className="row">
                      <div className="col-xxl-3 col-sm-6">
                        <div className="logo-border-box text-center  position-relative overflow-hidden">
                            <div className="user-info-content-box">
                              <div className="userimg-box big-cal">
                                <img src={calendaricon} alt="calendaricon" />
                              </div>
                              <div className="user-infobox">
                                <h6>Reschedule Date</h6>
                                <h4 className='mb-0'>29-06-2020</h4>
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
                                <h6>Reschedule Time</h6>
                                <h4 className='mb-0'>12:45 PM</h4>
                              </div>
                            </div>
                            </div>
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

export default RescheduleSessionDetails
