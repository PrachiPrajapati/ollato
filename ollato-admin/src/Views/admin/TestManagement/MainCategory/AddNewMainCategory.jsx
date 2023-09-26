import React, { useRef, useEffect } from 'react'

/* React Packages */
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'react-notistack'
import { useNavigate } from 'react-router-dom'

/* Components */
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'

/* Action File */
import { addTestAction } from '../../../../Actions/Admin/test'

const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  sortOrder: yup.string().required('Sort Order is required')
})

function AddNewMainCategory () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const isTestDataAdded = useSelector(state => state.test.isTestCategoryAdded)
  const isTestAddedMessage = useSelector(state => state.test.resMessage)
  const isTestAddedfgMessage = useSelector(state => console.log('test--', state))
  const previousProps = useRef({ isTestDataAdded, isTestAddedMessage, isTestAddedfgMessage }).current
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('gradeNo')

  const onSubmit = data => {
    console.log('data', data)
    const testData = {
      title: data.title,
      sort_order: data.sortOrder
    }
    if (testData) {
      dispatch(addTestAction(testData, token))
    }
  }

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isTestDataAdded !== isTestDataAdded) {
      if (isTestDataAdded) {
        enqueueSnackbar(`${isTestAddedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/test-management/main-category')
        reset()
      } else if (isTestDataAdded === false) {
        enqueueSnackbar(`${isTestAddedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isTestDataAdded = isTestDataAdded
    }
  }, [isTestDataAdded])
  /* Cancel button */
  const handleclick = () => {
    navigate('/test-management/main-category')
  }
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Add New Main Category' title='Test Management'/>
              <div className='main-layout'>
              <Form className='light-bg' onSubmit={handleSubmit(onSubmit)} >
                  <div className="heading-box">
                      <h5>Add New Main Category</h5>
                      <div className="btn-box">
                        <button type="button" onClick={handleclick} className='theme-btn dark-btn text-none'>Cancel</button>
                        <button type="submit" className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className={`form-group ${errors.title?.message ? 'error-occured' : ''}`} controlId="formmaincategory">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Main Category"
                                  name={name}
                                  {...register('title', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                />
                                {errors.title?.message && <Form.Text className="error-msg">{errors.title?.message} </Form.Text>}
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group ${errors.sortOrder?.message ? 'error-occured' : ''}`} controlId="formpincode1">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter Sort Order"
                                  name={name}
                                  {...register('sortOrder', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                />
                                {errors.sortOrder?.message && <Form.Text className="error-msg">{errors.sortOrder?.message} </Form.Text>}
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

export default AddNewMainCategory
