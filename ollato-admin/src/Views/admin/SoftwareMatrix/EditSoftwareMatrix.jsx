import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificsoftwareMetricsData } from '../../../Actions/Admin/softwareMetrix'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { getAllSubCategory } from '../../../Actions/Admin/Test/Question'
import { profileDetail } from '../../../Actions/Admin/careerProfile'

const validationSchema = yup.object().shape({
  tAbOne: yup
    .string()
    .required('Abbrevation is requeired')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  tAbTwo: yup
    .string()
    .required('Abbrevation is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  tAbThree: yup
    .string()
    .required('Abbrevation is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  profileDetail: yup
    .object()
    .shape({
      id: yup.string().required('Profile Detail is required'),
      profile_type: yup.string().required('Profile Detail is required')
    })
    .nullable()
    .required('Profile Detail is required'),
  sortOrder: yup.string().required('Sort Order is required')
})

function EditSoftwareMatrix () {
  // Constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const navigate = useNavigate()
  const defaultValues = {
    mathDropped: false,
    scienceDropped: false
  }

  // useSelector
  const mainData = useSelector((state) => state.softwareMetrics.resData)
  console.log('mainData :>> ', mainData)
  const careerProfile = useSelector(
    (state) => state.careerProfile.careerProfileData
  )
  const subTest = useSelector((state) => state.question.testSubCategoryList)

  // useState
  const [matrixArray, setMatrixArray] = useState(
    mainData?.softwareAllMatrix || []
  )
  const [myValue, setMyValue] = useState({})

  // useEffect
  useEffect(() => {
    dispatch(getSpecificsoftwareMetricsData(Number(id), token))
    dispatch(getAllSubCategory(token))
    dispatch(profileDetail(token))
  }, [])

  useEffect(() => {
    mainData && setMatrixArray(mainData?.softwareAllMatrix)
  }, [mainData])

  // useForm
  const {
    control,
    register,
    // handleSubmit,
    getValues,
    // formState: { errors }
    reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues
  })

  useEffect(() => {
    setMyValue(mainData?.softwareAllMatrix?.map((data) => {
      return (
        console.log('data', data)
      )
    }))
  }, [mainData])
  console.log('myValue', myValue)

  // reSet Data
  useEffect(() => {
    if (mainData && careerProfile?.length) {
      const profileDetaisV = careerProfile?.find(
        (data) => data?.id === mainData?.career_profile_detail_id
      )
      reset({
        tAbOne: mainData?.test_abb_1,
        tAbTwo: mainData?.test_abb_2,
        tAbThree: mainData?.test_abb_3,
        profileDetail: profileDetaisV,
        mathDropped: mainData?.math_dropped,
        scienceDropped: mainData?.science_dropped,
        sortOrder: mainData?.sort_order,
        subTest: { label: 'anc', value: 'anc' }
      })
    }
  }, [mainData, careerProfile, matrixArray])

  // increase
  const addOption = (e, i) => {
    e.preventDefault()
    setMatrixArray([
      ...matrixArray,
      {
        norm_values: '',
        test_detail_id: ''
      }
    ])
  }

  // decrease
  const removeOption = (e, count) => {
    e.preventDefault()
    setMatrixArray(matrixArray.filter((value, index) => count !== index))
  }

  // handle Value change in matrixArray
  const handleChangeMatrixArray = (e, count) => {
    const selectedArray = matrixArray?.map((value, index) => {
      const d = e.target.value.toUpperCase()
      return count === index
        ? {
            ...value,
            norm_values: d === 'A' || d === 'B' || d === 'C' ? d : ''
          }
        : value
    })
    setMatrixArray(selectedArray)
  }

  const handleChangeSubTest = (e, count) => {
    console.log('e151', e)
    const selectedArray = matrixArray?.map((value, index) => {
      return count === index
        ? {
            ...value,
            test_detail_id: e.id
          }
        : value
    })
    setMatrixArray(selectedArray)
  }

  console.log('subTest', subTest)

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='Edit Software Matrix' title='Software Matrix' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Edit SoftwareMatrix</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/software-matrix')}
                >
                  Cancel
                </button>
                <button className='theme-btn text-none'>Save</button>
              </div>
            </div>
            <div className='form-middle-layout'>
              <Form className='light-bg'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation1'
                    >
                      <Form.Label>Test Abbrevation 1</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Test Abbrevation 1'
                        {...register('tAbOne', {
                          required: 'true'
                        })}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation2'
                    >
                      <Form.Label>Test Abbrevation 2</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Test Abbrevation 2'
                        {...register('tAbTwo', {
                          required: 'true'
                        })}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation3'
                    >
                      <Form.Label>Test Abbrevation 3</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Test Abbrevation 3'
                        {...register('tAbThree', {
                          required: 'true'
                        })}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Profile Details</Form.Label>
                      <Controller
                        name='profileDetail'
                        control={control}
                        render={({ field: { onChange, value = {} } }) => {
                          return (
                            <Select
                              isSearchable={false}
                              placeholder={'Select Profile Details'}
                              options={careerProfile}
                              getOptionLabel={(option) => option?.profile_type}
                              getOptionValue={(option) => option?.id}
                              value={value || getValues()?.subCategory}
                              onChange={(e) => {
                                onChange(e)
                              }}
                            />
                          )
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6 align-self-center'>
                    <div className='row align-items-center'>
                      <div className='col-xxl-6'>
                        <Form.Group
                          className='form-group switchbox mb-2 d-flex align-items-center'
                          controlId='formfullname'
                        >
                          <Form.Label className='mb-0'>Math Dropped</Form.Label>
                          <label className='switch'>
                            <Controller
                              name='mathDropped'
                              control={control}
                              render={({ field }) => (
                                <input
                                  type='checkbox'
                                  name='mathDropped'
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  checked={field.value}
                                />
                              )}
                            />
                            <span className='slider blue' id='round'></span>
                          </label>
                        </Form.Group>
                      </div>
                      <div className='col-xxl-6'>
                        <Form.Group
                          className='form-group switchbox mb-2 d-flex align-items-center'
                          controlId='formfullname'
                        >
                          <Form.Label className='mb-0'>
                            Science Dropped
                          </Form.Label>
                          <label className='switch'>
                            <Controller
                              name='scienceDropped'
                              control={control}
                              render={({ field }) => (
                                <input
                                  type='checkbox'
                                  onChange={(e) =>
                                    field.onChange(e.target.checked)
                                  }
                                  checked={field.value}
                                />
                              )}
                            />
                            <span className='slider blue' id='round'></span>
                          </label>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formsortorder'
                    >
                      <Form.Label>Sort Order</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Sort Order'
                        {...register('sortOrder', {
                          required: 'true'
                        })}
                      />
                    </Form.Group>
                  </div>
                  <h4 className='black-font mb-4'>Software Details</h4>
                  {matrixArray?.map((i, count) => {
                    return (
                      <>
                        <div className='grade-profile d-flex align-items-start'>
                          <div className='row addmoreaddbox d-flex align-items-start'>
                            <div className=' col-md-12 '>
                              <div className='option-item w-100'>
                                <div className='optionitembox'>
                                  <Form.Group
                                    className='form-group text-input'
                                    controlId='formoption'
                                  >
                                    <Form.Label>Norms Grade</Form.Label>
                                    <Form.Control
                                      type='text'
                                      placeholder='Enter Option'
                                      onChange={(e) =>
                                        handleChangeMatrixArray(e, count)
                                      }
                                      value={i.norm_values}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                            <div className='col-md-12'>
                              <div className='option-item w-100'>
                                <div className='optionitembox'>
                                  <Form.Group
                                    className='form-group common-select-style'
                                    controlId='formfullname'
                                  >
                                    <Form.Label>Sub Test</Form.Label>
                                    <Controller
                                      name='subTest'
                                      control={control}
                                      render={({
                                        field: { onChange, value = {} }
                                      }) => {
                                        return (
                                          <Select
                                            isSearchable={true}
                                            options={subTest}
                                            getOptionLabel={(option) =>
                                              option?.title
                                            }
                                            getOptionValue={(option) =>
                                              option?.id
                                            }
                                            placeholder={'Select SubTest'}
                                            value={subTest?.filter((data) => data?.id === mainData?.softwareAllMatrix[count]?.test_detail_id)}
                                            onChange={(e) =>
                                              handleChangeSubTest(e, count)
                                            }
                                          />
                                        )
                                      }}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='add-remove-btn'>
                            <div>
                              <button
                                className='theme-btn small-btn'
                                onClick={(e) =>
                                  addOption(e, matrixArray?.length + 1)
                                }
                              >
                                +
                              </button>
                            </div>
                            <div>
                              <button
                                className='theme-btn dark-btn'
                                onClick={(e) => removeOption(e, count)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
              </Form>
              {console.log('sof', matrixArray)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditSoftwareMatrix
