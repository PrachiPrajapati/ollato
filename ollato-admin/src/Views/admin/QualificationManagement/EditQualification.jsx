import React, { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
/* React Packages */
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { useDispatch, useSelector } from 'react-redux'
// import { useSnackbar } from 'react-notistack'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
/* Action File */
import { getSpecificGradeData, editSpecificGrade } from '../../../Actions/Admin/grade'

const validationSchema = yup.object().shape({
  gradeNo: yup.string().required('Grade is required')
})

function EditGrade () {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const id = params.id
  const token = localStorage.getItem('token')
  const specificGradeData = useSelector((state) => state.grade.specificGradeData)
  const editedResMessage = useSelector((state) => state.grade.resMessage)
  const isEditedData = useSelector((state) => state.grade.isGradeEdited)
  const fg = useSelector((state) => console.log('dfs', state))
  const previousProps = useRef({ editedResMessage, isEditedData, fg }).current

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isEditedData !== isEditedData) {
      if (isEditedData) {
        enqueueSnackbar(`${editedResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/grade-management')
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

  console.log('specificGradeData', specificGradeData)
  useEffect(() => {
    if (id) {
      console.log('id', id)
      dispatch(getSpecificGradeData(Number(id), token))
    }
  }, [id])

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('gradeNo')
  const onSubmit = data => {
    console.log('data', data)
    const gradedata = {
      id,
      title: data.gradeNo
    }
    if (gradedata) {
      dispatch(editSpecificGrade(gradedata, token))
    }
    reset()
  }

  /* Cancel button */
  const handleclick = () => {
    navigate('/grade-management')
  }
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header name='Edit Grade' />
              <TitleHeader name='Edit Grade'/>
              <div className='main-layout'>
              <Form className='light-bg' onSubmit={handleSubmit(onSubmit)}>
                  <div className="heading-box">
                      <h5>Edit Grade</h5>
                      <div className="btn-box">
                        <button type="button" className='theme-btn dark-btn text-none' onClick={handleclick} >Cancel</button>
                        <button type="submit" className='theme-btn text-none'>Save</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className={`form-group ${errors.gradeNo?.message ? 'error-occured' : ''}`} controlId="formgradenumber">
                                <Form.Label>Grade</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Grade"
                                    name={name}
                                    onChange={(e) => {
                                      onChange(e)
                                    }}
                                    Value={(specificGradeData && specificGradeData?.title) || ''}
                                    {...register('gradeNo', { required: true })}
                                  />
                                {errors.gradeNo?.message && <Form.Text className="error-msg">{errors.gradeNo?.message} </Form.Text>}
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

export default EditGrade
