import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpecificSchoolData, editSpecificSchool } from '../../../Actions/Admin/school'
import { getAllCountriesAction, getAllStatesAction, getAllDistrictAction, getAllBoardsAction } from '../../../Actions/auth'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  schoolName: yup.string().required('School name is required'),
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
      label: yup.string().required('Board is required'),
      value: yup.string().required('Board is required')
    })
    .nullable()
    .required('Board is required'),
  address1: yup.string().required('Address-1 is required'),
  address2: yup.string().required('Address-2 is required'),
  pincode: yup.string().required('Pincode is required')

})

function EditSchool () {
  const { enqueueSnackbar } = useSnackbar()
  const { control, register, handleSubmit, formState: { errors }, reset, getValues } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register()
  const onSubmit = data => {
    console.log('data', data)
    const schoolData = {
      id: Number(id),
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
    console.log('schoolData', schoolData)
    if (schoolData) {
      dispatch(editSpecificSchool(schoolData, token))
    }
  }

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = params.id
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (id) {
      dispatch(getSpecificSchoolData(Number(id)
        , token))
    }
  }, [id])
  useEffect(() => {
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
    dispatch(getAllDistrictAction())
    dispatch(getAllBoardsAction())
  }, [])
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [district, setDistrict] = useState([])
  const [boardsArray, setBoardsArray] = useState([])
  const specificSchoolData = useSelector(state => state.school.specificSchoolData)
  const countriesArray = useSelector(state => state.auth.countriesData)
  const statesData = useSelector(state => state.auth.statesData)
  const districtData = useSelector(state => state.auth.districtData)
  const boardData = useSelector(state => state.auth.boardsData)
  const isSchoolDataEdited = useSelector(state => state.school.isSchoolEdited)
  const isSchoolEditedMessage = useSelector(state => state.school.resMessage)
  const previousProps = useRef({ specificSchoolData, statesData, districtData, boardData, isSchoolDataEdited, isSchoolEditedMessage }).current
  // const previousProps = useRef({ specificSchoolData }).current
  useEffect(() => {
    if (previousProps?.isSchoolDataEdited !== isSchoolDataEdited) {
      if (isSchoolDataEdited) {
        enqueueSnackbar(`${isSchoolEditedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/school-management')
        reset()
      } else if (isSchoolDataEdited === false) {
        enqueueSnackbar(`${isSchoolEditedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isSchoolDataEdited = isSchoolDataEdited
    }
  }, [isSchoolDataEdited])
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

  /* for state */
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
        setState(array)
      }
    }
    return () => {
      previousProps.countriesArray = countriesArray
    }
  }, [countriesArray])

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

  /* for Board */
  useEffect(() => {
    if (previousProps?.boardData !== boardData) {
      const array = []
      if (boardData) {
        // eslint-disable-next-line array-callback-return
        boardData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setBoardsArray(array)
      }
    }
    return () => {
      previousProps.boardData = boardData
    }
  }, [boardData])

  const handleclick = () => {
    navigate('/school-management')
  }
  console.log('hello')
  useEffect(() => {
    if (specificSchoolData && country?.length && state?.length && district?.length) {
      const countryV = country.filter(c => c.value === specificSchoolData?.county_id)[0]
      const stateV = state?.filter(s => s.value === specificSchoolData?.state_id)[0]
      const districtV = district?.filter(d => d.value === specificSchoolData?.city_id)[0]
      const boardV = boardsArray?.filter(b => b.value === specificSchoolData?.board_id)[0]
      console.log('testBoard', boardV)
      console.log('board', boardsArray)
      reset({
        country: countryV,
        state: stateV,
        district: districtV,
        board: boardV
      })
    }
  }, [specificSchoolData, country, state, district])
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Edit School' title="School"/>
              <div className='main-layout'>
               <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
               <div className="heading-box">
                      <h5>Edit School</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none' onClick={handleclick}>Cancel</button>
                        <button type='submit' className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">

                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formschoolfullname">
                                <Form.Label>School Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Full Name"
                                  name={name}
                                  {...register('schoolName', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={ specificSchoolData?.title ? specificSchoolData?.title : ' ' }
                                />
                                {
                                  errors?.schoolName?.message && <p className="error-msg">{errors?.schoolName?.message || errors?.schoolName.message}</p>
                                }
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formschoolabbreviation">
                                <Form.Label>School Abbreviation</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Abbreviation"
                                  name={name}
                                  {...register('schoolAbb', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={ specificSchoolData?.abbreviation ? specificSchoolData?.abbreviation : '' }
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
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
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>State</Form.Label>
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
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>District</Form.Label>
                                <Controller
                        name='district'
                        control={control}
                        render={({ field: { onChange, value = {} } }) => {
                          return (
                          <Select
                            placeholder={'Select District'}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            options={district}
                            value={value || getValues()?.district}
                            onChange={(e) => {
                              onChange(e)
                            }}
                          />
                          )
                        }}
                      />
                                <p className='error-msg'>
                        {errors.district?.message ||
                          errors.district?.label.message}
                      </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>Board</Form.Label>
                                <Controller
                        name='board'
                        control={control}
                        render={({ field: { onChange, value = {} } }) => (
                          <Select
                          placeholder={'Select board'}
                          className='react-dropdown'
                          classNamePrefix='dropdown'
                          options={boardsArray}
                          value={value || getValues()?.boardsArray}
                          onChange={(e) => {
                            onChange(e)
                          }}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.board?.message || errors.board?.label.message}
                      </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formaddressline1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line 1"
                                  name={name}
                                  {...register('address1', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={ specificSchoolData?.address_1 ? specificSchoolData?.address_1 : '' }
                                />
                                {
                                  errors?.address1?.message && <p className="error-msg">{errors?.address1?.message || errors?.address1.message}</p>
                                }
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                            <Form.Group className="form-group" controlId="formaddressline2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line 2"
                                  name={name}
                                  {...register('address2', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={ specificSchoolData?.address_2 }
                                />
                                {
                                  errors?.address2?.message && <p className="error-msg">{errors?.address2?.message || errors?.address2.message}</p>
                                }
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formpincode">
                                <Form.Label>PIN Code</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter PIN Code"
                                  name={name}
                                  {...register('pincode', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={ specificSchoolData?.pin_code }
                                />
                                {
                                  errors?.pincode?.message && <p className="error-msg">{errors?.pincode?.message || errors?.pincode.message}</p>
                                }
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

export default EditSchool
