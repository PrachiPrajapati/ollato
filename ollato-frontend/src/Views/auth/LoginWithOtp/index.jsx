import React, { useRef, useEffect } from 'react'

/* NPM-Packages */
// import { Formik } from 'formik'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

/* Language Components */
import Language from '../../../Components/Language'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
/* Action-File */
import { sendOTP } from '../../../Actions/auth'

// Validation-Scheme for fields
const validationSchema = yup.object().shape({
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
      })
})
function LoginWithOtp () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const isSend = useSelector(state => state.auth.isOTPSend)
  const isAuthMessage = useSelector(state => state.auth.resMessage)
  const sdf = useSelector(state => console.log('state', state))
  const previousProps = useRef({ isSend, isAuthMessage, sdf }).current
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('emailMob')

  // Submit Method
  const onSubmit = data => {
    localStorage.setItem('EmailMobile', data.emailMob)
    const userData = {
      login: data.emailMob
    }
    console.log('userData', userData)
    if (userData) {
      dispatch(sendOTP(userData))
    }
    reset()
  }

  // Method to set url
  useEffect(() => {
    localStorage.setItem('url', location.pathname)
  }, [])

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

  // Toastify Notification
  useEffect(() => {
    console.log('helloooooo', previousProps?.isAuth !== isSend)
    if (previousProps?.isSend !== isSend) {
      console.log('is send', isSend)
      console.log('res message', isAuthMessage)
      if (isSend) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
        navigate('/one-time-password')
      } else if (isSend === false) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000
        }
        )
      }
    }
    return () => {
      previousProps.isSend = isSend
    }
  }, [isSend])

  return (
    <>
       <div className="common-layout">
       <AuthLeftLogo />
        <div className="form-box-section">
          <Language />
         <div className="middle-form">
          <div className="title-box">
              <h2>Login</h2>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="form-group" controlId="formBasicEmail">
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
              <Button variant="primary" type="submit" className='theme-btn large-btn'>
                Send OTP
              </Button>
            </Form>
            <div className="seprater-box">
              <span>Or</span>
            </div>
            {/* <a href="#" className='d-block text-center'>Login with Password</a> */}
            <Link to="/" className='d-block text-center' >Login with Password</Link>
          </div>
          <div className="redirect-to-signin">
            <p>Don&apos;t have an account yet? <a href="#">Create an account</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginWithOtp
