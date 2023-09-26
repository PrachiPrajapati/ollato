import React, { useRef, useEffect } from 'react'
// NPM PAckages
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'react-notistack'
// React Bootstrap Components
import { Form, Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { otpVerification, mobileOTPVerification } from '../../../Actions/auth'

// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  input1: yup.string().required('OTP is required'),
  input2: yup.string().required('OTP is required'),
  input3: yup.string().required('OTP is required'),
  input4: yup.string().required('OTP is required')
})
const Index = (props) => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  // const [isShowEmailMobile, setShowEmailMobile] = useState(false)
  const isVerified = useSelector(state => state.auth.isOTPSignupVerified)
  const isOtpVerified = useSelector(state => state.auth.isMobileOTPSend)
  const isMobileVerified = useSelector(state => state.auth.isMobileOTPVerification)
  const isAuthMessage = useSelector(state => state.auth.resMessage)
  const isSend = useSelector(state => state.auth.isEmailAddressVerified)
  const previousProps = useRef({ isVerified, isMobileVerified, isAuthMessage, isSend }).current
  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isOtpVerified !== isOtpVerified) {
      if (isOtpVerified) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        setShow(false)
        // setShowEmailMobile(false)
      } else if (isOtpVerified === false) {
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
      previousProps.isOtpVerified = isOtpVerified
    }
  }, [isOtpVerified])
  useEffect(() => {
    if (previousProps?.isMobileVerified !== isMobileVerified) {
      if (isMobileVerified === true) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        setShow(true)
        // setShowEmailMobile(true)
      } else if (isMobileVerified === false) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
        setShow(false)
      }
    }
    return () => {
      previousProps.isMobileVerified = isMobileVerified
    }
  }, [isMobileVerified])
  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isSend !== isSend) {
      if (isSend) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        setShow(true)
        // setShowEmailMobile(true)
      } else if (isSend === false) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
        setShow(false)
      }
    }
    return () => {
      previousProps.isSend = isSend
    }
  }, [isSend])
  // eslint-disable-next-line react/prop-types
  const { show, setShow } = props
  //   const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    // setShowEmailMobile(false)
  }
  // const emailMobile = localStorage.getItem('EmailMobile')
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const { onChange, name } = register('emailMob')
  const onSubmit = data => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // eslint-disable-next-line react/prop-types
    re.test(props.email)
    // eslint-disable-next-line react/prop-types
    let userData = {}
    // eslint-disable-next-line react/prop-types
    if (re.test(props.email)) {
      userData = {
        // eslint-disable-next-line react/prop-types
        login: props.email,
        otp: data.input1 + data.input2 + data.input3 + data.input4
      }
      if (userData) {
        dispatch(otpVerification(userData))
      }
    } else {
      userData = {
        // eslint-disable-next-line react/prop-types
        login: props.email,
        otp: data.input1 + data.input2 + data.input3 + data.input4
      }
      if (userData) {
        dispatch(mobileOTPVerification(userData))
      }
    }
    // eslint-disable-next-line react/prop-types
    props?.parentCallback(data.input1 + data.input2 + data.input3 + data.input4)
    reset()
  }

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isVerified !== isVerified) {
      if (isVerified) {
        enqueueSnackbar(`${isAuthMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        setShow(false)
        // setShowEmailMobile(false)
      } else if (isVerified === false) {
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
  // Auto next to next input field
  const inputfocus = (elmnt) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const next = elmnt.target.tabIndex - 2
      if (next > -1) {
        elmnt.target.form.elements[next].focus()
      }
    } else {
      const next = elmnt.target.tabIndex
      if (next <= 4) {
        elmnt.target.form.elements[next].focus()
      }
    }
  }
  // useEffect(() => {
  //   if (show === true) {
  //     setShowEmailMobile(true)
  //   } else {
  //     setShowEmailMobile(false)
  //   }
  // }, [show])
  return (
       <>
       <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="title-box has-subtitle">
              <h2>One Time Password </h2>
              {/* eslint-disable-next-line react/prop-types */}
              <h4>We sent you 4 digit OTP code in your  <a href="mailto:abc@xyz.com">{props.email}</a> </h4>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
          </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
       </Modal>
       </>
  )
}

export default Index
