import React from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
function AddNewCareerProfile () {
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Add New Career Profile' title='Career Profile'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>Add New Career Profile</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none'>Cancel</button>
                        <button className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                      <Form className='light-bg'>
                          <div className="row">
                          <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formprofiletype">
                                <Form.Label>Profile Type</Form.Label>
                                <Form.Control type="text" placeholder="Enter Profile Type" />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group controlId='formFile' className='form-group resume-file-input' >
                                <Form.Label>File</Form.Label>
                                <Form.Control type='file' title='Upload Resume' className='hidden-file' name='files' />
                                <div className='form-control d-flex justify-content-between align-items-center'>
                                  <p className='m-0'>Upload File</p>
                                  <button className='browse-btn'>Browse</button>
                                </div>
                              </Form.Group>
                            </div>
                            <div className="col-md-12">
                            <h4 className="black-font mb-4">Profile Details</h4>
                            <div className="addmoreaddbox d-flex align-items-start">
                                 <div className="option-item">
                                  <div className="optionitembox">
                                  <Form.Group className="form-group" controlId="formsubprofile">
                                    <Form.Label>Sub Profile</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Sub Profile" />
                                  </Form.Group>
                                  </div>
                                 </div>
                                 <div className="add-remove-btn">
                                  <div><button className="theme-btn small-btn">+</button></div>
                                  <div><button className="theme-btn dark-btn">-</button></div>
                                 </div>
                            </div>
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

export default AddNewCareerProfile
