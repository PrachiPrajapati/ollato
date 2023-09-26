import React from 'react'
/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
// import { Controller } from 'react-hook-form'

import profilePlaceholder from '../../../assets/images/profile-placeholder.svg'

function Editmyprofile () {
  return (
    <>
      <div className="common-layout common-dashboard-wrapper no-dropdown edit-profile-wrap no-btn-box">
        <Sidebar />
        <MobileHeader />
        <div className="main-content-box">
          <Header />
          <TitleHeader name="Edit" title="My Profile" />
          <div className="main-layout whitebox-layout my-editprofile-page">
            <Form >
              <div className="profilebutton-box text-end">
                <Link to="/settings/my-profile" className="theme-btn text-none d-inline-block">
                  Save
                </Link>
              </div>
              <div className="light-bg-box">
                <div className="row align-items-center">
                  <div className="col-lg-4 col-xl-3">
                    <Form.Group controlId="formFile" className="form-group profile-picture common-input-file ">
                      <Form.Control type="file" className='hidden-file' />
                      <div className="form-control d-flex align-items-center flex-column justify-content-center text-center ">
                        <div className="img-box"> <img src={profilePlaceholder} alt="" /></div>
                        {/*  <div className="img-box"> <img src={profilePicture} alt="" /></div> */}
                        <p className='m-0 blue-placeholder'>Upload Profile Photo</p>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-lg-8 col-xl-9">
                    <div className="row">
                      <div className="col-md-12">
                        <h4>Counsellor Details</h4>
                      </div>
                      <div className="col-lg-12 col-xl-6">
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group className="form-group" controlId="Centername">
                              <Form.Label>Center Name</Form.Label>
                              <Form.Control placeholder="Delhi Public School"
                                type="text"
                              />
                            </Form.Group>
                          </div>
                          <div className="col-md-12">
                            <Form.Group className="form-group" controlId="Username">
                              <Form.Label>User Name</Form.Label>
                              <Form.Control placeholder="Roy Harvey Spector"
                                type="text"
                              />
                            </Form.Group>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Editmyprofile
