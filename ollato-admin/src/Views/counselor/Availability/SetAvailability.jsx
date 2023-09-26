import React from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import timeslotmorning from '../../../assets/images/timeslotmorning.svg'
import timeslotnoon from '../../../assets/images/timeslotnoon.svg'
import timeslotnight from '../../../assets/images/timeslotnight.svg'
function SetAvailability () {
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Set Availability' title='Availability Management'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>Set Availability</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none'>Cancel</button>
                        <button className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                      <Form className='light-bg'>
                          <div className="row">
                          <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formstartdate">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control type="date" placeholder="DD/MM/YYYY" />
                            </Form.Group>
                            </div>
                            <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formenddate">
                              <Form.Label>End Date</Form.Label>
                              <Form.Control type="date" placeholder="DD/MM/YYYY" />
                            </Form.Group>
                            </div>
                            <div className="col-md-12">
                              <Form.Group className="form-group">
                                <Form.Label>Select Slots</Form.Label>
                                  <div className=" light-blue-bgbox">
                                      <ul className="slot-availablity four-col">
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
                              </Form.Group>
                            </div>
                            <div className='col-md-12'>
                              <div className="form-group">
                                <h4 className='black-font'>Set Block Date</h4>
                              </div>
                            </div>
                            <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formenddate">
                              <Form.Label>Start Date</Form.Label>
                              <Form.Control type="date" placeholder="DD/MM/YYYY" />
                            </Form.Group>
                            </div>
                          </div>
                      </Form>
                    </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default SetAvailability
