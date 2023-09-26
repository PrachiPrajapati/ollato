import React, { useRef, useEffect, useState } from 'react'
/* import LogoBg from '../../../assets/images/icon-bglogo.png' */
import { Button, Form } from 'react-bootstrap'
import Language from '../../../Components/Language'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// import { Link, useNavigate } from 'react-router-dom'
import { login, adminLogin } from '../../../Actions/auth'
// Validation-Scheme for fields
const adminValidationSchema = yup.object().shape({
  emailMob: yup.string()
    .required('E-Mail is required')
    .test('test-name', 'Enter Valid E-Mail',
      function (value) {
        const emailRegex = /.+@.+\.[A-Za-z]+$/
        const isValidEmail = emailRegex.test(value)
        if (!isValidEmail) {
          return false
        }
        return true
      }),
  password: yup.string().required('Password is required')
})
const cValidationSchema = yup.object().shape({
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
})
function Login () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log('location', location)
  const [isShowPassword, setShowPassword] = useState(false)
  const [type, setType] = useState('password')
  const { enqueueSnackbar } = useSnackbar()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const isLogged = useSelector(state => state.auth.isLogin)
  const isAuthMessage = useSelector(state => state.auth.resMessage)
  const previousProps = useRef({ isAuth, isAuthMessage }).current
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(location.pathname === '/' ? cValidationSchema : adminValidationSchema)
  })
  const { onChange, name } = register('emailMob', 'password')

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
  const onSubmit = data => {
    let userData = {}
    // eslint-disable-next-line no-lone-blocks
    {
      location.pathname === '/'
        ? userData = {
          login: data.emailMob,
          password: data.password
        }
        : userData = {
          email: data.emailMob,
          password: data.password
        }
    }

    console.log('userData', userData)
    if (userData) {
      // eslint-disable-next-line no-lone-blocks
      {
        location.pathname === '/' ? dispatch(login(userData)) : dispatch(adminLogin(userData))
      }
    }
    reset()
  }
  // Toastify Notification
  useEffect(() => {
    console.log('helloooooo', previousProps?.isAuth !== isAuth)
    if (previousProps?.isAuth !== isAuth) {
      console.log('previouspropisAuth', isAuth)
      console.log('previouspropisAuth', isAuthMessage)
      if (isAuth) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management')
      } else if (isAuth === false) {
        console.log('inside')
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isAuth = isAuth
    }
  }, [isAuth])

  // Toastify Notification
  useEffect(() => {
    console.log('helloooooo', previousProps?.isLogged !== isLogged)
    if (previousProps?.isLogged !== isLogged) {
      console.log('previouspropisAuth', isLogged)
      console.log('previouspropisAuth', isAuthMessage)
      if (isLogged) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/norms-management')
      } else if (isLogged === false) {
        console.log('inside')
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isLogged = isLogged
    }
  }, [isLogged])

  // Custom HandleChange Function to handle initial values and set fields values
  const onHandleChange = (e, type) => {
    switch (type) {
      case 'emailMob':
        // setEmailMob(e.target.value)
        break
      default:
        break
    }
  }
  return (
    <>
      <div className="common-layout">
        {console.log('errors***', errors)}
       <AuthLeftLogo />
        <div className="form-box-section">
          <Language />
         <div className="middle-form">
          <div className="title-box">
              <h2>{location.pathname === '/admin/login' ? 'Admin' : 'Counsellor'} Login</h2>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {
                // eslint-disable-next-line multiline-ternary
                location.pathname === '/' ? <>
                  <Form.Group
                  //  className="form-group"
                   className={`form-group ${errors.emailMob?.type ? 'error-occured' : ''}`}
                   controlId="formBasicEmail"
                   >
                    <Form.Label>E-Mail or Mobile Number</Form.Label>
                      <Form.Control
                          type="text"
                          name={name}
                          placeholder="Enter E-Mail or Mobile Number"
                          onChange={(e) => {
                            onChange(e)
                            onHandleChange(e, 'emailMob')
                          }}
                          {...register('emailMob', { required: true })}
                        />
                        {errors.emailMob?.message && <Form.Text className="error-msg">{errors.emailMob?.message} </Form.Text>}
                    </Form.Group>
                </> : <>
                <Form.Group
                  //  className="form-group"
                   className={`form-group ${errors.emailMob?.type ? 'error-occured' : ''}`}
                   controlId="formBasicEmail"
                   >
                    <Form.Label>E-Mail</Form.Label>
                      <Form.Control
                          type="text"
                          name={name}
                          placeholder="Enter E-Mail"
                          onChange={(e) => {
                            onChange(e)
                            onHandleChange(e, 'emailMob')
                          }}
                          {...register('emailMob', { required: true })}
                        />
                        {errors.emailMob?.message && <Form.Text className="error-msg">{errors.emailMob?.message} </Form.Text>}
                    </Form.Group>
                </>
              }
              <Form.Group
                //  className="form-group error-occured"
                 className={`form-group ${errors.password?.type ? 'error-occured' : ''}`}
                 controlId="formBasicPassword"
                >
                <div className='label-box'>
                  <Form.Label>Password</Form.Label>
                  {
                  location.pathname === '/' ? <Link to="/forgot-password" >Forgot Password?</Link> : <Link to="/admin/forgot-password" >Forgot Password?</Link>
                  }
                </div>
                <div className="password-box " >
                  <Form.Control
                     type={type}
                     placeholder="Password"
                     name={name}
                     onChange={(e) => {
                       onChange(e)
                       onHandleChange(e, 'password')
                     }}
                     {...register('password', { required: true })}
                  />
                  <span
                              className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''}`}
                              onClick={handleShowHidePassword} >
                            </span>
                </div>
                {errors.password?.message && <Form.Text className="error-msg">{errors.password?.message} </Form.Text>}
                {/* <Form.Text className="error-msg">Password is Incorrect</Form.Text> */}
              </Form.Group>
              <Button variant="primary" type="submit" className='theme-btn large-btn'>
                Login
              </Button>
            </Form>
            {
              location.pathname === '/' && <><div className="seprater-box">
              <span>Or</span>
            </div>
            <Link to="/login-with-otp" className='d-block text-center' >Login with OTP</Link></>
            }
          </div>
          <div className="redirect-to-signin">
            <p>Don&apos;t have an account yet? <Link to="/signup">Create an account</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
