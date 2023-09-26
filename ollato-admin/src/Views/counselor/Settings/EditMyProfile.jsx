import React, { useState } from 'react'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import crossWhite from '../../../assets/images/crosswhite.svg'
import otherdocPlaceholder from '../../../assets/images/other-img-placeholder.svg'
import pancard from '../../../assets/images/pancard-img.png'
import sign from '../../../assets/images/sign.svg'

import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
// import { Controller } from 'react-hook-form'
import profilePlaceholder from '../../../assets/images/profile-placeholder.svg'
function Editmyprofile () {
  // const [selectedSchool, setSelectedSchool] = useState([{ value: 'ABC Schools', label: 'abc-schools' }])
  /* for country */
  const country = [{ value: 'India', label: 'India' }, { value: 'USA', label: 'USA' }, { value: 'UAE', label: 'UAE' }]
  const [selectedCountry, setSelectedCountry] = useState([{ value: 'India', label: 'India' }])
  /* for state */
  const state = [{ value: 'Gujrat', label: 'Gujrat' }, { value: 'Newyork', label: 'Newyork' }]
  const [selectedState, setSelectedState] = useState([{ value: 'Gujrat', label: 'Gujrat' }])
  /* for District */
  const district = [{ value: 'Ahmedabad', label: 'Ahmedabad' }, { value: 'Surat', label: 'Surat' }]
  const [selectedDistrict, setSelectedDistrict] = useState([{ value: 'Ahmedabad', label: 'Ahmedabad' }])
  /* for year */
  const year = [{ value: '1990', label: '1990' }, { value: '2000', label: '2000' }, { value: '2010', label: '2010' }]
  const [selectedYear, setSelectedYear] = useState([{ value: '1990', label: '1990' }])
  /* for year */
  const months = [{ value: 'Jan', label: 'Jan' }, { value: 'Apr', label: 'Apr' }, { value: 'Oct', label: 'Oct' }]
  const [selectedMonths, setSelectedMonths] = useState([{ value: 'Jan', label: 'Jan' }])
  /* for uni */
  const university = [{ value: 'GTU', label: 'GTU' }, { value: 'GU', label: 'GU' }, { value: 'SK', label: 'SK' }]
  const [selectedUniversity, setSelectedUniversity] = useState([{ value: 'GTU', label: 'GTU' }])
  /* for qualification */
  const qualification = [{ value: 'Graduate', label: 'Graduate' }, { value: 'Masters', label: 'Masters' }, { value: 'HSC', label: 'HSC' }]
  const [selectedQualification, setSelectedQualification] = useState([{ value: 'Graduate', label: 'Graduate' }])

  return (
    <>
      <div className="common-layout common-dashboard-wrapper no-dropdown edit-profile-wrap">
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
                <div className="row">
                  <div className="col-xxl-3 ">
                    <Form.Group controlId="formFile" className="form-group profile-picture common-input-file ">
                      <Form.Control type="file" className='hidden-file' />
                      <div className="form-control d-flex align-items-center flex-column justify-content-center text-center ">
                        <div className="img-box"> <img src={profilePlaceholder} alt="" /></div>
                        {/*  <div className="img-box"> <img src={profilePicture} alt="" /></div> */}
                        <p className='m-0 blue-placeholder'>Upload Profile Photo</p>
                      </div>
                    </Form.Group>
                  </div>
                  <div className="col-xxl-9 ">
                    <div className="row">
                      <div className="col-lg-12">
                        <h4>Counsellor Details</h4>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="fullname">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="mothername">
                          <Form.Label>Mother&apos;s Name</Form.Label>
                          <Form.Control
                            type="text"
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formfathername">
                          <Form.Label>Father&apos;s Name</Form.Label>
                          <Form.Control
                            type="text"
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formdate">
                          <Form.Label>Date Of Birth</Form.Label>
                          <Form.Control
                            type="date" />
                          {/* <Controller
                            // control={control}
                            name="dob"
                            render={(props) => (
                              <Form.Control
                                type="date"
                              // Value={data?.dob}
                              // DatePicker accepts a moment object
                              />
                            )}
                          /> */}
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formBasicmobile">
                          <Form.Label>Mobile Number</Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type="tel"
                            />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group verified" controlId="formBasicEmail">
                          <Form.Label>Email ID</Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type="email"
                            />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-xl-6">
                                <Form.Group
                                  className="form-group common-select-style"
                                  controlId="formfullname"
                                >
                                  <Form.Label>Country</Form.Label>
                                  <Select
                                    isSearchable={false}
                                    defaultValue={selectedCountry}
                                    onChange={setSelectedCountry}
                                    options={country}
                                  /*  placeholder={'Select Country'} */
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-xl-6">
                                <Form.Group
                                  className="form-group common-select-style"
                                  controlId="formfullname"
                                >
                                  <Form.Label>State</Form.Label>
                                  <Select
                                    isSearchable={false}
                                    defaultValue={selectedState}
                                    onChange={setSelectedState}
                                    options={state}
                                  /* placeholder={'Select State'} */
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-xl-6">
                                <Form.Group
                                  className="form-group common-select-style"
                                  controlId="formfullname"
                                >
                                  <Form.Label>District</Form.Label>
                                  <Select
                                    isSearchable={false}
                                    defaultValue={selectedDistrict}
                                    onChange={setSelectedDistrict}
                                    options={district}
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-xl-6">
                                <Form.Group className="form-group" controlId="formpincode1">
                                  <Form.Label>PIN Code</Form.Label>
                                  <Form.Control
                                    type="number"
                                    value="3800051"
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group
                          className="form-group common-select-style"
                          controlId="formfullname"
                        >
                          <Form.Label>Professional Expertness</Form.Label>
                          <Select
                            placeholder={'Select from the list '}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group
                          controlId='formFile'
                          className='form-group resume-file-input'
                        >
                          <Form.Label>Resume</Form.Label>
                          <Form.Control
                            type='file'
                            title='Upload Resume'
                            className='hidden-file'
                            name='files'
                            accept='application/pdf,application/msword'
                          />
                          <div className='form-control d-flex justify-content-between align-items-center'>
                            {/* <p className='m-0'>Upload Resume</p> */}
                            <p className='m-0'>Upload Resume</p>
                            <p className='m-0 file-name-resume'></p>
                            <button className='browse-btn'>Browse</button>
                          </div>
                          <p className='error-msg'>
                          </p>
                        </Form.Group>
                      </div>
                      <div className="col-lg-12">
                        <h4>Experience Details</h4>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-xl-6">
                                <Form.Group
                                  className="form-group common-select-style"
                                  controlId="formfullname"
                                >
                                  <Form.Label>Year</Form.Label>
                                  <Select
                                    isSearchable={false}
                                    defaultValue={selectedYear}
                                    onChange={setSelectedYear}
                                    options={year}
                                  /*  placeholder={'Select Country'} */
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-xl-6">
                                <Form.Group
                                  className="form-group common-select-style"
                                  controlId="formfullname"
                                >
                                  <Form.Label>Month</Form.Label>
                                  <Select
                                    isSearchable={false}
                                    defaultValue={selectedMonths}
                                    onChange={setSelectedMonths}
                                    options={months}
                                  /* placeholder={'Select State'} */
                                  />
                                </Form.Group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <h4>Counsellor Details</h4>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="HighestQualification ">
                            <Form.Label> Pan card number</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedQualification}
                              onChange={setSelectedQualification}
                              options={qualification}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="UniversityInstitution">
                            <Form.Label>University/Institution</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedUniversity}
                              onChange={setSelectedUniversity}
                              options={university}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="HighestQualification ">
                            <Form.Label>Last Qualification</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedQualification}
                              onChange={setSelectedQualification}
                              options={qualification}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="UniversityInstitution1">
                            <Form.Label>University/Institution</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedUniversity}
                              onChange={setSelectedUniversity}
                              options={university}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="HighestQualification ">
                            <Form.Label>Certification</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedQualification}
                              onChange={setSelectedQualification}
                              options={qualification}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="form-group common-select-style" controlId="UniversityInstitution1">
                            <Form.Label>University/Institution</Form.Label>
                            <Select
                              isSearchable={false}
                              defaultValue={selectedUniversity}
                              onChange={setSelectedUniversity}
                              options={university}
                            />
                          </Form.Group>
                        </div>
                        <div className="col-lg-12">
                          <h4>KYC Details</h4>
                        </div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-6">
                              <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file  uploaded-doc">
                                <Form.Label>Upload Pan Card</Form.Label>
                                <Form.Control type="file" className='hidden-file' name="panCardFiles" />
                                <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
                                  <div className="img-box">
                                    <img src="" alt="" />
                                    <button className="close-cross-btn" > <img src={crossWhite} alt="" /></button>
                                    <img src={pancard} alt="" />
                                    <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p>
                                    {/* <img src={otherdocPlaceholder} alt="" /> */}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="row align-items-end">
                            <div className="col-lg-6">
                              <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file  uploaded-doc">
                                <Form.Label>Update Aadhar card</Form.Label>
                                <Form.Control type="file" className='hidden-file' name="frontAdharCard" />
                                <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
                                  <div className="img-box">
                                    <img src="" alt="" />
                                    <button className="close-cross-btn" > <img src={crossWhite} alt="" /></button>
                                    <img src={otherdocPlaceholder} alt="" />
                                    <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p>
                                    {/* <img src={otherdocPlaceholder} alt="" /> */}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                            <div className="col-lg-6">
                              <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file  uploaded-doc">
                                <Form.Control type="file" className='hidden-file' name="backAdharCard" />
                                <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
                                  <div className="img-box">
                                    <img src="" alt="" />
                                    <button className="close-cross-btn" > <img src={crossWhite} alt="" /></button>
                                    <img src={otherdocPlaceholder} alt="" />
                                    <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p>
                                    {/* <img src={otherdocPlaceholder} alt="" /> */}
                                  </div>
                                </div>
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file  uploaded-doc">
                            <Form.Label>Update Signature</Form.Label>
                            <Form.Control type="file" className='hidden-file' name="signature" />
                            <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
                              <div className="img-box">
                                <img src="" alt="" />
                                <button className="close-cross-btn" > <img src={crossWhite} alt="" /></button>
                                <img src={sign} alt="" />
                                <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p>
                                {/* <img src={otherdocPlaceholder} alt="" /> */}
                              </div>
                            </div>
                          </Form.Group>
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
