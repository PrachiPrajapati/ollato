import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createTestTimeNorms, getAllGreade } from '../../../../Actions/Admin/Norms/TestTimeNorms/TestTimeNorms'
import { getAllTestCategory } from '../../../../Actions/Admin/Test/Question'
import { useSnackbar } from 'react-notistack'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = yup.object().shape({
  grade: yup
    .object()
    .shape({
      id: yup.string().required('Grade is required'),
      title: yup.string().required('Grade is required')
    })
    .nullable()
    .required('Grade is required'),
  test: yup
    .object()
    .shape({
      id: yup.string().required('Test is required'),
      title: yup.string().required('Test is required')
    })
    .nullable()
    .required('Test is required'),
  time: yup.string().required('Time is required')
})

function AddNewTestTimeNorms () {
  // Constanst
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')

  // useSelector
  const gradeArray = useSelector((state) => state.testTimeNorms.gradeList)
  const testArray = useSelector((state) => state.question.testCategoryList)
  const isTestTimeNormsAdded = useSelector(state => state.testTimeNorms.isTestTimeNormsAdded)
  const isTestTimeNormsAddedMessage = useSelector(state => state.testTimeNorms.resMessage)

  // previousProps
  const previousProps = useRef({ isTestTimeNormsAdded, isTestTimeNormsAddedMessage }).current

  // useEffect
  useEffect(() => {
    dispatch(getAllGreade(token))
    dispatch(getAllTestCategory(token))
  }, [])

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
    const testTimeNormsData = {
      testDetailId: Number(data.test.id),
      gradeId: Number(data.grade.id),
      timeSec: Number(data.time)
    }
    if (testTimeNormsData) {
      dispatch(createTestTimeNorms(testTimeNormsData, token))
    }
  }

  // Notification for Add
  useEffect(() => {
    if (previousProps?.isTestTimeNormsAdded !== isTestTimeNormsAdded) {
      if (isTestTimeNormsAdded) {
        enqueueSnackbar(`${isTestTimeNormsAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management/test-time-norms')
      } else if (isTestTimeNormsAdded === false) {
        enqueueSnackbar(`${isTestTimeNormsAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isTestTimeNormsAdded = isTestTimeNormsAdded
    }
  }, [isTestTimeNormsAdded])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='Add New TestTimeNorms' title='Norms Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add New TestTimeNorms</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/norms-management/test-time-norms')}
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
                      <Form.Label>Grade</Form.Label>
                      <Controller
                        name='grade'
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            placeholder={'Select Grade'}
                            getOptionLabel={(option) => option?.title}
                            getOptionValue={(option) => option?.id}
                            options={gradeArray}
                          />
                        )}
                      />
                      <p className='error-msg'>
                      {errors.grade?.title?.message || errors.grade?.id?.message }
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
                            className='react-dropdown'
                            classNamePrefix='dropdown'
                            placeholder={'Select Test'}
                            getOptionLabel={(option) => option.title}
                            getOptionValue={(option) => option.id}
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
                      className='form-group'
                      controlId='formtimeinsec'
                    >
                      <Form.Label>Time in Sec</Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Time in Sec'
                        {...register('time', {
                          required: 'true'
                        })}
                      />
                      {errors.time?.message && (
                          <Form.Text className='error-msg'>
                            {errors.time?.message}
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

export default AddNewTestTimeNorms
