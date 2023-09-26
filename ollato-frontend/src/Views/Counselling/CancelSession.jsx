import React from 'react'
/* React Packages */
import { Form } from 'react-bootstrap'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
/* images */
import rating from '../../assets/images/rating.png'
import background from '../../assets/images/brooklyn-simmons.png'
import calendericon from '.././../assets/images/calendaricon.svg'
import clockicon from '.././../assets/images/timeicon.svg'

const CancelSession = () => {
  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-breadcrumbs '>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader title="Counselling"/>
            <div className='main-layout whitebox-layout no-padding reschedule-page'>
              <div className='heading-box counselling-page'>
                    <h5 className='mr-1'>Cancel Session</h5>
                    <div className='btn-box'>
                      <button className="theme-btn red-btn text-none" type='button'>Cancel Session</button>
                    </div>
                  </div>
                  <div className="counsellor-box">
                <div className="row">
                  <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-sm-7">
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-9 col-xl-8 ">
                    <div className="date-time-box light-blue-bgbox">
                      <h4 className='box-title'>Date & Time</h4>
                      <div className="time-date">
                        <div className="itemee">
                          <div className="img-box"><img src={calendericon} alt="calendericon" /></div>
                          <h4>01 Feb 2022</h4>
                        </div>
                        <div className="itemee">
                          <div className="img-box"><img src={clockicon} alt="clockicon" /></div>
                          <h4>10:00 AM</h4>
                        </div>
                      </div>
                    </div>
                    <Form>
                            <Form.Group className="form-group border-line-dark mb-0 " controlId="cancelreason">
                                <Form.Control as="textarea" className='big-textarea cancelbox' placeholder="Enter Reason for Cancellation...." />
                              </Form.Group>
                          </Form>
                  </div>
                </div>
              </div>
              </div>
          </div>
    </div>
  </>
  )
}

export default CancelSession
