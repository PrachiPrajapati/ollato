import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
/* React-Packages */
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'react-notistack'

/* Components */
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'

/* Action File */
import { viewTestCategoryAction, editTestCategoryAction } from '../../../../Actions/Admin/test'

/* Validation Schema */
const validationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  sortOrder: yup.string().required('Sort Order is required')
})

function EditMainCategory () {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const id = params?.id
  const token = localStorage.getItem('token')
  const testDataArray = useSelector(state => state.test.testCategoryDataById)
  const editedResMessage = useSelector((state) => state.test.resMessage)
  const isEditedData = useSelector((state) => state.test.isTestCategoryUpdated)
  const fg = useSelector((state) => console.log('dfs', state))
  const previousProps = useRef({ editedResMessage, isEditedData, fg }).current
  console.log('testDataArray', testDataArray)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register()

  const onSubmit = data => {
    console.log('data', data)
    const testData = {
      id: Number(id),
      title: data.title,
      sort_order: data.sortOrder
    }
    if (testData) {
      dispatch(editTestCategoryAction(testData, token))
    }
  }
  useEffect(() => {
    if (id) {
      const testData = {
        id: Number(id)
      }
      dispatch(viewTestCategoryAction(testData, token))
    }
  }, [id])

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/test-management/main-category')
      } else if (isEditedData === false) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isEditedData = isEditedData
    }
  }, [isEditedData])
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
              <TitleHeader name='Edit Main Category' title='Test Management'/>
              <div className='main-layout'>
                <Form className='light-bg' onSubmit={handleSubmit(onSubmit)} >
                  <div className="heading-box">
                      <h5>Edit Main Category</h5>
                      <div className="btn-box">
                        <button type="button" onClick={handleclick} className='theme-btn dark-btn text-none'>Cancel</button>
                        <button type="submit" className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Main Category"
                                  Value={testDataArray?.title}
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
                              <Form.Group className="form-group" controlId="formpincode1">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter Sort Order"
                                  name={name}
                                  {...register('sortOrder', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={testDataArray?.sort_order}
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

export default EditMainCategory
