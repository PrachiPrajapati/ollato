import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  editSpecificNorms,
  getSpecificNormsData
} from '../../../Actions/Admin/Norms/norms'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  normsCode: yup
    .string()
    .required('Norms Code is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  normsDescription: yup
    .string()
    .required('Norms Description is required')
    .matches(/^[aA-zZ\s]+$/, 'Special Charaters & Numbers are not Allowed'),
  normsSortOrder: yup.string().required('Norms Sort Order is required')
})

function EditNorms () {
  // Constant
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')

  // useSelector
  const mainData = useSelector((state) => state.norms.resData)
  const isEditedData = useSelector((state) => state.norms.isNormsEdited)
  const editedResMessage = useSelector((state) => state.norms.resMessage)

  // previousProps
  const previousProps = useRef({ editedResMessage, isEditedData }).current

  // useEffect to get data by Id
  useEffect(() => {
    dispatch(getSpecificNormsData(Number(id), token))
  }, [])
  useEffect(() => {
    reset({
      normsCode: mainData?.code,
      normsDescription: mainData?.title,
      normsSortOrder: mainData?.sort_order
    })
  }, [mainData])

  // useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // onSubmit
  const onSubmit = (data) => {
    const normsData = {
      id: mainData?.id,
      title: 'norm-96',
      code: 'BE',
      sort_order: 1
    }
    if (normsData) {
      dispatch(editSpecificNorms(normsData, token))
    }
  }

  // Notification for Edit
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management')
      } else if (isEditedData === false) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
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
          <TitleHeader name='Edit Norms' title='Norms Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Edit Norms</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/norms-management')}
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

export default EditNorms
