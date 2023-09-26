
import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  editSpecificCity,
  getSpecificCityData
} from '../../../Actions/Admin/cities'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesAction,
  getAllStatesAction
} from '../../../Actions/auth'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  cityName: yup.string().required('City is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
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
  cityAbbreviation: yup.string().required('City Abbreviation is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed')
})

function EditCity () {
  // Constant
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  // useState
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])

  // useSelector
  const countryArry = useSelector((state) => state.auth.countriesData)
  const stateArray = useSelector((state) => state.auth.statesData)
  const mainData = useSelector((state) => state.city.resData)
  const isEditedData = useSelector((state) => state.city.isCityEdited)
  const editedResMessage = useSelector((state) => state.city.resMessage)

  // previousProps
  const previousProps = useRef({ stateArray, countryArry, editedResMessage, isEditedData }).current

  // useEffect to get data
  useEffect(() => {
    dispatch(getSpecificCityData(Number(id), token))
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
  }, [])

  // useForm
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // onSubmit
  const onSubmit = (data) => {
    const cityData = {
      countyId: Number(data.country.value),
      stateId: Number(data.state.value),
      title: data.cityName,
      abbreviation: data.cityAbbreviation,
      id: mainData?.id
    }
    if (cityData) {
      dispatch(editSpecificCity(cityData, token))
    }
    reset()
  }

  useEffect(() => {
    if (previousProps?.countriesArray !== countryArry) {
      const array = []
      if (countryArry) {
        // eslint-disable-next-line array-callback-return
        countryArry.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setCountry(array)
      }
    }
    return () => {
      previousProps.countriesArray = countryArry
    }
  }, [countryArry])

  useEffect(() => {
    if (previousProps?.stateArray !== stateArray) {
      const array = []
      if (stateArray) {
        // eslint-disable-next-line array-callback-return
        stateArray.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setState(array)
      }
    }
    return () => {
      previousProps.statesData = stateArray
    }
  }, [stateArray])

  // reSet Form
  useEffect(() => {
    if (mainData && country?.length && state?.length) {
      const contryV = country.filter(c => c.value === mainData?.county_id)[0]
      const stateV = state?.filter(s => s.value === mainData?.state_id)[0]
      reset({
        country: contryV,
        state: stateV,
        cityName: mainData?.title,
        cityAbbreviation: mainData?.abbreviation
      })
    }
  }, [mainData, country, state])

  // Notification for Edit
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/city-management')
      } else if (isEditedData === false) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isEditedData = isEditedData
    }
  }, [isEditedData])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='City' title='City' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Edit City</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/city-management')}
                >
                  Cancel
                </button>
                <button
                  className='theme-btn text-none'
                  onClick={handleSubmit(onSubmit)}
                >
                  Save
                </button>
              </div>
            </div>
            <div className='form-middle-layout'>
              <Form className='light-bg'>
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
                        render={({ field: { onChange, value = {} } }) => {
                          return (
                          <Select
                            placeholder={'Select Country'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            options={country}
                            value={value || getValues()?.country}
                            onChange={(e) => {
                              onChange(e)
                            }}
                          />
                          )
                        }}
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
                      controlId='formstatename'
                    >
                      <Form.Label>State Name</Form.Label>
                      <Controller
                        name='state'
                        control={control}
                        render={({ field: { onChange, value = {} } }) => (
                          <Select
                          placeholder={'Select State'}
                          className='react-dropdown'
                          classNamePrefix='dropdown'
                          options={state}
                          value={value || getValues()?.state}
                          onChange={(e) => {
                            onChange(e)
                          }}
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCity
