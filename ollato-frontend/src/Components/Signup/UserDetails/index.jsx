import React, { useState, useEffect } from 'react'
// NPM Packages
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
// import { useSnackbar } from 'react-notistack'

// React Bootstrap Components
import { Form, Button } from 'react-bootstrap'
import verified from '../../../assets/images/verified.svg'
import { useDispatch, useSelector } from 'react-redux'

import Modal from '../../VerificationModal'
import { emailVerification, mobileVerification } from '../../../Actions/auth'
// Phone Number Validation
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
const emailRegex = /.+@.+\.[A-Za-z]+$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dob: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required').nullable(),
  fName: yup.string().required('Father Name is required'),
  mName: yup.string().required('Mother Name is required'),
  // terms: yup.string().required('Terms & Conditions is required'),
  terms: yup.boolean()
    .oneOf([true], 'You must accept the policy terms and conditions'),
  mobileNumber: yup.string().required('Mobile Number is required').matches(phoneRegex, 'Enter valid Mobile Number'),
  email: yup.string().required('Email is required').matches(emailRegex, 'Enter valid E-Mail'),
  password: yup.string().required('Password is required').matches(passRegex, 'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'),
  cPassword: yup.string().required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Password and Confirm password must be same ')
})

function UserDetails (props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isVerified = useSelector(state => state.auth.isOTPSignupVerified)
  const isMobileVerified = useSelector(state => state.auth.isMobileOTPVerification)
  const isDone = useSelector(state => state.auth.isMobileOTPSend)
  const rfgh = useSelector(state => console.log('state', state))
  const [isVerifiedFlag, setIsVerifiedFlag] = useState(false)
  const [isMobileVerifiedFlag, setMobileVerificationFlag] = useState(false)
  const [otp, setOTP] = useState('')
  const [type, setType] = useState('password')
  const [isShowPassword, setShowPassword] = useState(false)
  console.log('isDone****', isDone)
  console.log('rfgh****', rfgh)
  console.log('isVerified****', isMobileVerified)
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
  useEffect(() => {
    if (isVerified === true) {
      setIsVerifiedFlag(true)
    } else {
      setIsVerifiedFlag(false)
    }
  }, [isVerified])
  useEffect(() => {
    if (isMobileVerifiedFlag === true) {
      setMobileVerificationFlag(true)
    } else {
      setMobileVerificationFlag(false)
    }
  }, [isMobileVerified])
  // const { enqueueSnackbar } = useSnackbar()
  const [email, setEmail] = useState('')
  // const [mobile, setMobile] = useState('')
  /* modal */
  const [show, setShow] = useState(false)
  // const handleClose = () => setShow(false)
  const handleShow = () => {
    let userData = {}
    if (email) {
      userData = {
        emailMobile: email
      }
      console.log('userData', userData)
      if (userData) {
        dispatch(emailVerification(userData))
      }
      setShow(true)
    } else {
      userData = {
        emailMobile: email
      }
      if (userData) {
        dispatch(mobileVerification(userData))
      }
      setShow(true)
    }
  }
  // const [setStudentData] = useState([{
  //   fullName: '',
  //   dob: '',
  //   gender: '',
  //   fName: '',
  //   mName: '',
  //   mobileNumber: '',
  //   email: ''
  // }])
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  // console.log('mobile', mobile)
  const { onChange, onBlur, name } = register('firstName', 'middleName', 'lastName', 'dob', 'gender', 'fName', 'mName', 'mobileNumber', 'email', 'terms')

  const handleCallback = (childData) => {
    setOTP(childData)
  }
  console.log('opt', otp)

  // Form onSubmit Method
  const onSubmit = data => {
    console.log('data', data)
    setIsVerifiedFlag(false)
    console.log('flag---', isVerifiedFlag)
    const array = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      dob: data.dob,
      gender: data.gender,
      fName: data.fName,
      mName: data.mName,
      mobileNumber: data.mobileNumber,
      email: data.email,
      password: data.password,
      cPassword: data.cPassword,
      otp: otp
    }
    if (array) {
      console.log('array', array)
      // setStudentData({
      //   ...array
      // })
    }
    // console.log('studentData', studentData)
    navigate('/signup-educationdetails', { state: { data: array } })
    // reset()
  }
  // const onHandleChange = (e) => {
  //   console.log('e', e)
  // }

  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group
         className={`form-group ${errors.firstName?.message ? 'error-occured' : ''}`}
         controlId="formfullname"
      >
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name={name}
          placeholder="Enter First Name"
          onChange={(e) => { onChange(e) }}
          {...register('firstName', { required: true })}
        />
      {errors.firstName?.message && <Form.Text className="error-msg">{errors.firstName?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
         className={`form-group ${errors.middleName?.message ? 'error-occured' : ''}`}
         controlId="formfullname"
      >
        <Form.Label>Middle Name</Form.Label>
        <Form.Control
          type="text"
          name={name}
          placeholder="Enter Middle Name"
          onChange={(e) => { onChange(e) }}
          {...register('middleName', { required: true })}
        />
      {errors.middleName?.message && <Form.Text className="error-msg">{errors.middleName?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
         className={`form-group ${errors.lastName?.message ? 'error-occured' : ''}`}
         controlId="formfullname"
      >
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name={name}
          placeholder="Enter Last Name"
          onChange={(e) => { onChange(e) }}
          {...register('lastName', { required: true })}
        />
      {errors.lastName?.message && <Form.Text className="error-msg">{errors.lastName?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
        className={`form-group ${errors.dob?.message ? 'error-occured' : ''}`}
        controlId="formdate">
        <Form.Label>Date Of Birth</Form.Label>
        <Form.Control
          type="date"
          placeholder="Date Of Birth"
          name={name}
          onChange={(e) => { onChange(e) }}
          {...register('dob', { required: true })}
        />
      {errors.dob?.message && <Form.Text className="error-msg">{errors.dob?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
        className="form-group gender-box d-flex align-items-center"
        // className={`form-group gender-box d-flex align-items-center ${errors.dob?.message ? 'error-occured' : ''}`}
        controlId="formgender"
      >
        <Form.Label>Gender</Form.Label>
          <Form.Check type='radio' id='radio-1' >
              <div className='radio-input'>
                <Form.Check.Input
                    type='radio'
                    name={name}
                    onBlur={onBlur}
                    value="male"
                    onChange={(e) => { onChange(e) }}
                    {...register('gender', { required: true })}
                />
              </div>
              <Form.Check.Label>Male</Form.Check.Label>
          </Form.Check>
          <Form.Check type='radio' id='radio-2'>
              <div className='radio-input'>
                 <Form.Check.Input
                   type='radio'
                   name={name}
                   value="female"
                   onBlur={onBlur}
                   onChange={(e) => { onChange(e) }}
                   {...register('gender', { required: true })}
                 />
              </div>
          <Form.Check.Label>Female</Form.Check.Label>
          </Form.Check>
      </Form.Group>
      {errors.gender?.message && <Form.Text className="error-msg">{errors.gender?.message} </Form.Text>}
      <Form.Group
        className={`form-group ${errors.fName?.message ? 'error-occured' : ''}`}
        controlId="formfathername">
        <Form.Label>Father&apos;s Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Father&apos;s Name"
            name={name}
            onBlur={onBlur}
            onChange={(e) => { onChange(e) }}
            {...register('fName', { required: true })}
          />
      {errors.fName?.message && <Form.Text className="error-msg">{errors.fName?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
        className={`form-group ${errors.mName?.message ? 'error-occured' : ''}`}
        controlId="formmothername"
      >
        <Form.Label>Mother&apos;s Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Mother&apos;s Name"
            name={name}
            onBlur={onBlur}
            onChange={(e) => { onChange(e) }}
            {...register('mName', { required: true })}
          />
      {errors.mName?.message && <Form.Text className="error-msg">{errors.mName?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
        // className="form-group"
        className={`form-group ${errors.mobileNumber?.message ? 'error-occured' : ''} ${isDone ? 'verified' : ''}`}
        controlId="formBasicmobile"
      >
        <Form.Label>Mobile Number</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="tel"
              placeholder="Enter Mobile Number"
              name={name}
              onBlur={onBlur}
              {...register('mobileNumber', { required: true })}
              onChange={(e) => {
                onChange(e)
                // console.log(e.target.value, '------errrrrrrrrr---')
                // localStorage.setItem('EmailMobile', e.target.value)
                setEmail(e.target.value)
              }}
            />
            <button type="button" onClick={handleShow} className='otp-verification-link'><span>OTP Verification</span> <img src={verified} className="verification-sign" alt="" /></button>
          </div>
      {errors.mobileNumber?.message && <Form.Text className="error-msg">{errors.mobileNumber?.message} </Form.Text>}
      </Form.Group>
      <Form.Group
        // className="form-group verified"
        className={`form-group ${errors.email?.message ? 'error-occured' : ''} ${isVerified ? 'verified' : ''}`}
        controlId="formBasicEmail"
      >
        <Form.Label>Email ID</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="email"
              placeholder="Enter Email ID"
              name={name}
              {...register('email', { required: true })}
              onChange={(e) => {
                onChange(e)
                // console.log(e.target.value, '------errrrrrrrrr---')
                // localStorage.setItem('EmailMobile', e.target.value)
                setEmail(e.target.value)
              }}
              // onSelect={(e) => {
              //   console.log(e.target.value, '-----eeee----')
              // }}
            />
            <button type="button" disabled={!email} onClick={handleShow} className='otp-verification-link'><span>OTP Verification</span> <img src={verified} className="verification-sign" alt="" /></button>
          </div>
      {errors.email?.message && <Form.Text className="error-msg">{errors.email?.message} </Form.Text>}
      </Form.Group>
      <Form.Group className={`form-group ${errors.password?.message ? 'error-occured' : ''}`} controlId="formnewPassword">
                <Form.Label>New Password</Form.Label>
                <div className="password-box no-eye" >
                  <Form.Control
                     type={type}
                     placeholder="Enter New Password"
                     name={name}
                     onChange={(e) => {
                       onChange(e)
                     }}
                    {...register('password', { required: true })}
                  />
                  {errors.password?.message && <Form.Text className="error-msg">{errors.password?.message} </Form.Text>}
                </div>
                <span
                    className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''}`}
                              onClick={handleShowHidePassword} >
                  </span>
              </Form.Group>
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
      <Form.Group className="form-group checkbox-box" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" id='checkbox-1'>
          <Form.Check.Input
            type="checkbox"
            id="terms"
            onBlur={onBlur}
            onChange={(e) => { onChange(e) }}
            {...register('terms', { required: true })}
          />
          <Form.Check.Label>I agree with all <a href="#">Terms & Conditions</a></Form.Check.Label>
        </Form.Check>
      {errors.terms?.message && <Form.Text className="error-msg">{errors.terms?.message} </Form.Text>}
      </Form.Group>
      <Button variant="primary" type="submit" className='theme-btn large-btn'> Next </Button>
    </Form>
    <Modal show={show} email={email} setShow={setShow} parentCallback={handleCallback} aria-labelledby="contained-modal-title-vcenter"
      centered />
    </>
  )
}

export default UserDetails
UserDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
}
