import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { getSpecificCityData } from '../../../Actions/Admin/cities'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllCountriesAction,
  getAllStatesAction
} from '../../../Actions/auth'

function ViewCity () {
  // Constant
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()

  // useState
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])

  // useSelector
  const countryArry = useSelector((state) => state.auth.countriesData)
  const stateArray = useSelector((state) => state.auth.statesData)
  const mainData = useSelector((state) => state.city.resData)
  const previousProps = useRef({ stateArray, countryArry }).current

  // useForm
  const { register, reset } = useForm({})

  // useEffect to get data by id
  useEffect(() => {
    dispatch(getSpecificCityData(Number(id), token))
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
  }, [])

  // Country
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

  // State
  useEffect(() => {
    if (previousProps?.stateArray !== stateArray) {
      const array = []
      if (stateArray) {
        // eslint-disable-next-line array-callback-return
        stateArray.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setState(array)
      }
    }
    return () => {
      previousProps.statesData = stateArray
    }
  }, [stateArray])

  // reSet
  useEffect(() => {
    if (mainData && country?.length && state?.length) {
      const contryV = country.filter((c) => c.value === mainData?.county_id)[0]
      const stateV = state?.filter((s) => s.value === mainData?.state_id)[0]
      reset({
        country: contryV,
        state: stateV,
        cityName: mainData?.title,
        cityAbbreviation: mainData?.abbreviation
      })
    }
  }, [mainData, country, state])
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
              <h5>View City</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/city-management')}
                >
                  Cancel
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
                      <Form.Control
                        type='text'
                        disabled
                        {...register('country.label')}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formstatename'
                    >
                      <Form.Label>State Name</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        {...register('state.label')}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formcityname'>
                      <Form.Label>City Name</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        placeholder='Enter City Name'
                        {...register('cityName', {
                          required: 'true'
                        })}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formcityname'>
                      <Form.Label>City Abbreviation</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        {...register('cityAbbreviation', {
                          required: 'true'
                        })}
                      />
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

export default ViewCity
