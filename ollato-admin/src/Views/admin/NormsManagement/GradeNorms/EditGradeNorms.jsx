import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editSpecificGradeNorms, getAllGreades, getSpecificGradeNorms } from '../../../../Actions/Admin/Norms/GradeNorms/GradeNorms'
import { getAllTestCategory, getAllSubCategory } from '../../../../Actions/Admin/Test/Question'
import { getAllNormsFrontend } from '../../../../Actions/Admin/Norms/norms'
import { useSnackbar } from 'react-notistack'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
/* Validations  */
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
  norms: yup
    .object()
    .shape({
      id: yup.string().required('Norms is required'),
      title: yup.string().required('Norms is required')
    })
    .nullable()
    .required('Norms is required'),
  subtest: yup
    .object()
    .shape({
      id: yup.string().required('Sub Test is required'),
      title: yup.string().required('Sub Test is required')
    })
    .nullable()
    .required('Sub Test is required'),
  minmarks: yup.number().nullable().typeError('Min Marks is required').required('Min Marks is required'),
  maxmarks: yup.number().nullable().typeError('Max Marks is required').required('Max Marks is required').moreThan(yup.ref('minmarks'), 'Maximum Marks should be greater than minimum marks')
})
function EditGradeNorms () {
  // Constanst
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')

  // useEffect
  useEffect(() => {
    dispatch(getSpecificGradeNorms(Number(id), token))
    dispatch(getAllGreades(token))
    dispatch(getAllTestCategory(token))
    dispatch(getAllNormsFrontend(token))
    dispatch(getAllSubCategory(token))
  }, [])

  // useSelector
  const mainData = useSelector((state) => state.gradeNorms.resData)
  const gradeArray = useSelector((state) => state.gradeNorms.gradeList)
  const testArray = useSelector((state) => state.question.testCategoryList)
  const subtestArray = useSelector((state) => state.question.testSubCategoryList)
  const normArray = useSelector((state) => state.norms.normsFrontList)
  const isEditedData = useSelector(state => state.gradeNorms.isGradeNormsEdited)
  const editedResMessage = useSelector(state => state.gradeNorms.resMessage)

  // previousProps
  const previousProps = useRef({ editedResMessage, isEditedData }).current

  // useForm
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  })

  // reSet
  useEffect(() => {
    if (mainData && gradeArray?.length && testArray?.length) {
      const gradeV = gradeArray?.filter(g => g?.id === mainData?.grade_id)[0]
      const testV = testArray?.filter(t => t?.id === mainData?.test_id)[0]
      const normV = normArray?.filter(g => g?.id === mainData?.norm_id)[0]
      const subtestV = subtestArray?.filter(t => t?.id === mainData?.test_detail_id)[0]
      reset({
        grade: gradeV,
        test: testV,
        subtest: subtestV,
        norms: normV,
        minmarks: mainData?.min_marks,
        maxmarks: mainData?.max_marks
      })
    }
  }, [mainData, gradeArray, testArray, normArray, subtestArray])

  // onSubmit
  const onSubmit = (data) => {
    const gradeNormsData = {
      id,
      test_id: Number(data.test.id),
      grade_id: Number(data.grade.id),
      norm_id: Number(data.norms.id),
      test_detail_id: Number(data.subtest.id),
      min_marks: Number(data.minmarks),
      max_marks: Number(data.maxmarks)
    }
    if (gradeNormsData) {
      dispatch(editSpecificGradeNorms(gradeNormsData, token))
    }
  }
  // Notification for Add
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management/gradenorms')
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
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='Edit GradeNorms' title='Norms Management'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>Edit GradeNorms</h5>
                      <div className="btn-box">
                      <div className="btn-box">
                        <button onClick={() => navigate('/norms-management/gradenorms')} className='theme-btn dark-btn text-none'>Cancel</button>
                        <button className='theme-btn text-none' onClick={handleSubmit(onSubmit)} >Save</button>
                      </div>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                    <Form className='light-bg'>
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className={`form-group common-select-style ${errors.grade?.id.message || errors.grade?.title.message ? 'error-occured' : ''}`} controlId="formgradeselect">
                                <Form.Label>Grade</Form.Label>
                                    <Controller
                                      name='grade'
                                      control={control}
                                      render={({ field: { onChange, value = {} } }) => (
                                        <Select
                                          className='react-dropdown'
                                          classNamePrefix='dropdown'
                                          placeholder={'Select Grade'}
                                          getOptionLabel={(option) => option?.title}
                                          getOptionValue={(option) => option?.id}
                                          options={gradeArray}
                                          value={value || getValues()?.gradeArray}
                                          onChange={(e) => {
                                            onChange(e)
                                          }}
                                        />
                                      )}
                                    />
                                    <p className='error-msg'>
                                      {errors.grade?.id.message || errors.grade?.title.message}
                                    </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group common-select-style ${errors.norms?.id.message || errors.norms?.title.message ? 'error-occured' : ''}`} controlId="formfullname">
                                <Form.Label>Norms</Form.Label>
                                <Controller
                                    name='norms'
                                    control={control}
                                    render={({ field: { onChange, value = {} } }) => (
                                      <Select
                                        className='react-dropdown'
                                        classNamePrefix='dropdown'
                                        placeholder={'Select Norms'}
                                        getOptionLabel={(option) => option?.title}
                                        getOptionValue={(option) => option?.id}
                                        options={normArray}
                                        value={value || getValues()?.normArray}
                                        onChange={(e) => {
                                          onChange(e)
                                        }}
                                      />
                                    )}
                                  />
                                  <p className='error-msg'>
                                    {errors.norms?.id.message || errors.norms?.title.message}
                                  </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group common-select-style ${errors.test?.id.message || errors.test?.title.message ? 'error-occured' : ''}`} controlId="formfullname">
                                <Form.Label>Test</Form.Label>
                                <Controller
                                name='test'
                                control={control}
                                render={({ field: { onChange, value = {} } }) => (
                                  <Select
                                    className='react-dropdown'
                                    classNamePrefix='dropdown'
                                    placeholder={'Select Test'}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    options={testArray}
                                    value={value || getValues()?.testArray}
                                    onChange={(e) => {
                                      onChange(e)
                                    }}
                                  />
                                )}
                              />
                              <p className='error-msg'>
                                {errors.test?.id.message || errors.test?.title.message}
                              </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group common-select-style ${errors.subtest?.id.message || errors.subtest?.title.message ? 'error-occured' : ''}`} controlId="formfullname">
                                <Form.Label>SubTest</Form.Label>
                                <Controller
                                name='subtest'
                                control={control}
                                render={({ field: { onChange, value = {} } }) => (
                                  <Select
                                    className='react-dropdown'
                                    classNamePrefix='dropdown'
                                    placeholder={'Select SubTest'}
                                    getOptionLabel={(option) => option.title}
                                    getOptionValue={(option) => option.id}
                                    options={subtestArray}
                                    value={value || getValues()?.subtestArray}
                                    onChange={(e) => {
                                      onChange(e)
                                    }}
                                  />
                                )}
                              />
                              <p className='error-msg'>
                                {errors.subtest?.id.message || errors.subtest?.title.message}
                              </p>
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group ${errors.minmarks?.message ? 'error-occured' : ''}`} controlId="formminmarks">
                                <Form.Label>Min Marks</Form.Label>
                                <Form.Control
                                  type='number'
                                  placeholder='Enter Min Marks'
                                  {...register('minmarks', {
                                    required: 'true'
                                  })}
                                />
                                {errors.minmarks?.message && (
                                    <Form.Text className='error-msg'>
                                      {errors.minmarks?.message}
                                    </Form.Text>
                                )}
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className={`form-group ${errors.maxmarks?.message ? 'error-occured' : ''}`} controlId="formmaxmarks">
                                <Form.Label>Max Marks</Form.Label>
                                <Form.Control
                                  type='number'
                                  placeholder='Enter Min Marks'
                                  {...register('maxmarks', {
                                    required: 'true'
                                  })}
                                />
                                {errors.maxmarks?.message && (
                                    <Form.Text className='error-msg'>
                                      {errors.maxmarks?.message}
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

export default EditGradeNorms
