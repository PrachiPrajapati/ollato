import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { addNormsAction } from '../../../Actions/Admin/Norms/norms'
import { useSnackbar } from 'react-notistack'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
  normsCode: yup.string().required('Norms Code is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  normsDescription: yup.string().required('Norms Description is required').matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  normsSortOrder: yup.string().required('Norms Sort Order is required')
})
function AddNewNorms () {
  // Constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // useSelector
  const isNormsDataAdded = useSelector((state) => state.norms.isNormsAdded)
  const isNormsAddedMessage = useSelector((state) => state.norms.resMessage)

  // preViousProps
  const previousProps = useRef({ isNormsDataAdded, isNormsAddedMessage }).current

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // onSubmit
  const onSubmit = (data) => {
    const normsData = {
      title: data.normsDescription,
      code: data.normsCode,
      sort_order: data.normsSortOrder
    }
    if (normsData) {
      dispatch(addNormsAction(normsData, token))
    }
  }

  // Notification for Add
  useEffect(() => {
    if (previousProps?.isNormsDataAdded !== isNormsDataAdded) {
      if (isNormsDataAdded) {
        enqueueSnackbar(`${isNormsAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management')
      } else if (isNormsDataAdded === false) {
        enqueueSnackbar(`${isNormsAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isNormsDataAdded = isNormsDataAdded
    }
  }, [isNormsDataAdded])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='Add New Norms' title='Norms Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Add New Norms</h5>
              <div className='btn-box'>
                <button className='theme-btn dark-btn text-none' onClick={() => navigate('/norms-management')} >Cancel</button>
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
                      controlId='formnormscode'
                    >
                      <Form.Label>Norms Code</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Norms Code'
                        {...register('normsCode', {
                          required: 'true'
                        })}
                      />
                      {errors.normsCode?.message && (
                        <Form.Text className='error-msg'>
                          {errors.normsCode?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formnormsdescription'
                    >
                      <Form.Label>Norms Description</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Norms Description'
                        {...register('normsDescription', {
                          required: 'true'
                        })}
                      />
                      {errors.normsDescription?.message && (
                        <Form.Text className='error-msg'>
                          {errors.normsDescription?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formsortorder'
                    >
                      <Form.Label>Sort Order </Form.Label>
                      <Form.Control
                        type='number'
                        placeholder='Enter Sort Order '
                        {...register('normsSortOrder', {
                          required: 'true'
                        })}
                      />
                      {errors.normsSortOrder?.message && (
                        <Form.Text className='error-msg'>
                          {errors.normsSortOrder?.message}
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

export default AddNewNorms
