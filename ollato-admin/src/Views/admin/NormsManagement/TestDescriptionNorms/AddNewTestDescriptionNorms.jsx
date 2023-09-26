import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNormsList } from '../../../../Actions/Admin/Norms/norms'
import { getAllMainCategoriesDataAction } from '../../../../Actions/Admin/test'
import { getAllSubCategory } from '../../../../Actions/Admin/Test/Question'
import { createTestNormsDescription } from '../../../../Actions/Admin/Norms/TestNormsDescription/TestNormsDescription'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  norms: yup
    .object()
    .shape({
      id: yup.string().required('Norms is required'),
      title: yup.string().required('Norms is required')
    })
    .nullable()
    .required('Norms is required'),
  test: yup
    .object()
    .shape({
      id: yup.string().required('Test is required'),
      title: yup.string().required('Test is required')
    })
    .nullable()
    .required('Test is required'),
  subTest: yup
    .object()
    .shape({
      id: yup.string().required('Sub Test is required'),
      title: yup.string().required('Sub Test is required')
    })
    .nullable()
    .required('Sub Test is required'),
  testDescription: yup.string().required('Description is required'),
  planOfAction: yup.string().required('Plan of Action is required')
})

function AddNewTestDescriptionNorms () {
  // constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  // useSelector
  const normsArray = useSelector((state) => state.norms.normsList)
  const testArray = useSelector(state => state.test.mainCategoryData)
  const subTestArray = useSelector(state => state.question.testSubCategoryList)
  const isTestNormsDescriptionAdded = useSelector((state) => state.testNormsDescription.isTestNormsDesscriptionAdded)
  const isTestNormsDescriptionAddedMessage = useSelector((state) => state.testNormsDescription.resMessage)

  // useEffect
  useEffect(() => {
    dispatch(getAllNormsList(token))
    dispatch(getAllMainCategoriesDataAction(token))
    dispatch(getAllSubCategory(token))
  }, [])

  // previousProps
  const previousProps = useRef({
    isTestNormsDescriptionAdded,
    isTestNormsDescriptionAddedMessage
  }).current

  // useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // onSubmit
  const onSubmit = (data) => {
    const testNormsDescriptionData = {
      norm_id: data.norms.id,
      norm: data?.norms?.code,
      test_id: data?.test?.id,
      test_detail_id: data?.subTest?.id,
      description: data.testDescription,
      plan_of_action: data.planOfAction
    }
    if (testNormsDescriptionData) {
      dispatch(createTestNormsDescription(testNormsDescriptionData, token))
    }
  }

  // Notification for Add
  useEffect(() => {
    if (previousProps?.isTestNormsDescriptionAdded !== isTestNormsDescriptionAdded) {
      if (isTestNormsDescriptionAdded) {
        enqueueSnackbar(`${isTestNormsDescriptionAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management/test-description-norms')
      } else if (isTestNormsDescriptionAdded === false) {
        enqueueSnackbar(`${isTestNormsDescriptionAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isTestNormsDescriptionAdded = isTestNormsDescriptionAdded
    }
  }, [isTestNormsDescriptionAdded])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader
            name='Add New TestDescription Norms'
            title='Norms Management'
          />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add New TestDescription Norms</h5>
              <div className='btn-box'>
                <button className='theme-btn dark-btn text-none' onClick={() => navigate('/norms-management/test-description-norms')} >Cancel</button>
                <button className='theme-btn text-none' onClick={handleSubmit(onSubmit)}>Save</button>
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
                      <Form.Label>Norms</Form.Label>
                      <Controller
                        name='norms'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            placeholder={'Select Norms'}
                            getOptionLabel={(option) => option?.title}
                            getOptionValue={(option) => option?.id}
                            options={normsArray}
                          />
                        )}
                      />
                      <p className='error-msg'>
                      {errors.norms?.title?.message || errors.norms?.id?.message }
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Test</Form.Label>
                      <Controller
                        name='test'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder={'Select Test'}
                            getOptionLabel={(option) => option?.title}
                            getOptionValue={(option) => option?.id}
                            options={testArray}
                          />
                        )}
                      />
                      <p className='error-msg'>
                        {errors.test?.title?.message || errors.test?.id?.message }
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>SubTest</Form.Label>
                      <Controller
                        name='subTest'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            placeholder={'Select SubTest'}
                            getOptionLabel={(option) => option?.title}
                            getOptionValue={(option) => option?.id}
                            options={subTestArray}
                          />
                        )}
                      />
                      <p className='error-msg'>
                      {errors.subTest?.title?.message || errors.subTest?.id?.message }
                      </p>
                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <Form.Group
                          className='form-group'
                          controlId='formdescription'
                        >
                          <Form.Label>Test Description</Form.Label>
                          <Form.Control
                            as='textarea'
                            className='big-textarea'
                            placeholder='Enter Test Description'
                            {...register('testDescription', {
                              required: 'true'
                            })}
                          />
                          {errors.testDescription?.message && (
                          <Form.Text className='error-msg'>
                            {errors.testDescription?.message}
                          </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group
                          className='form-group'
                          controlId='formplanofaction'
                        >
                          <Form.Label>Plan of action</Form.Label>
                          <Form.Control
                            as='textarea'
                            className='big-textarea'
                            placeholder='Enter Plan of action'
                            {...register('planOfAction', {
                              required: 'true'
                            })}
                          />
                          {errors.planOfAction?.message && (
                          <Form.Text className='error-msg'>
                            {errors.planOfAction?.message}
                          </Form.Text>
                          )}
                        </Form.Group>
                      </div>
                    </div>
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

export default AddNewTestDescriptionNorms
