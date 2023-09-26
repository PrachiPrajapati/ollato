import React from 'react'
/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { Link, useNavigate } from 'react-router-dom'
import profileimg from '../../../assets/images/profile-picture.png'
import cake from '../../../assets/images/cake.svg'
import mail from '../../../assets/images/mail.svg'
import phone from '../../../assets/images/phone.svg'
import studenticon from '../../../assets/images/student-icon.svg'
import pdficon from '../../../assets/images/pdf-icon.svg'
import lightlogomark from '../../../assets/images/lightlogomark.svg'
import pancard from '../../../assets/images/pancard-img.png'
import aadharFront from '../../../assets/images/aadhar-front.png'
import aadharBack from '../../../assets/images/aadhar-back.png'
import sign from '../../../assets/images/sign.svg'

function MyProfile () {
  const navigate = useNavigate()
  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown admin-myprofile'>
        <Sidebar location={location} />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='My Profile' />
          <div className='main-layout whitebox-layout my-profile-page'>
            <div className="profilebutton-box text-end">
              <Link to='/settings/my-profile/editmyprofile' className='theme-btn text-none d-inline-block' onClick={navigate('/settings/my-profile/editmyprofile')} >Edit My Profile</Link>
            </div>
            <div className="my-profile-box">
              <div className="row ">
                <div className="col-xl-9">
                  <div className="profile-item">
                    <div className="row align-items-center">
                      <div className="col-xl-8">
                        <div className="profileinfo">
                          <div className="profile-img">
                            <img src={profileimg} alt="ollato-img" />
                          </div>
                          <div className="profiledesc">
                            <h4>Roy Harvey Spector</h4>
                            <ul className="iconbox">
                              <li>
                                <img src={cake} alt="ollato-img" />
                                <p>26-10-1991</p>
                              </li>
                              <li>
                                <img src={mail} alt="ollato-img" />
                                <p>brooklynroy_s@mail.com</p>
                              </li>
                              <li>
                                <img src={phone} alt="ollato-img" />
                                <p>+91 9876543210</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-4 bio-info">
                        <ul>
                          <li>
                            <label>Father&apos;s Name</label>
                            <h4>Himashu Roy</h4>
                          </li>
                          <li>
                            <label>Mother&apos;s Name</label>
                            <h4>Dipti Roy</h4>
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
                      <p>Ollato Expert Code </p>
                      <h4>OEC000001</h4>
                    </div>
                    <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
                  </div>
                </div>
                <div className="col-xl-12 col-12">
                  <div className="profile-item">
                    <label>Home Address</label>
                    <h4>India, Gujarat, Ahmedabad,  380054</h4>
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="profile-item no-border">
                    <h2>Education and Experience Details</h2>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className="col-xl-6 ">
                  <div className="profile-item h-100">
                    <label>Professional Expertness</label>
                    <h4>Science and Mathematics</h4>
                  </div>
                </div>
                <div className="col-xl-6 ">
                  <div className="profile-item">
                    <label>Resume</label>
                    <div className="d-flex flex-wrap align-items-center pdf-box">
                      <img src={pdficon} alt="ollato-img" />
                      <h4> File name1</h4>
                    </div>
                  </div>
                </div>
                {/* <div className='row'>  */}
                <div className="col-xl-6">
                  <div className="profile-item ">
                    <label>Expertness</label>
                    <h4>3 Years 6 Months</h4>
                  </div>
                </div>
                {/* </div> */}
                <div className="col-xl-12 col-12">
                  <div className="profile-item">
                    <label>High Qualification</label>
                    <h4>Ph.D, IIT</h4>
                  </div>
                </div>
                <div className="col-xl-12 col-12">
                  <div className="profile-item">
                    <label>Last Qualification</label>
                    <h4>MBA, IIT</h4>
                  </div>
                </div>
                <div className="col-xl-12 col-12">
                  <div className="profile-item">
                    <label>Certification</label>
                    <h4>Management Courses Certificate, IIT</h4>
                  </div>
                </div>
                <div className="col-xl-12 mb-0">
                  <div className="profile-item no-border">
                    <h2>KYC Details</h2>
                  </div>
                </div>
                <div className='row'>
                  <div className="col-xl-12 rowspacer">
                    <div className="profile-item ">
                      <div className="row">
                        <div className="col-xl-4">
                          <div className="d-xl-block d-flex flex-wrap justify-content-between mb-sm-20">
                            <label>Pan Card Number</label>
                            <h5>ABCDE1234F</h5>
                          </div>
                        </div>
                        <div className="col-xl-8 ">
                          <div className="">
                            <label>Pan Card</label>
                            <div className="aadhar-box d-flex flex-wrap">
                              <img src={pancard} alt="ollato-img" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 rowspacer">
                    <div className="profile-item ">
                      <div className="row">
                        <div className="col-xl-4">
                          <div className="d-xl-block d-flex flex-wrap justify-content-between  mb-sm-20">
                            <label>Aadhar Card Number</label>
                            <h5>1234 1234 1234</h5>
                          </div>
                        </div>
                        <div className="col-xl-8 ">
                          <div className="">
                            <label>Aadhar Card</label>
                            <div className="aadhar-box d-flex flex-wrap">
                              <img src={aadharFront} alt="ollato-img" />
                              <img src={aadharBack} alt="ollato-img" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 rowspacer">
                    <div className="profile-item ">
                      <div className="row">
                        <div className="col-xl-4">
                          <div className="d-xl-block d-flex flex-wrap justify-content-between mb-sm-20">
                            <label>GST No</label>
                            <h5>07AAGFF2194N1Z1</h5>
                          </div>
                        </div>
                        <div className="col-xl-8 ">
                          <div className="">
                            <label>Signature</label>
                            <div className="aadhar-box d-flex flex-wrap">
                              <img src={sign} alt="ollato-img" />
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
        </div>
      </div>
    </>
  )
}

export default MyProfile
