import React, { useState, useEffect, useRef } from 'react'

/* NPM-Packages */
import { Formik } from 'formik'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'
/* import LogoBg from '../../../assets/images/icon-bglogo.png' */

/* React-bootstrap Components */
import { Button, Form } from 'react-bootstrap'

/* Language Component */
import Language from '../../../Components/Language'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'

/* Action file */
import { login } from '../../../Actions/auth'

function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const isAuthMessage = useSelector(state => state.auth.resMessage)
  const previousProps = useRef({ isAuth, isAuthMessage }).current
  const [isShowPassword, setShowPassword] = useState(false)
  const [emailMob, setEmailMob] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('password')
  // Regex for password
  // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  // Custom HandleChange Function to handle initial values and set fields values
  const onHandleChange = (e, type) => {
    switch (type) {
      case 'emailMob':
        setEmailMob(e.target.value)
        break
      case 'iPhoneNumber':
        setPassword(e.target.value)
        break
      default:
        break
    }
  }

  // Validation-Scheme for fields
  const validationSchema = yup.object().shape({
    // emailMob: yup.string().required('Email/Mobile is required'),
    emailMob: yup.string()
      .required('E-Mail/Mobile Number is required')
      .test('test-name', 'Enter Valid E-Mail/Mobile Number',
        function (value) {
          const emailRegex = /.+@.+\.[A-Za-z]+$/
          const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
          const isValidEmail = emailRegex.test(value)
          const isValidPhone = phoneRegex.test(value)
          if (!isValidEmail && !isValidPhone) {
            return false
          }
          return true
        }),
    password: yup.string().required('Password is required')
    // .matches(passRegex, 'Password must contain at least eight characters, at least one number and  uppercase letter and special characters')
  })

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
    console.log('isAuthMessage--->', isAuthMessage)
    if (previousProps?.isAuth !== isAuth) {
      if (isAuth === true) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
        navigate('/package')
      } else if (isAuth === false) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000
        }
        )
      }
    }
    return () => {
      previousProps.isAuth = isAuth
    }
  }, [isAuth])
  return (
    <>
    {/* Formik-Form */}
     <Formik
        initialValues={
          {
            emailMob,
            password
          }}
        validationSchema={validationSchema}
        onSubmit={(values, { setStatus, resetForm }) => {
          const loginData = {
            login: values.emailMob,
            password: values.password
          }
          if (loginData) {
            dispatch(login(loginData))
            resetForm(
              values.emailMob = '',
              values.password = ''
            )
          }
        }}
     >
       {({
         errors,
         handleBlur,
         handleSubmit,
         handleChange,
         isSubmitting,
         touched,
         values
       }) => {
         return (
             <div className="common-layout">
                <AuthLeftLogo />
                  <div className="form-box-section">
                    <Language />
                  <div className="middle-form">
                    <div className="title-box">
                        <h2>Login</h2>
                      </div>
                      <Form onSubmit={handleSubmit} noValidate>
                        <Form.Group
                          className={`form-group ${(touched.emailMob && errors.emailMob) ? 'error-occured' : ''}`}
                          controlId="formBasicEmail">
                          <Form.Label>E-Mail or Mobile Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter E-Mail or Mobile Number"
                            name="emailMob"
                            value={values.emailMob}
                            onChange={(e) => {
                              handleChange(e)
                              onHandleChange(e, 'emailMob')
                            }}
                          />
                          {
                            touched.emailMob && errors.emailMob && <Form.Text className="error-msg">{errors.emailMob}</Form.Text>
                          }
                        </Form.Group>
                        <Form.Group
                          className={`form-group ${(touched.password && errors.password) ? 'error-occured' : ''}`}
                           controlId="formBasicPassword">
                          <div className='label-box'>
                            <Form.Label>Password</Form.Label>
                            <Link to="/forgot-password" >Forgot Password?</Link>
                          </div>
                          <div
                              className={`password-box ${isShowPassword ? 'show-pass' : ''}`}
                               >
                            <Form.Control
                              type={type}
                              placeholder="Password"
                              name="password"
                              value={values.password}
                              onChange={(e) => {
                                handleChange(e)
                                onHandleChange(e, 'password')
                              }}
                            />
                            <span
                              className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''}`}
                              onClick={handleShowHidePassword} >
                            </span>
                          </div>
                          {
                            touched.password && errors.password && <Form.Text className="error-msg">{errors.password}</Form.Text>
                          }
                        </Form.Group>
                        <Button variant="primary" type="submit" className='theme-btn large-btn'>
                          Login
                        </Button>
                      </Form>
                      <div className="seprater-box">
                        <span>Or</span>
                      </div>
                      <Link to="/login-with-otp" className='d-block text-center' >Login with OTP</Link>
                    </div>
                    <div className="redirect-to-signin">
                      <p>Don&apos;t have an account yet? <Link to="/signup" >Create an account</Link></p>
                    </div>
                  </div>
                </div>
         )
       }}
     </Formik>
    </>
  )
}

export default Login
