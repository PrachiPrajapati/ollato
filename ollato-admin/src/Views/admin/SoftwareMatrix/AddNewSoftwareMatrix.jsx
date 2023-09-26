import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAllSubCategory } from '../../../Actions/Admin/Test/Question'
import { profileDetail } from '../../../Actions/Admin/careerProfile'
import { addSoftwareMetricsAction } from '../../../Actions/Admin/softwareMetrix'
import { useSnackbar } from 'react-notistack'

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
  sortOrder: yup
    .string()
    .required('Sort Order is required')
})
function AddNewSoftwareMatrix () {
  // Constant
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const defaultValues = {
    mathDropped: false,
    scienceDropped: false
  }

  // useState
  const [matrixArray, setMatrixArray] = useState([
    {
      norm_values: '',
      test_detail_id: ''
    }
  ])

  // useSelector
  const subTest = useSelector((state) => state.question.testSubCategoryList)
  const careerProfile = useSelector(
    (state) => state.careerProfile.careerProfileData
  )
  const isSoftwareMatricsAdded = useSelector(state => state.softwareMetrics.isSoftwareMetricsAdded)
  const isSoftwareMatricsAddedMessage = useSelector(state => state.softwareMetrics.resMessage)

  // previousProps
  const previousProps = useRef({ isSoftwareMatricsAdded, isSoftwareMatricsAddedMessage }).current

  // useEffect for data
  useEffect(() => {
    dispatch(getAllSubCategory(token))
    dispatch(profileDetail(token))
  }, [])

  // useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
    // reset
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues
  })

  // onSubmit
  const onSubmit = (data) => {
    const softwareMatrixData = {
      testAbb1: data?.tAbOne,
      testAbb2: data?.tAbTwo,
      testAbb3: data?.tAbThree,
      mathDropped: data?.mathDropped,
      scienceDropped: data?.scienceDropped,
      careerProfileId: data?.profileDetail?.id,
      sortOrder: data?.sortOrder,
      matrixArray
    }
    if (softwareMatrixData) {
      dispatch(addSoftwareMetricsAction(softwareMatrixData, token))
    }
  }

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
            norm_values: (d === 'A' || d === 'B' || d === 'C' ? d : '')
          }
        : value
    })
    setMatrixArray(selectedArray)
  }

  const handleChangeSubTest = (e, count) => {
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

  // Notification for Add
  useEffect(() => {
    if (previousProps?.isSoftwareMatricsAdded !== isSoftwareMatricsAdded) {
      if (isSoftwareMatricsAdded) {
        enqueueSnackbar(`${isSoftwareMatricsAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/software-matrix')
      } else if (isSoftwareMatricsAdded === false) {
        enqueueSnackbar(`${isSoftwareMatricsAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isSoftwareMatricsAdded = isSoftwareMatricsAdded
    }
  }, [isSoftwareMatricsAdded])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='Add New Software Matrix' title='Software Matrix' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add New SoftwareMatrix</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/software-matrix')}
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
                      {errors.tAbOne?.message && (
                        <Form.Text className='error-msg'>
                          {errors.tAbOne?.message}
                        </Form.Text>
                      )}
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
                      {errors.tAbTwo?.message && (
                        <Form.Text className='error-msg'>
                          {errors.tAbTwo?.message}
                        </Form.Text>
                      )}
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
                      {errors.tAbThree?.message && (
                        <Form.Text className='error-msg'>
                          {errors.tAbThree?.message}
                        </Form.Text>
                      )}
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
                        render={({ field }) => (
                          <Select
                            {...field}
                            isClearable
                            isSearchable={true}
                            placeholder={'Select Profile Details'}
                            options={careerProfile}
                            getOptionLabel={(option) => option?.profile_type}
                            getOptionValue={(option) => option?.id}
                          />
                        )}
                      />
                    </Form.Group>
                    <p className='error-msg'>
                      {errors.profileDetail?.id?.message ||
                        errors?.profileDetail?.profile_type?.message}
                    </p>
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
                        type='number'
                        placeholder='Enter Sort Order'
                        {...register('sortOrder', {
                          required: 'true'
                        })}
                      />
                      {errors.sortOrder?.message && (
                        <Form.Text className='error-msg'>
                          {errors.sortOrder?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='software-det-box'>
                    <h4 className='black-font mb-4'>Software Details</h4>
                    {matrixArray.map((i, count) => {
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
                                      <Select
                                        isSearchable={true}
                                        options={subTest}
                                        getOptionLabel={(option) =>
                                          option?.title
                                        }
                                        getOptionValue={(option) => option?.id}
                                        placeholder={'Select SubTest'}
                                        onChange={(e) =>
                                          handleChangeSubTest(e, count)
                                        }
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
                </div>
              </Form>
              {console.log('mat', matrixArray)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewSoftwareMatrix
