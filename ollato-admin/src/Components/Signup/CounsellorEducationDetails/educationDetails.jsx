import React, { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllStatesAction, getAllCountriesAction, getAllDistrictAction, GetQualificationAction, GetAllUniversityData } from '../../../Actions/auth'

const validationSchema = yup.object().shape({
  country: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Country is required'),
  pincode: yup
    .string()
    .required('Pincode is required'),
  state: yup
    .object()
    .shape({
      label: yup.string().required('State is required'),
      value: yup.string().required('State is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('State is required'),
  district: yup
    .object()
    .shape({
      label: yup.string().required('District is required'),
      value: yup.string().required('District is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('District is required'),
  qualification: yup
    .object()
    .shape({
      label: yup.string().required('Highest Qualification is required'),
      value: yup.string().required('Highest Qualification is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Highest Qualification is required'),
  lQualification: yup
    .object()
    .shape({
      label: yup.string().required('Last Qualification is required'),
      value: yup.string().required('Last Qualification is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Last Qualification is required'),
  certificate: yup
    .object()
    .shape({
      label: yup.string().required('Certificate is required'),
      value: yup.string().required('Certificate is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Certificate is required'),
  university: yup
    .object()
    .shape({
      label: yup.string().required('University is required'),
      value: yup.string().required('University is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('University is required'),
  suniversity: yup
    .object()
    .shape({
      label: yup.string().required('University is required'),
      value: yup.string().required('University is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('University is required'),
  iuniversity: yup
    .object()
    .shape({
      label: yup.string().required('University is required'),
      value: yup.string().required('University is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('University is required'),
  month: yup
    .object()
    .shape({
      label: yup.string().required('Month is required'),
      value: yup.string().required('Month is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Month is required'),
  year: yup
    .object()
    .shape({
      label: yup.string().required('Year is required'),
      value: yup.string().required('Year is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Year is required')
})
function EducationDetails (props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect(() => {
    dispatch(getAllStatesAction())
    dispatch(getAllCountriesAction())
    dispatch(getAllDistrictAction())
    dispatch(GetQualificationAction())
    dispatch(GetAllUniversityData())
  }, [])
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register()
  const [state, setState] = useState([])
  const [country, setCountry] = useState([])
  const [district, setDistrict] = useState([])
  const [qualification, setQualification] = useState([])
  const [university, setUniversity] = useState([])
  const countriesArray = useSelector(state => state.auth.countriesData)
  const statesData = useSelector(state => state.auth.statesData)
  const districtData = useSelector(state => state.auth.districtData)
  const qualificationData = useSelector(state => state.auth.qData)
  const universityData = useSelector(state => state.auth.universityData)
  const previousProps = useRef({ statesData, countriesArray, districtData, qualificationData }).current
  console.log('location****', location)
  // Form onSubmit Method
  const onSubmit = data => {
    // eslint-disable-next-line react/prop-types
    props.setNow(66.6)
    console.log('data', data)
    console.log('location', location)
    const studentData = {
      first_name: location.state.data.firstName,
      middle_name: location.state.data.middleName,
      last_name: location.state.data.lastName,
      email: location.state.data.email,
      mobile: location.state.data.mobileNumber,
      dob: location.state.data.dob,
      gender: location.state.data.gender,
      father_name: location.state.data.fName,
      mother_name: location.state.data.mName,
      password: location.state.data.password,
      OTP: location.state.data.otp,
      is_verify: 'y',
      is_active: 'y',
      professional_expertness: location.state.data.professional,
      created_by: 'ollato',
      updated_by: 'ollato',
      country_id: Number(data.country.value),
      city_id: Number(data.district.value),
      pin_code: Number(data.pincode),
      high_qualification_id: Number(data.qualification.value),
      high_university_id: Number(data.university.value),
      last_qualification_id: Number(data.lQualification.value),
      last_university_id: Number(data.suniversity.value),
      certificate_qualification_id: Number(data.certificate.value),
      certificate_university_id: Number(data.iuniversity.value),
      experience_year: Number(data.year.value),
      experience_month: Number(data.month.value),
      state_id: Number(data.state.value),
      resume: location.state.data.file
    }
    console.log('studentData', studentData)
    // eslint-disable-next-line no-empty
    if (studentData) {
      navigate('/kycdetails', { state: { data: studentData } })
    }
    reset()
  }
  /* for highestQualification */
  useEffect(() => {
    if (previousProps?.qualificationData !== qualificationData) {
      const array = []
      if (qualificationData) {
        // eslint-disable-next-line array-callback-return
        qualificationData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setQualification(array)
      }
    }
    return () => {
      previousProps.qualificationData = qualificationData
    }
  }, [qualificationData])
  // const highestQualification = [{ value: '10th', label: '10th' }, { value: '12th', label: '12th' }]
  // const [selectedHighestQualification, setSelectedHighestQualification] = useState([{ value: '10th', label: '10th' }])
  /* for LastQualification */
  // const lastQualification = [{ value: '10th', label: '10th' }, { value: '12th', label: '12th' }]
  // const [selectedLastQualification, setSelectedLastQualification] = useState([{ value: '10th', label: '10th' }])
  /* for University */
  // const university = [{ value: 'C.B.S.E.', label: 'C.B.S.E.' }, { value: 'G.S.E.B.', label: 'G.S.E.B.' }]
  // const [selectedUniversity, setSelectedUniversity] = useState([{ value: 'C.B.S.E.', label: 'C.B.S.E.' }])
  useEffect(() => {
    if (previousProps?.universityData !== universityData) {
      const array = []
      if (universityData) {
        // eslint-disable-next-line array-callback-return
        universityData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setUniversity(array)
      }
    }
    return () => {
      previousProps.universityData = universityData
    }
  }, [universityData])
  /* for Certification */
  // const certification = [{ value: 'Indian', label: 'Indian' }, { value: 'Americans', label: 'Americans' }]
  // const [selectedCertification, setSelectedCertification] = useState([{ value: 'Indian', label: 'Indian' }])
  /* for country */
  useEffect(() => {
    if (previousProps?.countriesArray !== countriesArray) {
      const array = []
      if (countriesArray) {
        // eslint-disable-next-line array-callback-return
        countriesArray.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setCountry(array)
      }
    }
    return () => {
      previousProps.countriesArray = countriesArray
    }
  }, [countriesArray])
  //   const country = [{ value: 'India', label: 'India' }, { value: 'USA', label: 'USA' }, { value: 'UAE', label: 'UAE' }]
  const [selectedCountry] = useState([{ value: 'India', label: 'India' }])
  /* for state */
  useEffect(() => {
    if (previousProps?.statesData !== statesData) {
      const array = []
      if (statesData) {
        // eslint-disable-next-line array-callback-return
        statesData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setState(array)
      }
    }
    return () => {
      previousProps.statesData = statesData
    }
  }, [statesData])
  //   const state = [{ value: 'Gujrat', label: 'Gujrat' }, { value: 'Newyork', label: 'Newyork' }]
  const [selectedState] = useState([{ value: 'Gujrat', label: 'Gujrat' }])
  /* for District */
  useEffect(() => {
    if (previousProps?.districtData !== districtData) {
      const array = []
      if (districtData) {
        // eslint-disable-next-line array-callback-return
        districtData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setDistrict(array)
      }
    }
    return () => {
      previousProps.districtData = districtData
    }
  }, [districtData])
  //   const district = [{ value: 'Ahmedabad', label: 'Ahmedabad' }, { value: 'Surat', label: 'Surat' }]
  const [selectedDistrict] = useState([{ value: 'Ahmedabad', label: 'Ahmedabad' }])
  /* for Year */
  const year = [{ value: '2010', label: '2010' }, { value: '2011', label: '2011' }, { value: '2012', label: '2012' }, { value: '2013', label: '2013' }, { value: '2014', label: '2014' }, { value: '2015', label: '2015' }, { value: '2016', label: '2016' }, { value: '2017', label: '2017' }, { value: '2018', label: '2018' }, { value: '2019', label: '2019' }]
  // const [selectedYear, setSelectedYear] = useState([{ value: 'ABC Schools', label: 'ABC Schools' }])
  /* for month */
  const month = [{ value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' }, { value: '5', label: '5' }, { value: '6', label: '6' }, { value: '7', label: '7' }, { value: '8', label: '8' }, { value: '9', label: '9' }, { value: '10', label: '10' }, { value: '11', label: '11' }, { value: '12', label: '12' }]
  // const [selectedMonth, setSelectedMonth] = useState([{ value: 'ABC Schools', label: 'ABC Schools' }])
  return (
    <>
    <Form>
        <div className="light-bg-box bottom-space-none">
            <h4>Counsellor Address</h4>
            <div className="row">
                <div className="col-xl-6">
                    <Form.Group className="form-group common-select-style" controlId="formfullname">
                        <Form.Label>Country</Form.Label>
                             <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Controller
                                    name="country"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                        // defaultValue={options[0]}
                                        {...field}
                                        isClearable // enable isClearable to demonstrate extra error handling
                                        isSearchable={false}
                                        placeholder={'Select Country'}
                                        className="react-dropdown"
                                        classNamePrefix="dropdown"
                                        Value={selectedCountry}
                                        // onChange={setSelectedCountry}
                                        options={country}
                                        />
                                    )}
                                />
                             <p className="error-msg">{errors.country?.message || errors.country?.label.message}</p>
                            </Form.Group>
                    </Form.Group>
                </div>
                <div className="col-xl-6">
                  <Form.Group className="form-group common-select-style" controlId="formfullname">
                    <Form.Label>State</Form.Label>
                        {/* <Select isSearchable={false} Value={selectedState} onChange={setSelectedState} options={state} placeholder={'Select State'}/> */}
                        <Controller
                            name="state"
                            control={control}
                            render={({ field }) => (
                                <Select
                                // defaultValue={options[0]}
                                {...field}
                                isClearable // enable isClearable to demonstrate extra error handling
                                isSearchable={false}
                                Value={selectedState}
                                placeholder={'Select State'}
                                className="react-dropdown"
                                classNamePrefix="dropdown"
                                options={state}
                                />
                            )}
                        />
                        <p className="error-msg">{errors.state?.message || errors.state?.label.message}</p>
                  </Form.Group>
                </div>
            </div>
        <div className="row  ">
        <div className="col-xl-6">
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>District</Form.Label>
            {/* <Select isSearchable={false} Value={selectedDistrict} onChange={setSelectedDistrict} options={district} placeholder={'Select District'}/> */}
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedDistrict}
                  placeholder={'Select District'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={district}
                />
              )}
            />
         <p className="error-msg">{errors.district?.message || errors.district?.label.message}</p>
        </Form.Group>
        </div>
        <div className="col-xl-6">
            <Form.Group className={`form-group ${errors.pincode?.message ? 'error-occured' : ''}`} controlId="formpincode1">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter PIN Code"
                    name={name}
                    onChange={(e) => { onChange(e) }}
                    {...register('pincode', { required: true })}
                />
                <p className="error-msg">{errors.pincode?.message || errors.pincode?.label.message}</p>
            </Form.Group>
        </div>
        </div>
    </div>
    <div className="light-bg-box bottom-margin-none">
        <h4>Counsellor Details</h4>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Highest Qualification</Form.Label>
            <Form.Group className="form-group common-select-style" controlId="formfullname">
                        {/* <Select isSearchable={false} Value={selectedState} onChange={setSelectedState} options={state} placeholder={'Select State'}/> */}
                        <Controller
                            name="qualification"
                            control={control}
                            render={({ field }) => (
                                <Select
                                // defaultValue={options[0]}
                                {...field}
                                isClearable // enable isClearable to demonstrate extra error handling
                                isSearchable={false}
                                Value={selectedState}
                                placeholder={'Select Qualification'}
                                className="react-dropdown"
                                classNamePrefix="dropdown"
                                options={qualification}
                                />
                            )}
                        />
                        <p className="error-msg">{errors.qualification?.message || errors.qualification?.label.message}</p>
                  </Form.Group>
            {/* <Select isSearchable={false} Value={selectedHighestQualification} onChange={setSelectedHighestQualification} options={highestQualification} placeholder={'Select Highest Qualification'}/> */}
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>University/Institution</Form.Label>
            {/* <Select isSearchable={true} Value={selectedUniversity} onChange={setSelectedUniversity} options={university} placeholder={'Select University/Institution'}/> */}
            <Controller
                          name="university"
                          control={control}
                          render={({ field }) => (
                              <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              Value={selectedState}
                              placeholder={'Select Qualification'}
                              className="react-dropdown"
                              classNamePrefix="dropdown"
                              options={university}
                              />
                          )}
                        />
                        <p className="error-msg">{errors.university?.message || errors.university?.label.message}</p>
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Last Qualification</Form.Label>
            {/* <Select isSearchable={true} Value={selectedLastQualification} onChange={setSelectedLastQualification} options={lastQualification} placeholder={'Select Last Qualification'}/> */}
            <Form.Group className="form-group common-select-style" controlId="formfullname">
                        {/* <Select isSearchable={false} Value={selectedState} onChange={setSelectedState} options={state} placeholder={'Select State'}/> */}
                        <Controller
                            name="lQualification"
                            control={control}
                            render={({ field }) => (
                                <Select
                                // defaultValue={options[0]}
                                {...field}
                                isClearable // enable isClearable to demonstrate extra error handling
                                isSearchable={false}
                                // Value={selectedState}
                                placeholder={'Select Qualification'}
                                className="react-dropdown"
                                classNamePrefix="dropdown"
                                options={qualification}
                                />
                            )}
                        />
                        <p className="error-msg">{errors.lQualification?.message || errors.lQualification?.label.message}</p>
                  </Form.Group>
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>University/Institution</Form.Label>
            <Controller
                          name="suniversity"
                          control={control}
                          render={({ field }) => (
                              <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              Value={selectedState}
                              placeholder={'Select Qualification'}
                              className="react-dropdown"
                              classNamePrefix="dropdown"
                              options={university}
                              />
                          )}
                        />
                        <p className="error-msg">{errors.suniversity?.message || errors.suniversity?.label.message}</p>
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Certification</Form.Label>
            {/* <Select isSearchable={true} Value={selectedCertification} onChange={setSelectedCertification} options={certification} placeholder={'Select Certification'}/> */}
            <Form.Group className="form-group common-select-style" controlId="formfullname">
                        {/* <Select isSearchable={false} Value={selectedState} onChange={setSelectedState} options={state} placeholder={'Select State'}/> */}
                        <Controller
                            name="certificate"
                            control={control}
                            render={({ field }) => (
                                <Select
                                // defaultValue={options[0]}
                                {...field}
                                isClearable // enable isClearable to demonstrate extra error handling
                                isSearchable={false}
                                // Value={selectedState}
                                placeholder={'Select Certificate'}
                                className="react-dropdown"
                                classNamePrefix="dropdown"
                                options={qualification}
                                />
                            )}
                        />
                        <p className="error-msg">{errors.certificate?.message || errors.certificate?.label.message}</p>
                  </Form.Group>
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>University/Institution</Form.Label>
            <Controller
                          name="iuniversity"
                          control={control}
                          render={({ field }) => (
                              <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              Value={selectedState}
                              placeholder={'Select Qualification'}
                              className="react-dropdown"
                              classNamePrefix="dropdown"
                              options={university}
                              />
                          )}
                        />
                        <p className="error-msg">{errors.iuniversity?.message || errors.iuniversity?.label.message}</p>
        </Form.Group>
    </div>
    <div className="light-bg-box bottom-space-none">
    <h4>Experiences</h4>
        <div className="row ">
          <div className="col-xl-6">
          <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Year</Form.Label>
            {/* <Select isSearchable={true} Value={selectedYear} onChange={setSelectedYear} options={year} placeholder={'Select Year'}/> */}
            <Controller
                          name="year"
                          control={control}
                          render={({ field }) => (
                              <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              Value={selectedState}
                              placeholder={'Select Year'}
                              className="react-dropdown"
                              classNamePrefix="dropdown"
                              options={year}
                              />
                          )}
                        />
                        <p className="error-msg">{errors.year?.message || errors.year?.label.message}</p>
          </Form.Group>
          </div>
          <div className="col-xl-6">
          <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Month</Form.Label>
            {/* <Select isSearchable={true} Value={selectedMonth} onChange={setSelectedMonth} options={month} placeholder={'Select Month'}/> */}
            <Controller
                          name="month"
                          control={control}
                          render={({ field }) => (
                              <Select
                              // defaultValue={options[0]}
                              {...field}
                              isClearable // enable isClearable to demonstrate extra error handling
                              isSearchable={false}
                              Value={selectedState}
                              placeholder={'Select Year'}
                              className="react-dropdown"
                              classNamePrefix="dropdown"
                              options={month}
                              />
                          )}
                        />
                        <p className="error-msg">{errors.month?.message || errors.month?.label.message}</p>
        </Form.Group>
          </div>
        </div>
    </div>
    </Form>
    <Form>
              <Button variant="primary" type="submit" className='theme-btn large-btn' onClick={handleSubmit(onSubmit)}> Next </Button>
            </Form>
    </>
  )
}

export default EducationDetails
