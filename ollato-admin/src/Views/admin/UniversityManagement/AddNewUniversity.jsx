import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useSnackbar } from 'react-notistack'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { createUniversity } from '../../../Actions/Admin/university'
import { useDispatch, useSelector } from 'react-redux'

const validationSchema = yup.object().shape({
  universityFullName: yup.string().required('University Name is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed')
})

function AddNewUniversity () {
  // Constant
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()

  // useSelector
  const isUniversityDataAdded = useSelector(state => state.university.isUniversityAdded)
  const isUniversityAddedMessage = useSelector(state => state.university.resMessage)
  const previousProps = useRef({ isUniversityDataAdded, isUniversityAddedMessage }).current

  // useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)

  })
  // onSubmit
  const onSubmit = (data) => {
    const universityData = {
      title: data.universityFullName
    }
    if (universityData) {
      dispatch(createUniversity({ universityData, token }))
    }
    reset()
  }

  // Notification
  useEffect(() => {
    if (previousProps?.isUniversityDataAdded !== isUniversityDataAdded) {
      if (isUniversityDataAdded) {
        enqueueSnackbar(`${isUniversityAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/university-management')
      } else if (isUniversityDataAdded === false) {
        enqueueSnackbar(`${isUniversityAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isUniversityDataAdded = isUniversityDataAdded
    }
  }, [isUniversityDataAdded])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name="University" title='University' addTitle='Add New University'/>
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add University</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/university-management')}
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
              <Form id='my-form' className='light-bg'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='error-occured'
                      controlId='formuniversityfullname'
                    >
                      <Form.Label>University Full Name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter University Full Name'
                        {...register('universityFullName', {
                          required: 'true'
                        })}
                      />
                      {errors.universityFullName?.message && (
                        <Form.Text className='error-msg'>
                          {errors.universityFullName?.message}
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

export default AddNewUniversity
