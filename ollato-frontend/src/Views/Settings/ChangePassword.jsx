import React, { useState, useRef, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import { changePasswordAction } from '../../Actions/auth'
// Regex for password
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const validationSchema = yup.object().shape({
  currentPassword: yup.string().required('Please Enter Current Password'),
  password: yup.string().required('Password is required').matches(passRegex, 'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'),
  cPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password and Confirm password must be same ')
})

function ChangePassword () {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const [type, setType] = useState('password')
  const token = localStorage.getItem('token')
  const [isShowPassword, setShowPassword] = useState(false)
  const resMessageFlag = useSelector(state => state.auth.resMessage)
  const isChanged = useSelector(state => state.auth.resMessage)
  const previousProps = useRef({ isChanged, resMessageFlag }).current
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('password', 'cPassword')
  const onSubmit = data => {
    console.log('data', data)
    const userData = {
      currentPassword: data.currentPassword,
      confirmPassword: data.cPassword,
      password: data.password
    }
    if (userData) {
      dispatch(changePasswordAction(userData, token))
    }
    reset()
  }

  // Handle method show/hide password
  const handleShowHidePassword = () => {
    if (type === 'password') {
      setType('text')
      setShowPassword(true)
    } else {
      setType('password')
      setShowPassword(false)
    }
  }

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isChanged !== isChanged) {
      if (isChanged) {
        enqueueSnackbar(`${resMessageFlag}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
      } else if (isChanged === false) {
        enqueueSnackbar(`${resMessageFlag}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000
        }
        )
      }
    }
    return () => {
      previousProps.isChanged = isChanged
    }
  }, [isChanged])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs light-bg'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader name='Settings'/>
            <div className='main-layout whitebox-layout'>
             <Form className='light-bg' onSubmit={handleSubmit(onSubmit)} >
              <div className='heading-box'>
                  <h5 className='mr-1'>Change Password</h5>
                  <div className='btn-box'>
                    <button className='theme-btn text-none' type='submit' >
                      Save New Password
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-xl-6 col-lg-8 col-md-10">
                      <Form.Group className={`form-group ${errors.currentPassword?.message ? 'error-occured' : ''}`} controlId="formnewPassword">
                        <Form.Label>Current Password</Form.Label>
                        <div className="password-box no-eye" >
                          <Form.Control
                              type="password"
                              placeholder="Enter Current Password"
                              {...register('currentPassword', { required: true })}
                          />
                        </div>
                        <Form.Text className="error-msg"></Form.Text>
                        {errors.currentPassword?.message && <Form.Text className="error-msg">{errors.currentPassword?.message} </Form.Text>}
                      </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-xl-6 col-lg-8 col-md-10">
                      <Form.Group className={`form-group ${errors.password?.message ? 'error-occured' : ''}`} controlId="formnewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type={type}
                            placeholder="Enter New Password"
                            name={name}
                            onChange={(e) => {
                              onChange(e)
                            }}
                            {...register('password', { required: true })}
                          />
                            <span
                              className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''}`}
                              onClick={handleShowHidePassword} >
                            </span>
                            {errors.password?.message && <Form.Text className="error-msg">{errors.password?.message} </Form.Text>}
                      </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-xl-6 col-lg-8 col-md-10">
                      <Form.Group className={`form-group ${errors.cPassword?.message ? 'error-occured' : ''}`} controlId="formconfirmPassword">
                      <Form.Label>Confirm Passwod</Form.Label>
                      <div className="password-box no-eye" >
                        <Form.Control
                          type="password"
                          placeholder="Re-enter New Password"
                          name={name}
                          onChange={(e) => {
                            onChange(e)
                          }}
                          {...register('cPassword', { required: true })}
                        />
                        {errors.cPassword?.message && <Form.Text className="error-msg">{errors.cPassword?.message} </Form.Text>}
                      </div>
                    </Form.Group>
                      </div>
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

export default ChangePassword
