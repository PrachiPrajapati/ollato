import React, { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAllGradesAction, getAllCountriesAction, getAllStatesAction, getAllDistrictAction, studentRegister } from '../../../Actions/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'
// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  // standard: yup.string().required('Standard is required'),
  standard: yup
    .object()
    .shape({
      label: yup.string().required('Standard is required'),
      value: yup.string().required('Standard is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Standard is required'),
  board: yup
    .object()
    .shape({
      label: yup.string().required('Board is required'),
      value: yup.string().required('Board is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Board is required'),
  nationality: yup
    .object()
    .shape({
      label: yup.string().required('Nationality is required'),
      value: yup.string().required('Nationality is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Nationality is required'),
  country: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Country is required'),
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
  pincode: yup
    .string()
    .required('Pincode is required'),
  school: yup
    .object()
    .shape({
      label: yup.string().required('School is required'),
      value: yup.string().required('School is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('School is required'),
  address1: yup
    .string()
    .required('Address is required'),
  address2: yup
    .string()
    .required('Address is required'),
  schoolCountry: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Country is required'),
  schoolState: yup
    .object()
    .shape({
      label: yup.string().required('State is required'),
      value: yup.string().required('State is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('State is required'),
  schoolDistrict: yup
    .object()
    .shape({
      label: yup.string().required('District is required'),
      value: yup.string().required('District is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('District is required'),
  schoolPincode: yup
    .string()
    .required('Pincode is required')
})
function EducationDetails () {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [standard, setStandard] = useState([])
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [district, setDistrict] = useState([])
  const gradesArray = useSelector(state => state.auth.gradesData)
  const countriesArray = useSelector(state => state.auth.countriesData)
  const statesData = useSelector(state => state.auth.statesData)
  const districtData = useSelector(state => state.auth.districtData)
  const registeredFlag = useSelector(state => state.auth.isRegistered)
  const registredResMessage = useSelector(state => state.auth.resMessage)
  const previousProps = useRef({ gradesArray, countriesArray, statesData, districtData, registeredFlag, registredResMessage }).current
  console.log('location', location.state.data)
  // Toastify Notification
  useEffect(() => {
    console.log('helloooooo', previousProps?.registeredFlag !== registeredFlag)
    if (previousProps?.registeredFlag !== registeredFlag) {
      if (registeredFlag) {
        enqueueSnackbar(`${registredResMessage}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
        navigate('/dashboard')
      } else if (registeredFlag === false) {
        console.log('inside')
        enqueueSnackbar(`${registredResMessage}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000
        }
        )
      }
    }
    return () => {
      previousProps.registeredFlag = registeredFlag
    }
  }, [registeredFlag])
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
  // const standard = [{ value: '10th', label: '10th' }, { value: '12th', label: '12th' }]
  const [selectedStandard] = useState([{ value: '10th', label: '10th' }])
  /* for Board */
  const board = [{ value: 1, label: 'C.B.S.E.' }, { value: 2, label: 'G.S.E.B.' }]
  const [selectedBoard] = useState([{ value: 'C.B.S.E.', label: 'C.B.S.E.' }])
  /* for nationality */
  const nationality = [{ value: 'Indian', label: 'Indian' }, { value: 'Americans', label: 'Americans' }]
  const [selectedNationality] = useState([{ value: 'Indian', label: 'Indian' }])
  /* for country */
  useEffect(() => {
    if (previousProps?.gradesArray !== gradesArray) {
      const array = []
      if (gradesArray) {
        // eslint-disable-next-line array-callback-return
        gradesArray.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setStandard(array)
      }
    }
    return () => {
      previousProps.gradesArray = gradesArray
    }
  }, [gradesArray])
  // const country = [{ value: 'India', label: 'India' }, { value: 'USA', label: 'USA' }, { value: 'UAE', label: 'UAE' }]
  const [selectedCountry] = useState([{ value: 'India', label: 'India' }])
  /* for state */
  // const state = [{ value: 'Gujrat', label: 'Gujrat' }, { value: 'Newyork', label: 'Newyork' }]
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
  const [selectedState] = useState([{ value: 'Gujrat', label: 'Gujrat' }])
  /* for District */
  // const district = [{ value: 'Ahmedabad', label: 'Ahmedabad' }, { value: 'Surat', label: 'Surat' }]
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
  const [selectedDistrict] = useState([{ value: 'Ahmedabad', label: 'Ahmedabad' }])
  /* for School */
  const school = [{ value: 1, label: 'ABC Schools' }, { value: 2, label: 'GEC Schools' }]
  const [selectedSchool] = useState([{ value: 'ABC Schools', label: 'ABC Schools' }])
  const { control, register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('pincode', 'address1', 'address2')

  // function to get all grades
  useEffect(() => {
    dispatch(getAllGradesAction())
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
    dispatch(getAllDistrictAction())
  }, [])

  // Form onSubmit Method
  const onSubmit = data => {
    console.log('data', data)
    const studentData = {
      // center_id: 1,
      // counselor_id: 1,
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
      verified_at: new Date(),
      grade_id: Number(data.standard.value),
      board_id: Number(data.board.value),
      school_id: Number(data.school.value),
      nationality: data.nationality.value,
      student_country_id: Number(data.country.value),
      student_state_id: Number(data.state.value),
      student_district: data.district.value,
      school_address_1: data.address1,
      school_address_2: data.address2,
      school_country_id: Number(data.schoolCountry.value),
      school_state_id: Number(data.schoolState.value),
      school_city_id: Number(data.schoolDistrict.value),
      school_district: data.schoolDistrict.value,
      school_pin_code: data.schoolPincode,
      school_title: data.school.value,
      contact_name: data.school.label,
      // contact_email: 'school123@gmail.com',
      // contact_mobile: '9327211438',
      area: data.address2,
      country_id: Number(data.country.value),
      state_id: Number(data.state.value),
      city_id: Number(data.district.value)
    }
    console.log('studentData', studentData)
    if (studentData) {
      dispatch(studentRegister(studentData))
    }
    reset()
  }
  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
    <div className="light-bg-box">
        <h4>Home Details</h4>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Nationality</Form.Label>
            {/* <Select isSearchable={false} Value={selectedNationality} onChange={setSelectedNationality} options={nationality} placeholder={'Select Nationality'}/> */}
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedNationality}
                  placeholder={'Select Nationality'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={nationality}
                />
              )}
            />
         <p className="error-msg">{errors.nationality?.message || errors.nationality?.label.message}</p>
        </Form.Group>
        <div className="row  ">
        <div className="col-xl-6">
          <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Country</Form.Label>
            {/* <Select isSearchable={false} Value={selectedCountry} onChange={setSelectedCountry} options={country} placeholder={'Select Country'}/> */}
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedCountry}
                  placeholder={'Select Country'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={country}
                />
              )}
            />
         <p className="error-msg">{errors.country?.message || errors.country?.label.message}</p>
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
    <div className="light-bg-box">
        <h4>School Details</h4>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Select School</Form.Label>
            {/* <Select isSearchable={false} Value={selectedSchool} onChange={setSelectedSchool} options={school} placeholder={'Select School'}/> */}
            <Controller
              name="school"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedSchool}
                  placeholder={'Select School'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={school}
                />
              )}
            />
         <p className="error-msg">{errors.school?.message || errors.school?.label.message}</p>
        </Form.Group>
        <Form.Group className="form-group common-select-style" controlId="formfullname">
            <Form.Label>Board</Form.Label>
            {/* <Select isSearchable={false} options={board} placeholder={'Select Board'}/> */}
            <Controller
              name="board"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedBoard}
                  placeholder={'Select Board'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={board}
                />
              )}
            />
         <p className="error-msg">{errors.board?.message || errors.board?.label.message}</p>
        </Form.Group>
        <Form.Group
            className="form-group common-select-style"
            // className={`form-group common-select-style ${errors.standard?.message ? 'error-occured' : ''}`}
            controlId="formfullname">
            <Form.Label>Standard</Form.Label>
            {/* <Controller
              name={name}
              control={control}
              render={({ field: { ref } }) => (
                <Select
                  isSearchable={false}
                  Value={selectedStandard}
                  options={standard}
                  placeholder={'Select Standard'}
                  inputRef={ref}
                  onChange={(e) => {
                    onChange(e)
                    setSelectedStandard()
                  }}
                 />
              )}
            /> */}
            <Controller
              name="standard"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedStandard}
                  placeholder={'Select Standard'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={standard}
                />
              )}
            />
         <p className="error-msg">{errors.standard?.message || errors.standard?.label.message}</p>
         {/* {errors.standard?.message && <Form.Text className="error-msg">{errors.standard?.message || errors.standard?.label.message} </Form.Text>} */}
        </Form.Group>
        <Form.Group className="form-group " controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address Line 1</Form.Label>
            <Form.Control
              as="textarea"
              placeholder={'Address Line 1'}
              name={name}
              onChange={(e) => { onChange(e) }}
              {...register('address1', { required: true })}
            />
         <p className="error-msg">{errors.address1?.message || errors.address1?.label.message}</p>
        </Form.Group>
        <Form.Group className="form-group " controlId="exampleForm.ControlTextarea2">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            as="textarea"
            placeholder={'Address Line 2'}
            name={name}
            onChange={(e) => { onChange(e) }}
            {...register('address2', { required: true })}
          />
         <p className="error-msg">{errors.address2?.message || errors.address2?.label.message}</p>
        </Form.Group>
        <div className="row  ">
          <div className="col-xl-6">
            <Form.Group className="form-group common-select-style" controlId="formfullname">
              <Form.Label>Country</Form.Label>
              {/* <Select isSearchable={false} Value={selectedCountry} onChange={setSelectedCountry} options={country} placeholder={'Select Country'}/> */}
              <Controller
              name="schoolCountry"
              control={control}
              render={({ field }) => (
                <Select
                  // defaultValue={options[0]}
                  {...field}
                  isClearable // enable isClearable to demonstrate extra error handling
                  isSearchable={false}
                  Value={selectedCountry}
                  placeholder={'Select Country'}
                  className="react-dropdown"
                  classNamePrefix="dropdown"
                  options={country}
                />
              )}
            />
         <p className="error-msg">{errors.schoolCountry?.message || errors.schoolCountry?.label.message}</p>
          </Form.Group>
          </div>
          <div className="col-xl-6">
            <Form.Group className="form-group common-select-style" controlId="formfullname">
              <Form.Label>State</Form.Label>
              {/* <Select isSearchable={false} Value={selectedState} onChange={setSelectedState} options={state} placeholder={'Select State'}/> */}
              <Controller
              name="schoolState"
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
         <p className="error-msg">{errors.schoolState?.message || errors.schoolState?.label.message}</p>
          </Form.Group>
          </div>
        </div>
        <div className="row ">
          <div className="col-xl-6">
          <Form.Group className="form-group common-select-style" controlId="formfullname">
              <Form.Label>District</Form.Label>
              {/* <Select isSearchable={false} Value={selectedDistrict} onChange={setSelectedDistrict} options={district} placeholder={'Select District'}/> */}
              <Controller
              name="schoolDistrict"
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
         <p className="error-msg">{errors.schoolDistrict?.message || errors.schoolDistrict?.label.message}</p>
          </Form.Group>
          </div>
          <div className="col-xl-6">
            <Form.Group className={`form-group ${errors.pincode?.message ? 'error-occured' : ''}`} controlId="formpincode2">
              <Form.Label>PIN Code</Form.Label>
              <Form.Control
                    type="number"
                    placeholder="Enter PIN Code"
                    name={name}
                    onChange={(e) => { onChange(e) }}
                    {...register('schoolPincode', { required: true })}
                />
          <p className="error-msg">{errors.schoolPincode?.message || errors.schoolPincode?.label.message}</p>
            </Form.Group>
          </div>
        </div>
    </div>
    <Button variant="primary" type="submit" className='theme-btn large-btn'>Submit</Button>
    </Form>
    </>
  )
}

export default EducationDetails
