import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import crossWhite from '../../../../assets/images/crosswhite.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  editSpecificQuestion,
  getAllSubCategory,
  getSpecificQuestion
} from '../../../../Actions/Admin/Test/Question'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import otherdocPlaceholder from '../../../../assets/images/other-img-placeholder.svg'
import { useSnackbar } from 'react-notistack'

const validationSchema = yup.object().shape({
  question: yup.string().required('Question is required'),
  questionMarks: yup.string().required('Mark is required'),
  questionTime: yup.string().required('Time is required')
})

function EditQuestions () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const mainData = useSelector((state) => state.question.resData)
  const isQuestionDataEdited = useSelector((state) => state.question.isQuestionEdited)
  const isQuestionEditedMessage = useSelector((state) => state.question.resMessage)
  const previousProps = useRef({ isQuestionDataEdited, isQuestionEditedMessage }).current
  const [options, setOptions] = useState(mainData?.options || [])
  const [showComp, setShowComp] = useState({
    isMath: mainData?.is_math,
    isImage: mainData?.is_image,
    isImageValue: mainData?.path
  })
  useEffect(() => {
    mainData && setOptions(mainData?.options)
    if (mainData) {
      setShowComp({
        isMath: mainData?.is_math,
        isImage: mainData?.is_image,
        isImageValue: mainData?.path
      })
    }
  }, [mainData])

  const handleChange = (e) => {
    setShowComp({ ...showComp, [e.target.name]: e.target.checked })
  }

  const handleQuestionImage = (e) => {
    setShowComp({ ...showComp, isImageValue: e.target.files[0] })
  }

  const handleOptionValueChange = (e, i) => {
    const selectedOption = options.map((value, index) => {
      return i === index
        ? {
            ...value,
            [e.target.name]: e.target.name.startsWith('option-')
              ? e.target.files[0]
              : e.target.value
          }
        : value
    })
    setOptions(selectedOption)
  }

  const handleOptionChange = (e, i) => {
    const selectedOption = options.map((value, index) => {
      return i === index
        ? {
            ...value,
            [e.target.name]: e.target.checked,
            math_expression:
              e.target.name === 'math_expression'
                ? e.target.checked
                  ? value.math_expression
                  : ''
                : value.math_expression,
            [value.label]:
              e.target.name === 'is_image' && e.target.checked
                ? value[value.label]
                : ''
          }
        : { ...value, is_correct_ans: false }
    })
    setOptions(selectedOption)
  }

  const subCategoryArray = useSelector(
    (state) => state.question.testSubCategoryList
  )
  // Step-1 Get Question By id
  useEffect(() => {
    dispatch(getSpecificQuestion(Number(id), token))
    dispatch(getAllSubCategory(token))
  }, [])
  const {
    reset,
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema) })

  useEffect(() => {
    if (mainData && subCategoryArray?.length) {
      const subCategoryV = subCategoryArray?.find(
        (data) => data?.id === mainData?.test_detail_id
      )
      reset({
        subCategory: subCategoryV,
        question: mainData?.question,
        questionMarks: mainData?.marks,
        questionTime: mainData?.time_Sec,
        math_expression: mainData?.math_expression
      })
    }
  }, [mainData, subCategoryArray])

  const addOption = (e, i) => {
    e.preventDefault()
    if (i === 6) return
    setOptions([
      ...options,
      {
        label: 'option-' + i,
        ans_desc: '',
        is_math: false,
        is_correct_ans: false,
        is_image: false,
        math_expression: ''
      }
    ])
  }

  const removeOption = (e, i) => {
    e.preventDefault()
    if (i === 0) return
    setOptions(options.filter((value, index) => i !== index))
  }
  const removeImage = (e) => {
    e.preventDefault()
    setShowComp({ ...showComp, isImageValue: null })
  }
  // Submit Form
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('question', data.question)
    formData.append('marks', data?.questionMarks)
    formData.append('time_Sec', data?.questionTime)
    formData.append('is_image', showComp?.isImage)
    formData.append('ques_img', showComp?.isImageValue)
    formData.append('is_math', showComp?.isMath)
    formData.append('math_expression', data?.math_expression)
    formData.append('sort_order', '1')
    formData.append('test_detail_id', Number(data?.subCategory?.id))
    options.forEach((data, i) => {
      const keys = Object.keys(data)
      keys.forEach((key) => {
        formData.append(`options[${i}][${key}]`, data[key])
      })
    })
    dispatch(editSpecificQuestion(formData, token))
  }
  // Notification
  useEffect(() => {
    if (previousProps?.isQuestionDataEdited !== isQuestionDataEdited) {
      if (isQuestionDataEdited) {
        enqueueSnackbar(`${isQuestionEditedMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/test-management/questions')
      } else if (isQuestionDataEdited === false) {
        enqueueSnackbar(`${isQuestionEditedMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isQuestionDataEdited = isQuestionDataEdited
    }
  }, [isQuestionDataEdited])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='Edit Questions' title='Test Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>Edit Question</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/test-management/questions')}
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
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Sub Category</Form.Label>
                      <Controller
                        name='subCategory'
                        control={control}
                        render={({ field: { onChange, value = {} } }) => {
                          return (
                            <Select
                              placeholder={'Select Country'}
                              className='react-dropdown'
                              classNamePrefix='dropdown'
                              getOptionLabel={(option) => option.title}
                              getOptionValue={(option) => option.id}
                              options={subCategoryArray}
                              value={value || getValues()?.subCategory}
                              onChange={(e) => {
                                onChange(e)
                              }}
                            />
                          )
                        }}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-12 quesbox has-image'>
                    <Form.Group
                      className='form-group mb-0 text-input'
                      controlId='formquestion'
                    >
                      <Form.Label>Question</Form.Label>
                      <Form.Control
                        type='text'
                        name='question'
                        placeholder='Enter Question'
                        {...register('question', {
                          required: 'true'
                        })}
                      />
                      {errors?.question?.message && (
                        <Form.Text className='error-msg'>
                          {errors?.question?.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                    {showComp?.isImage && (
                      <Form.Group
                        controlId='formFile'
                        className={`form-group mb-0  document-file-input common-input-file ${
                          showComp?.isImageValue ? 'uploaded-doc' : ''
                        }`}
                      >
                        <Form.Control
                          type='file'
                          className='hidden-file'
                          name='isImageValue'
                          onChange={(e) => handleQuestionImage(e)}
                        />
                        <div className='form-control d-flex align-items-center flex-column justify-content-center text-center'>
                          <div className='img-box'>
                            <img
                              src={
                                ('http://3.7.98.19:1340/' + showComp?.isImageValue ||
                                  URL.createObjectURL(
                                    showComp?.isImageValue
                                  )) ||
                                otherdocPlaceholder
                              }
                              alt=''
                            />
                            <button onClick={(e) => removeImage(e)} className='close-cross-btn'>
                              <img src={crossWhite} alt='' />
                            </button>
                          </div>

                              <p className='m-2 blue-placeholder'>
                                Upload JPG, PNG or PDF
                              </p>
                              <p className='m-0 color-black'>Front Side</p>

                        </div>
                      </Form.Group>
                    )}
                    {showComp?.isMath && (
                      <>
                        <Form.Label>Math Expression</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Math Expression'
                          name='math_expression'
                          {...register('math_expression', {
                            required: 'true'
                          })}
                        />
                        {errors.math_expression?.message && (
                          <Form.Text className='error-msg'>
                            {errors.math_expression?.message}
                          </Form.Text>
                        )}
                      </>
                    )}
                  </div>
                  <div className='col-md-12 quesbox has-image'>
                    <Form.Group
                      className='form-group checkbox-box d-flex align-items-start'
                      controlId='formBasicCheckbox'
                    >
                      <Form.Check type='checkbox' id='checkbox-1'>
                        <Form.Check.Input
                          name='isImage'
                          checked={showComp.isImage}
                          onChange={(e) => handleChange(e)}
                        />
                        <Form.Check.Label>Is Image ?</Form.Check.Label>
                      </Form.Check>
                      <Form.Check type='checkbox' id='checkbox-2'>
                        <Form.Check.Input
                          name='isMath'
                          checked={showComp.isMath}
                          onChange={(e) => handleChange(e)}
                        />
                        <Form.Check.Label>Is Math ?</Form.Check.Label>
                      </Form.Check>
                    </Form.Group>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <Form.Label>Marks</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Marks'
                        {...register('questionMarks', {
                          required: 'true'
                        })}
                      />
                      {errors.questionMarks?.message && (
                        <Form.Text className='error-msg'>
                          {errors.questionMarks?.message}
                        </Form.Text>
                      )}
                    </div>
                    <div className='col-md-6'>
                      <Form.Label>Time in Second</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Time in Second'
                        {...register('questionTime', {
                          required: 'true'
                        })}
                      />
                      {errors.questionTime?.message && (
                        <Form.Text className='error-msg'>
                          {errors.questionTime?.message}
                        </Form.Text>
                      )}
                    </div>
                  </div>
                  <div className='col-md-12 mt-3 mb-3'>
                    {options?.map((data, i) => {
                      console.log('391', data)
                      return (
                        <>
                          <div className='col-md-12 optionaddbox'>
                            <div className='option-item' key={i}>
                              <div className='optionitembox'>
                                <Form.Group
                                  className='form-group mb-0 text-input'
                                  controlId='formquestion'
                                >
                                  <Form.Label>Option</Form.Label>
                                  <Form.Control
                                    type='text'
                                    placeholder='Enter Option'
                                    name='ans_desc'
                                    value={data?.ans_desc}
                                    onChange={(e) =>
                                      handleOptionValueChange(e, i)
                                    }
                                  />
                                </Form.Group>
                                <Form.Group
                                  className='form-group checkbox-box d-flex align-items-center'
                                  controlId='formBasicCheckbox'
                                >
                                  <Form.Check
                                    type='checkbox'
                                    id={'checkbox-12-' + i}
                                  >
                                    <Form.Check.Input
                                      name='is_image'
                                      onChange={(e) => handleOptionChange(e, i)}
                                      checked={data?.is_image}
                                    />

                                    <Form.Check.Label>
                                      Is Image ?
                                    </Form.Check.Label>
                                  </Form.Check>
                                  <Form.Check
                                    type='checkbox'
                                    id={'checkbox-23-' + i}
                                  >
                                    <Form.Check.Input
                                      name='is_math'
                                      type='checkbox'
                                      checked={data?.is_math}
                                      onChange={(e) => handleOptionChange(e, i)}
                                    />
                                    <Form.Check.Label>
                                      Is Math ?
                                    </Form.Check.Label>
                                  </Form.Check>
                                  <Form.Check
                                    type='checkbox'
                                    id={'checkbox-34-' + i}
                                  >
                                    <Form.Check.Input
                                      type='checkbox'
                                      name='is_correct_ans'
                                      checked={data?.is_correct_ans}
                                      onChange={(e) => handleOptionChange(e, i)}
                                    />
                                    <Form.Check.Label>
                                      Is Correct ?
                                    </Form.Check.Label>
                                  </Form.Check>
                                </Form.Group>
                              </div>

                              {data?.is_image && (
                                <Form.Group
                                  controlId='formFile'
                                  className='form-group document-file-input common-input-file uploaded-doc'
                                >
                                  <Form.Control
                                    type='file'
                                    className='hidden-file'
                                    name={'option-' + (i + 1)}
                                    onChange={(e) =>
                                      handleOptionValueChange(e, i)
                                    }
                                  />
                                  <div className='form-control d-flex align-items-center flex-column justify-content-center text-center'>
                                    <div className='img-box'>
                                      <img
                                        src={
                                          (data?.['option-' + (i + 1)]
                                            ? URL.createObjectURL(
                                              data?.['option-' + (i + 1)]
                                            )
                                            : ('http://3.7.98.19:1340/' + data?.path)) ||
                                          otherdocPlaceholder
                                        }
                                        alt=''
                                      />
                                      {/* <button className='close-cross-btn'>
                                        <img src={crossWhite} alt='' />
                                      </button> */}
                                    </div>
                                    {/* {!!data?.is_imageValue && (
                                      <>
                                        {' '}
                                        <p className='m-2 blue-placeholder'>
                                          Upload JPG, PNG or PDF
                                        </p>
                                        <p className='m-0 color-black'>
                                          Front Side
                                        </p>
                                      </>
                                    )} */}
                                  </div>
                                </Form.Group>
                              )}
                              {data?.is_math && (
                                <Form.Group
                                  className='form-group mb-0 text-input'
                                  controlId='formquestion'
                                >
                                  <Form.Label>Math Expression</Form.Label>
                                  <Form.Control
                                    type='text'
                                    name='math_expression'
                                    value={data?.math_expression}
                                    onChange={(e) =>
                                      handleOptionValueChange(e, i)
                                    }
                                  />
                                </Form.Group>
                              )}
                            </div>
                            <div className='add-remove-btn'>
                              <div>
                                <button
                                  className='theme-btn small-btn'
                                  onClick={(e) =>
                                    addOption(e, options.length + 1)
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <div>
                                <button
                                  className='theme-btn dark-btn'
                                  onClick={(e) => removeOption(e, i)}
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditQuestions
