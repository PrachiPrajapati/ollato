import React, { useState } from 'react'
/* React Packages */
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
/* images */
import rating from '../../assets/images/rating.png'
import background from '../../assets/images/brooklyn-simmons.png'
import timeslotmorning from '.././../assets/images/timeslotmorning.svg'
import timeslotnoon from '.././../assets/images/timeslotnoon.svg'
import timeslotnight from '.././../assets/images/timeslotnight.svg'

const CounselorDetail = () => {
  const [startDate, setStartDate] = useState(new Date())
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
                    <h5 className='mr-1'>Book Session</h5>
                    <div className='btn-box'>
                      <button className="theme-btn text-none" type='button'>Book Now</button>
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
                  <div className="infobasic">
                    <h4>Basic Information</h4>
                     <p>UX writing is an important skill for UX designers and other design pros. Test your knowledge of key UX Writing principles and best practices. Skill tests are essential for benchmarking your current design knowledge. When you take a skill test, you’ll see how you compare with other designers from around the world.</p>
                  </div>
                  <div className="date-time-box light-blue-bgbox">
                      <h4 className='box-title'>Counselling Type</h4>
                      <div className="time-date counselling-btnbox">
                        <div className="itemee">
                         <button className="theme-btn text-none whitebtn active">Online Video Counseling</button>
                        </div>
                        <div className="itemee">
                        <button className="theme-btn text-none whitebtn">Face to Face Counselling</button>
                        </div>
                      </div>
                    </div>
                    <div className=" light-blue-bgbox">
                     <div className='date-time-box'>
                        <h4 className='box-title'>Select Availability Slot</h4>
                          <Form>
                            <div className='btn-box filter-box light-bg'>
                                <div className="filter-date-btn filter-btn">
                                <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </div>
                          </Form>
                        </div>
                    <ul className="slot-availablity">
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
                      <li> <button className="slot-booking whitebtn"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
                    </ul>
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

export default CounselorDetail
