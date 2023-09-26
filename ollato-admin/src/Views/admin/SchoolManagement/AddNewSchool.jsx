import React, { useState, useEffect, useRef } from 'react'

/* React Packages */
import { useForm, Controller } from 'react-hook-form'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'react-notistack'
import { useNavigate } from 'react-router-dom'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'

/* Action File */
import {
  getAllCountriesAction,
  getAllStatesAction,
  getAllDistrictAction,
  getAllBoardsAction
} from '../../../Actions/auth'
import { addSchoolAction } from '../../../Actions/Admin/school'

const validationSchema = yup.object().shape({
  schoolName: yup
    .string()
    .required('School name is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Characters are not allowed'),
  schoolAbb: yup
    .string()
    .required('School Abbreviation is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Characters are not allowed'),
  country: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required')
    })
    .nullable()
    .required('Country is required'),
  state: yup
    .object()
    .shape({
      label: yup.string().required('State is required'),
      value: yup.string().required('State is required')
    })
    .nullable()
    .required('State is required'),
  district: yup
    .object()
    .shape({
      label: yup.string().required('District is required'),
      value: yup.string().required('District is required')
    })
    .nullable()
    .required('District is required'),
  board: yup
    .object()
    .shape({
      label: yup.string().required('District is required'),
      value: yup.string().required('District is required')
    })
    .nullable()
    .required('Board is required'),
  address1: yup.string().required('Address-1 is required'),
  address2: yup.string().required('Address-2 is required'),
  pincode: yup
    .number()
    .positive()
    .typeError('Pincode must be a number')
    .required('Pincode is required')
})

function AddNewSchool () {
  // Constant
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const handleclick = () => {
    navigate('/school-management')
  }

  // useState
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [district, setDistrict] = useState([])
  const [boardsArray, setBoardsArray] = useState([])

  // useSelector
  const countriesArray = useSelector((state) => state.auth.countriesData)
  const statesData = useSelector((state) => state.auth.statesData)
  const districtData = useSelector((state) => state.auth.districtData)
  const boardData = useSelector((state) => state.auth.boardsData)
  const isSchoolDataAdded = useSelector((state) => state.school.isSchoolAdded)
  const isSchoolAddedMessage = useSelector((state) => state.school.resMessage)
  const previousProps = useRef({
    countriesArray,
    statesData,
    districtData,
    boardData,
    isSchoolDataAdded,
    isSchoolAddedMessage
  }).current

  // useEffect to get Data
  useEffect(() => {
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
    dispatch(getAllDistrictAction())
    dispatch(getAllBoardsAction())
  }, [])

  /* for country */
  useEffect(() => {
    if (previousProps?.countriesArray !== countriesArray) {
      const array = []
      if (countriesArray) {
        // eslint-disable-next-line array-callback-return
        countriesArray.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setCountry(array)
      }
    }
    return () => {
      previousProps.countriesArray = countriesArray
    }
  }, [countriesArray])

  /* for state */
  useEffect(() => {
    if (previousProps?.statesData !== statesData) {
      const array = []
      if (statesData) {
        // eslint-disable-next-line array-callback-return
        statesData.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setState(array)
      }
    }
    return () => {
      previousProps.statesData = statesData
    }
  }, [statesData])

  /* for District */
  useEffect(() => {
    if (previousProps?.districtData !== districtData) {
      const array = []
      if (districtData) {
        // eslint-disable-next-line array-callback-return
        districtData.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setDistrict(array)
      }
    }
    return () => {
      previousProps.districtData = districtData
    }
  }, [districtData])

  /* for Board */
  useEffect(() => {
    if (previousProps?.boardData !== boardData) {
      const array = []
      if (boardData) {
        // eslint-disable-next-line array-callback-return
        boardData.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setBoardsArray(array)
      }
    }
    return () => {
      previousProps.boardData = boardData
    }
  }, [boardData])

  // useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // onSubmit
  const onSubmit = (data) => {
    const schoolData = {
      title: data.schoolName,
      abbreviation: data.schoolAbb,
      address_1: data.address1,
      address_2: data.address2,
      county_id: Number(data.country.value),
      state_id: Number(data.state.value),
      city_id: Number(data.district.value),
      board_id: Number(data.board.value),
      pin_code: data.pincode
    }
    if (schoolData) {
      dispatch(addSchoolAction(schoolData, token))
    }
  }

  // Notification for add
  useEffect(() => {
    if (previousProps?.isSchoolDataAdded !== isSchoolDataAdded) {
      if (isSchoolDataAdded) {
        enqueueSnackbar(`${isSchoolAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/school-management')
        reset()
      } else if (isSchoolDataAdded === false) {
        enqueueSnackbar(`${isSchoolAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isSchoolDataAdded = isSchoolDataAdded
    }
  }, [isSchoolDataAdded])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='School List' title='School' />
          <div className='main-layout'>
            <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
              <div className='heading-box'>
                <h5>Add School</h5>
                <div className='btn-box'>
                  <button
                    className='theme-btn dark-btn text-none'
                    onClick={handleclick}
                  >
                    Cancel
                  </button>
                  <button className='theme-btn text-none'>Save</button>
                </div>
              </div>
              <div className='form-middle-layout'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formschoolfullname'
                    >
                      <Form.Label>School Full Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter School Full Name'
                        name={name}
                        {...register('schoolName', { required: true })}
                      />
                      {errors.schoolName?.message && (
                        <Form.Text className='error-msg'>
                          {errors.schoolName?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formschoolabbreviation'
                    >
                      <Form.Label>School Abbreviation</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter School Abbreviation'
                        name={name}
                        {...register('schoolAbb', { required: true })}
                      />
                      <p className='error-msg'>
                        {errors.schoolAbb?.message || errors.schoolAbb?.message}
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Country</Form.Label>
                      <Controller
                        name='country'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isClearable
                            isSearchable={false}
                            placeholder={'Select Country'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            getOptionLabel={(option) => option?.label}
                            getOptionValue={(option) => option?.value}
                            options={country}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.country?.message ||
                          errors.country?.label.message}
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>State</Form.Label>
                      <Controller
                        name='state'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isClearable
                            isSearchable={false}
                            placeholder={'Select State'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            options={state}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.state?.message || errors.state?.label.message}
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>District</Form.Label>
                      <Controller
                        name='district'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isClearable
                            isSearchable={false}
                            placeholder={'Select District'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            options={district}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.district?.message ||
                          errors.district?.label.message}
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Board</Form.Label>
                      <Controller
                        name='board'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            isClearable
                            isSearchable={false}
                            placeholder={'Select Board'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            options={boardsArray}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.board?.message || errors.board?.label.message}
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formaddressline1'
                    >
                      <Form.Label>Address Line 1</Form.Label>
                      <Form.Control
                        as='textarea'
                        placeholder='Enter Address Line 1'
                        name={name}
                        {...register('address1', { required: true })}
                      />
                      {errors.address1?.message && (
                        <Form.Text className='error-msg'>
                          {errors.address1?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formaddressline2'
                    >
                      <Form.Label>Address Line 2</Form.Label>
                      <Form.Control
                        as='textarea'
                        name={name}
                        placeholder='Enter Address Line 2'
                        {...register('address2', { required: true })}
                      />
                      {errors.address2?.message && (
                        <Form.Text className='error-msg'>
                          {errors.address2?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formpincode1'>
                      <Form.Label>PIN Code</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter PIN Code'
                        name={name}
                        {...register('pincode', { required: true })}
                      />
                      {errors.pincode?.message && (
                        <Form.Text className='error-msg'>
                          {errors.pincode?.message}{' '}
                        </Form.Text>
                      )}
                    </Form.Group>
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

export default AddNewSchool
