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
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesAction } from '../../../Actions/auth'
import { editSpecificState, getSpecificState } from '../../../Actions/Admin/states'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  country: yup
    .object()
    .shape({
      label: yup.string().required('Country is required'),
      value: yup.string().required('Country is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Country is required'),
  stateName: yup.string().required('State Name is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  stateAbbreviation: yup.string().required('State Abbreviation is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed')
})
function EditState () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const countryArry = useSelector((state) => state.auth.countriesData)
  const mainData = useSelector((state) => state.state.resData)
  const isEditedData = useSelector((state) => state.state.isStateEdited)
  const { enqueueSnackbar } = useSnackbar()
  const [country, setCountry] = useState([])
  const editedResMessage = useSelector((state) => state.state.resMessage)
  const previousProps = useRef({ countryArry, editedResMessage, isEditedData }).current
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

  useEffect(() => {
    dispatch(getSpecificState(Number(id), token))
    dispatch(getAllCountriesAction())
  }, [])

  // For Country Array
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
    if (mainData && country?.length) {
      const contryV = country.filter(c => c.value === mainData?.county_id)[0]
      reset({
        country: contryV,
        stateName: mainData?.title,
        stateAbbreviation: mainData?.abbreviation
      })
    }
  }, [mainData, country])

  const onSubmit = (data) => {
    const stateData = {
      countyId: Number(data.country.value),
      title: data.stateName,
      abbreviation: data.stateAbbreviation,
      custom_id: 'r2uvmulx',
      id: mainData.id
    }
    console.log('dot', stateData)
    // eslint-disable-next-line no-empty
    if (stateData) {
      dispatch(editSpecificState(stateData, token))
    }
    reset()
  }

  // Notification
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/state-management')
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
          <TitleHeader title='State' name='State' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Edit State</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/state-management')}
                >
                  Cancel
                </button>
                <button className='theme-btn text-none' onClick={handleSubmit(onSubmit)} >Save</button>
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
                      <Form.Label>Country</Form.Label>
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
                      className='form-group'
                      controlId='formstatename'
                    >
                      <Form.Label>State Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter State Name'
                        {...register('stateName', {
                          required: 'true'
                        })}
                      />
                      {errors.stateName?.message && (
                        <Form.Text className='error-msg'>
                          {errors.stateName?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group'>
                      <Form.Label>State Abbreviation</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter State abbreviation'
                        {...register('stateAbbreviation', {
                          required: 'true'
                        })}
                      />
                      {errors.stateAbbreviation?.message && (
                        <Form.Text className='error-msg'>
                          {errors.stateAbbreviation?.message}
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

export default EditState
