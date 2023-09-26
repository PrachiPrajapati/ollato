import React, { useRef, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
import BackArrow from '../../../Components/BackArrow'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { verifyOtp, otpVerifiedAction } from '../../../Actions/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'

// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  input1: yup.string().required('OTP is required'),
  input2: yup.string().required('OTP is required'),
  input3: yup.string().required('OTP is required'),
  input4: yup.string().required('OTP is required')
})

function OneTimePassword (props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const isVerified = useSelector(state => state.auth.isOtpVerified)
  const isAuthMessage = useSelector(state => state.auth.resMessage)
  const AuthToken = useSelector(state => state.auth.authToken)
  const previousProps = useRef({ isAuth, isVerified, isAuthMessage }).current
  const EmailMobile = localStorage.getItem('EmailMobile')
  console.log('isAuthMessage', isAuthMessage)
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  console.log('token', AuthToken)
  // eslint-disable-next-line react/prop-types
  const url = localStorage.getItem('url')
  const { onChange, name } = register('emailMob')

  const onSubmit = data => {
    let userData = {}
    // console.log('input++', data.input1 + data.input2 + data.input3 + data.input4)
    // eslint-disable-next-line no-empty
    if (url === '/forgot-password') {
      userData = {
        otp: data.input1 + data.input2 + data.input3 + data.input4,
        token: AuthToken
      }
      console.log('userData inside forfgot', userData)
      if (userData) {
        // console.log('userData', userData)
        dispatch(otpVerifiedAction(userData))
      }
    } else {
      userData = {
        login: EmailMobile,
        otp: data.input1 + data.input2 + data.input3 + data.input4
      }
      console.log('userData inside login', userData)
      if (userData) {
        // console.log('userData', userData)
        dispatch(verifyOtp(userData))
      }
    }
    reset()
  }
  // Auto next to next input field
  const inputfocus = (elmnt) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 2
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    } else {
      // console.log('next')
      const next = elmnt.target.tabIndex
      if (next <= 4) {
        elmnt.target.form.elements[next].focus()
      }
    }
  }

  // Toastify Notification
  useEffect(() => {
    console.log('helloooooo', previousProps?.isVerified !== isVerified)
    if (previousProps?.isVerified !== isVerified) {
      if (isVerified) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/reset-password')
      } else if (isVerified === false) {
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
      previousProps.isVerified = isVerified
    }
  }, [isVerified])

  useEffect(() => {
    console.log('helloooooo', previousProps?.isAuth !== isAuth)
    if (previousProps?.isAuth !== isAuth) {
      console.log('isAuth', isAuth)
      console.log('previouspropisAuth', isAuthMessage)
      if (isAuth) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/dashboard')
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
  return (
    <>
      <div className="common-layout">
       <AuthLeftLogo />
        <div className="form-box-section justify-content-center">
         <div className="middle-form">
           <BackArrow location={location} />
           <Form.Group className="form-group " controlId="formBasicotp">
          <div className="title-box has-subtitle">
              <h2>One Time Password </h2>
              <h4>We sent you 4 digit OTP code in your Email ID <a href="mailto:abc@xyz.com">{EmailMobile}</a> </h4>
            </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
                  {/* {console.log('errors', errors)} */}
                  <Form.Group className="form-group " controlId="formBasicotp">
                      <Form.Label>One Time Password</Form.Label>
                       <div className="otp-input-fields">
                          <Form.Group
                            className={`form-group ${errors.input1?.message ? 'error-occured' : ''}`}
                            controlId="formBasicotp"
                          >
                            <Form.Control
                               type="number"
                               name={name}
                               placeholder="X"
                               tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}
                               onChange={(e) => {
                                 onChange(e)
                               }}
                               {...register('input1', { required: true })}
                                />
                          </Form.Group>
                          <Form.Group
                             className={`form-group ${errors.input2?.message ? 'error-occured' : ''}`}
                             controlId="formBasicotp">
                            <Form.Control
                               type="number"
                               name={name}
                               placeholder="X"
                               tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}
                               onChange={(e) => {
                                 onChange(e)
                               }}
                               {...register('input2', { required: true })}
                            />
                          </Form.Group>
                          <Form.Group
                             className={`form-group ${errors.input3?.message ? 'error-occured' : ''}`}
                             controlId="formBasicotp">
                            <Form.Control
                               type="number"
                               name={name}
                               placeholder="X"
                               tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}
                               onChange={(e) => {
                                 onChange(e)
                               }}
                               {...register('input3', { required: true })}
                            />
                          </Form.Group>
                            <Form.Group
                               className={`form-group ${errors.input4?.message ? 'error-occured' : ''}`}
                               controlId="formBasicotp"
                               >
                              <Form.Control
                               type="number"
                               name={name}
                               placeholder="X"
                               tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                               onChange={(e) => {
                                 onChange(e)
                               }}
                               {...register('input4', { required: true })}
                            />
                            </Form.Group>
                        </div>
                        {/* <Form.Text className="error-msg">OTP is Incorrect</Form.Text> */}
                        {
                          ((errors.input1?.message) ||
                          (errors.input2?.message) ||
                          (errors.input3?.message) ||
                          (errors.input4?.message)) &&
                          <Form.Text className="error-msg">{errors.input1?.message || errors.input2?.message || errors.input3?.message || errors.input4?.message}</Form.Text>
                        }
                      </Form.Group>
                    <Button variant="primary" type="submit" className='theme-btn large-btn'>
                      Send
                    </Button>
                </Form>
          </Form.Group>
          </div>
        </div>
      </div>
    </>
  )
}

export default OneTimePassword
