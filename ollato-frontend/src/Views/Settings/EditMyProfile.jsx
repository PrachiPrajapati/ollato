import React, { useState, useRef, useEffect } from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
// import moment from 'moment'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import profilePlaceholder from '../../assets/images/profile-placeholder.svg'
import { viewProfileAction, getAllBoardsAction } from '../../Actions/auth'

function EditMyProfile () {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { control, register, handleSubmit, getValues, reset } = useForm()
  const profileDataArray = useSelector(state => state.auth.profileData)
  const boardsArray = useSelector(state => state.auth.boardsDataArray)
  const previousProps = useRef({ profileDataArray }).current
  const [data, setData] = useState({})
  const [boardsArraySet, setBoardsArraySet] = useState([])

  useEffect(() => {
    if (token) {
      dispatch(viewProfileAction(token))
      dispatch(getAllBoardsAction(token))
    }
  }, [token])
  useEffect(() => {
    if (previousProps?.profileDataArray !== profileDataArray) {
      if (profileDataArray) {
        setData(profileDataArray)
      }
    }
    return () => {
      previousProps.profileDataArray = profileDataArray
    }
  }, [profileDataArray])

  useEffect(() => {
    if (previousProps?.boardsArray !== boardsArray) {
      const array = []
      if (boardsArray) {
        // eslint-disable-next-line array-callback-return
        boardsArray.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setBoardsArraySet(array)
      }
    }
    return () => {
      previousProps.statesData = boardsArray
    }
  }, [boardsArray])
  console.log('boardsArraySet', boardsArraySet)
  useEffect(() => {
    if (boardsArray && boardsArraySet?.length) {
      console.log('************', data)
      console.log('-----data------', boardsArraySet)
      const d = boardsArraySet.filter(c => c.value === data?.studentDetails.board_id)
      console.log('-----data', d)
      reset({
        boardsArraySet: d
      })
    }
  }, [boardsArray, boardsArraySet])
  const onSubmit = data => {
    console.log('data', data)
  }
  /* for standard */
  const standard = [{ value: '10th', label: '10th' }, { value: '12th', label: '12th' }]
  const [selectedStandard, setSelectedStandard] = useState([{ value: '10th', label: '10th' }])

  /* for school */
  const school = [{ value: 'ABC Schools', label: 'abc-schools' }, { value: 'Americans', label: 'Americans' }]
  const [selectedSchool, setSelectedSchool] = useState([{ value: 'ABC Schools', label: 'abc-schools' }])
  /* for country */
  const country = [{ value: 'India', label: 'India' }, { value: 'USA', label: 'USA' }, { value: 'UAE', label: 'UAE' }]
  const [selectedCountry, setSelectedCountry] = useState([{ value: 'India', label: 'India' }])
  /* for state */
  const state = [{ value: 'Gujrat', label: 'Gujrat' }, { value: 'Newyork', label: 'Newyork' }]
  const [selectedState, setSelectedState] = useState([{ value: 'Gujrat', label: 'Gujrat' }])
  /* for District */
  const district = [{ value: 'Ahmedabad', label: 'Ahmedabad' }, { value: 'Surat', label: 'Surat' }]
  const [selectedDistrict, setSelectedDistrict] = useState([{ value: 'Ahmedabad', label: 'Ahmedabad' }])

  return (
    <>
      <div className="common-layout common-dashboard-wrapper no-dropdown">
        {console.log('getValues', getValues())}
        <Sidebar location={location} />
        <MobileHeader />
        <div className="main-content-box">
          <Header />
          <TitleHeader name="Edit" title="My Profile" />
          <div className="main-layout whitebox-layout my-editprofile-page">
           <Form onSubmit={handleSubmit(onSubmit)} >
            <div className="profilebutton-box text-end">
              <Link to="/settings/my-profile" className="theme-btn text-none">
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
                        <h4>Student Details</h4>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formfirstname">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            Value={data && data?.first_name}
                            {...register('first_name', { required: true })}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formmiddlename">
                          <Form.Label>Middle Name</Form.Label>
                          <Form.Control
                            type="text"
                            Value={data && data?.middle_name}
                            {...register('middle_name', { required: true })}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formlastname">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            Value={data && data?.last_name}
                            {...register('last_name', { required: true })}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formmothername">
                          <Form.Label>Mother&apos;s Name</Form.Label>
                          <Form.Control
                            type="text"
                            Value={data && data?.mother_name}
                            {...register('mother_name', { required: true })}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formfathername">
                          <Form.Label>Father&apos;s Name</Form.Label>
                          <Form.Control
                            type="text"
                            Value={data && data?.father_name}
                            {...register('father_name', { required: true })}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group" controlId="formdate">
                          <Form.Label>Date Of Birth</Form.Label>
                          {/* <Form.Control type="date" value="23/12/2022" /> */}
                          <Controller
                              control={control}
                              name="dob"
                              render={(props) => (
                                <Form.Control
                                  type="date"
                                  Value={data?.dob} // DatePicker accepts a moment object
                                />
                              )}
                            />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                      <Form.Group className="form-group" controlId="formBasicmobile">
                        <Form.Label>Mobile Number</Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              type="tel"
                              Value={data && data?.mobile}
                              {...register('mobile', { required: true })}
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
                          Value={data && data?.email}
                          {...register('email', { required: true })}
                        />
                        </div>
                      </Form.Group>
                      </div>
                      <div className="col-lg-12">
                        <h4>Education Details</h4>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group
                          className="form-group common-select-style"
                          controlId="formfullname"
                        >
                          <Form.Label>Board</Form.Label>
                          {/* <Select
                            isSearchable={false}
                            Value={selectedBoard}
                            defaultValue={selectedBoard}
                            onChange={setSelectedBoard}
                            options={board}
                          /> */}
                          <Controller
                            name='boards'
                            control={control}
                            render={({ field: { onChange, value = {} } }) => {
                              return (
                              <Select
                                placeholder={'Select Board'}
                                className='react-dropdown'
                                classNamePrefix='dropdown'
                                options={boardsArraySet}
                                value={value || getValues()?.boardsArraySet}
                                onChange={(e) => {
                                  onChange(e)
                                }}
                              />
                              )
                            }}
                            />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="form-group common-select-style" controlId="formfullname" >
                          <Form.Label>Standard</Form.Label>
                          <Select
                            isSearchable={false}
                            defaultValue={selectedStandard}
                            onChange={setSelectedStandard}
                            options={standard}
                            /* placeholder={'Select Standard'} */
                          />
                        </Form.Group>
                      </div>
                      <div className="col-lg-6">
                          <Form.Group
                      className="form-group common-select-style"
                      controlId="formfullname"
                    >
                      <Form.Label>School</Form.Label>
                      <Select
                        isSearchable={false}
                        defaultValue={selectedSchool}
                        onChange={setSelectedSchool}
                        options={school}
                        /* placeholder={'Select School'} */
                      />
                    </Form.Group>
                      </div>
                      <div className="col-lg-12">
                        <div className="row">
                          <div className="col-lg-6">
                            <Form.Group className="form-group" controlId="formaddressline1">
                              <Form.Label>Address Line 1</Form.Label>
                              <Form.Control
                                type="text"
                                Value={data && data?.studentDetails?.school_address_1}
                                {...register('address-1', { required: true })}
                              />
                            </Form.Group>
                          </div>
                          <div className="col-lg-6">
                            <Form.Group className="form-group" controlId="formaddressline2">
                              <Form.Label>Address Line 2</Form.Label>
                              <Form.Control
                                type="text"
                                Value={data && data?.studentDetails?.school_address_2}
                              />
                            </Form.Group>
                          </div>
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
                                    /* placeholder={'Select District'} */
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
                      <div className="col-md-12">
                        <div className="row">
                        <Form.Label>Subject  Dropout</Form.Label>
                          <div className="col-lg-6">
                            <Form.Group className="form-group drop-boxes gender-box d-flex align-items-center" controlId="formsubjectdropout" >
                            <Form.Label>Science drop</Form.Label>
                              <Form.Check type="radio" id="radio-3">
                                <div className="radio-input">
                                  <Form.Check.Input type="radio" name="sciencedrop" />
                                </div>
                                <Form.Check.Label>Yes</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" id="radio-4">
                                <div className="radio-input">
                                  <Form.Check.Input type="radio" name="sciencedrop" />
                                </div>
                                <Form.Check.Label>No</Form.Check.Label>
                              </Form.Check>
                            </Form.Group>
                          </div>
                          <div className="col-lg-6">
                            <Form.Group className="form-group drop-boxes gender-box d-flex align-items-center" controlId="formsubjectdropout" >
                            <Form.Label>Maths drop</Form.Label>
                              <Form.Check type="radio" id="radio-5">
                                <div className="radio-input">
                                  <Form.Check.Input type="radio" name="sciencedrop" />
                                </div>
                                <Form.Check.Label>Yes</Form.Check.Label>
                              </Form.Check>
                              <Form.Check type="radio" id="radio-6">
                                <div className="radio-input">
                                  <Form.Check.Input type="radio" name="sciencedrop" />
                                </div>
                                <Form.Check.Label>No</Form.Check.Label>
                              </Form.Check>
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

export default EditMyProfile
