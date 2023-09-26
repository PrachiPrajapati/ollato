import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigate } from 'react-router-dom'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesAction,
  getAllStatesAction
} from '../../../Actions/auth'
import { addCityAction } from '../../../Actions/Admin/cities'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  cityName: yup
    .string()
    .required('City is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
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
  cityAbbreviation: yup
    .string()
    .required('City Abbreviation is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed')
})

function AddNewCity () {
  // Constant
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  // useState
  const [state, setState] = useState([])
  const [country, setCountry] = useState([])

  // useEffect to get data
  useEffect(() => {
    dispatch(getAllStatesAction())
    dispatch(getAllCountriesAction())
  }, [])

  // useSelector
  const countriesArray = useSelector((state) => state.auth.countriesData)
  const statesData = useSelector((state) => state.auth.statesData)
  const isCityDataAdded = useSelector((state) => state.city.isCityAdded)
  const isCityAddedMessage = useSelector((state) => state.city.resMessage)

  // previousProps
  const previousProps = useRef({
    statesData,
    countriesArray,
    isCityDataAdded,
    isCityAddedMessage
  }).current

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

  // onSubmit
  const onSubmit = (data) => {
    const cityData = {
      countyId: Number(data.country.value),
      stateId: Number(data.state.value),
      title: data.cityName,
      abbreviation: data.cityAbbreviation
    }
    if (cityData) {
      dispatch(addCityAction(cityData, token))
    }
    reset()
  }

  // Notification for Add
  useEffect(() => {
    if (previousProps?.isCityDataAdded !== isCityDataAdded) {
      if (isCityDataAdded) {
        enqueueSnackbar(`${isCityAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/city-management')
      } else if (isCityDataAdded === false) {
        enqueueSnackbar(`${isCityAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isCityDataAdded = isCityDataAdded
    }
  }, [isCityDataAdded])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='City' />
          <div className='main-layout'>
            <Form className='light-bg'>
              <div className='heading-box'>
                <h5>Add City</h5>
                <div className='btn-box'>
                  <button
                    className='theme-btn dark-btn text-none'
                    onClick={() => navigate('/city-management')}
                  >
                    Cancel
                  </button>
                  <button
                    className='theme-btn text-none'
                    type='submit'
                    form='my-form'
                    onClick={handleSubmit(onSubmit)}
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className='form-middle-layout'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Country Name</Form.Label>
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
                      <Form.Label>State Name</Form.Label>
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
                    <Form.Group className='form-group' controlId='formcityname'>
                      <Form.Label>City Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter City Name'
                        {...register('cityName', {
                          required: 'true'
                        })}
                      />
                      {errors.cityName?.message && (
                        <Form.Text className='error-msg'>
                          {errors.cityName?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formcityname'>
                      <Form.Label>City Abbreviation</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter City abbreviation'
                        {...register('cityAbbreviation', {
                          required: 'true'
                        })}
                      />
                      {errors.cityAbbreviation?.message && (
                        <Form.Text className='error-msg'>
                          {errors.cityAbbreviation?.message}
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

export default AddNewCity
