import React, { useEffect, useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'

import { getAllMainCategoriesDataAction, viewTestSubCategoryAction, updateSubCategoryTestAction } from '../../../../Actions/Admin/test'

const validationSchema = yup.object().shape({
  subCategory: yup.string().required('SubCategory is required'),
  subCategoryAbb: yup.string().required('SubCategory Abbreviation is required'),
  questions: yup.string().required('Questions is required'),
  description: yup.string().required('Description is required'),
  sortOrder: yup.string().required('Sort Order is required')

})

function EditSubCategory () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const params = useParams()
  const categoriesData = useSelector((state) => state.test.mainCategoryData)
  const testDataArray = useSelector(state => state.test.testSubCategoryDataById)
  const isCategoryEdited = useSelector(state => state.test.isSubCategoryEdited)
  const isCategoryEditedMessage = useSelector(state => state.test.resMessage)
  const token = localStorage.getItem('token')
  const id = params?.id
  const [categoriesArray, setCategoriesArray] = useState([])
  const previousProps = useRef({ categoriesArray, isCategoryEdited, isCategoryEditedMessage }).current
  const { control, handleSubmit, register, formState: { errors }, getValues, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register()
  /* Cancel button */
  const handleclick = () => {
    navigate('/test-management/sub-category')
  }
  const onSubmit = data => {
    const testData = {
      id,
      test_id: Number(data?.mainCategory?.value),
      title: data.subCategory,
      sub_test_abb: data.subCategoryAbb,
      no_of_questions: data.questions,
      description: data.description,
      sort_order: data.sortOrder,
      updateType: 'status',
      isActive: 'y'
    }
    if (testData) {
      dispatch(updateSubCategoryTestAction(testData, token))
    }
  }
  useEffect(() => {
    if (token) {
      dispatch(getAllMainCategoriesDataAction(token))
    }
  }, [token])
  useEffect(() => {
    if (id) {
      const testData = {
        id: Number(id)
      }
      dispatch(viewTestSubCategoryAction(testData, token))
    }
  }, [id])

  useEffect(() => {
    if (previousProps?.categoriesData !== categoriesData) {
      const array = []
      if (categoriesData) {
        // eslint-disable-next-line array-callback-return
        categoriesData.map((data) => {
          array.push({
            value: data.id,
            label: data.title
          })
        })
        setCategoriesArray(array)
      }
    }
    return () => {
      previousProps.categoriesData = categoriesData
    }
  }, [categoriesData])

  useEffect(() => {
    if (testDataArray && categoriesArray?.length) {
      const cData = categoriesArray.filter(c => c.value === testDataArray?.test_id)
      reset({
        categoriesArray: cData[0]
      })
    }
  }, [testDataArray, categoriesArray])

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isCategoryEdited !== isCategoryEdited) {
      if (isCategoryEdited) {
        enqueueSnackbar(`${isCategoryEditedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/test-management/sub-category')
        reset()
      } else if (isCategoryEdited === false) {
        enqueueSnackbar(`${isCategoryEditedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isCategoryEdited = isCategoryEdited
    }
  }, [isCategoryEdited])
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Edit Sub Category' title='Test Management'/>
              <div className='main-layout'>
              <Form className='light-bg' onSubmit={handleSubmit(onSubmit)} >
                  <div className="heading-box">
                      <h5>Edit New Sub Category</h5>
                      <div className="btn-box">
                        <button type="button" onClick={handleclick} className='theme-btn dark-btn text-none'>Cancel</button>
                        <button type="submit" className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                          <div className="row">
                          <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>Main Category</Form.Label>
                                {/* <Controller
                                    name="mainCategory"
                                    control={control}
                                    render={({ field: { onChange, value = {} } }) => (
                                        <Select
                                        isClearable // enable isClearable to demonstrate extra error handling
                                        isSearchable={false}
                                        placeholder={'Select Main Catgeory'}
                                        className="react-dropdown"
                                        classNamePrefix="dropdown"
                                        options={categoriesArray}
                                        value={value || getValues()?.categoriesArray}
                                        onChange={(e) => {
                                          onChange(e)
                                        }}
                                        />
                                    )}
                                /> */}
                                <Controller
                                    name='mainCategory'
                                    control={control}
                                    render={({ field: { onChange, value = getValues()?.categoriesArray, ref } }) => {
                                      return (
                                        <>
                                        <Select
                                        inputRef={ref}
                                        placeholder={'Select Main Category'}
                                        className='react-dropdown'
                                        classNamePrefix='dropdown'
                                        options={categoriesArray}
                                        {...register('mainCategory')}
                                        value={value || getValues()?.categoriesArray}
                                        onChange={(e) => {
                                          onChange(e)
                                        }}
                                      />
                                        </>
                                      )
                                    }}
                                  />
                                {/* <p className="error-msg">{errors?.mainCategory?.message || errors?.mainCategory?.label.message}</p> */}
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmainmaincategory">
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category"
                                  name={name}
                                  {...register('subCategory', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={testDataArray?.title}
                                />
                                <p className="error-msg">{errors?.subCategory?.message || errors?.subCategory?.message}</p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmainmaincategory">
                                <Form.Label>Sub Category Abbreviation</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category Abbreviation"
                                  name={name}
                                  {...register('subCategoryAbb', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={testDataArray?.sub_test_abb}
                                />
                                <p className="error-msg">{errors?.subCategoryAbb?.message || errors?.subCategoryAbb?.message}</p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmainmaincategory">
                                <Form.Label>No Of Questions</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter No Of Questions"
                                  name={name}
                                  {...register('questions', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={testDataArray?.no_of_questions}
                                />
                                <p className="error-msg">{errors?.questions?.message || errors?.questions?.message}</p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmainmaincategory">
                                <Form.Label>Sub Category Description</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category Description"
                                  name={name}
                                  {...register('description', { required: true })}
                                  onChange={(e) => {
                                    onChange(e)
                                  }}
                                  Value={testDataArray?.description}
                                />
                                <p className="error-msg">{errors?.description?.message || errors?.description?.message}</p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmainmaincategory">
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
                                <p className="error-msg">{errors?.sortOrder?.message || errors?.sortOrder?.message}</p>
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

export default EditSubCategory
