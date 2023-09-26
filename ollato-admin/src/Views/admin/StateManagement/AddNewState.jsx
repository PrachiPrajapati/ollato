import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountriesAction } from '../../../Actions/auth'
import { addStateAction } from '../../../Actions/Admin/states'

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

function AddNewState () {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const [country, setCountry] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCountriesAction())
  }, [])
  const countriesArray = useSelector((state) => state.auth.countriesData)
  const isStateDataAdded = useSelector((state) => state.state.isStateAdded)
  const isStateAddedMessage = useSelector((state) => state.state.resMessage)
  const previousProps = useRef({ countriesArray }).current

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

  const onSubmit = (data) => {
    const stateData = {
      title: data.stateName,
      countyId: Number(data.country.value),
      abbreviation: data.stateAbbreviation
    }
    if (stateData) {
      dispatch(addStateAction(stateData, token))
    }
    reset()
  }

  useEffect(() => {
    console.log('previousProps', previousProps)
    if (previousProps?.isStateDataAdded !== isStateDataAdded) {
      if (isStateDataAdded) {
        enqueueSnackbar(`${isStateAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/state-management')
      } else if (isStateDataAdded === false) {
        enqueueSnackbar(`${isStateAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isStateDataAdded = isStateDataAdded
    }
  }, [isStateDataAdded])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='State' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add State</h5>
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
                        render={({ field }) => (
                          <Select
                            // defaultValue={options[0]}
                            {...field}
                            isClearable // enable isClearable to demonstrate extra error handling
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
                    <Form.Group
                      className='form-group'
                      controlId='formstatename'
                    >
                      <Form.Label>State Abbreviation</Form.Label>
                      <Form.Control
                          type='text'
                          placeholder='Enter State Abbreviation'
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

export default AddNewState
