import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import Select from 'react-select'
import verified from '../../../assets/images/verified.svg'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { emailVerification, mobileVerification } from '../../../Actions/auth'
import Modal from '../VerificationModal'
// Phone Number Validation
const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/
const emailRegex = /.+@.+\.[A-Za-z]+$/
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string().required('Middle Name is required'),
  lastName: yup.string().required('Last Name is required'),
  dob: yup.string().required('Date of Birth is required'),
  gender: yup.string().required('Gender is required').nullable(),
  fName: yup.string().required('Father Name is required'),
  mName: yup.string().required('Mother Name is required'),
  mobileNumber: yup
    .string()
    .required('Mobile Number is required')
    .matches(phoneRegex, 'Enter valid Mobile Number'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Enter valid E-Mail'),
  professional: yup
    .object()
    .shape({
      label: yup.string().required('Professional Expertness is required'),
      value: yup.string().required('Professional Expertness is required')
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('Professional Expertness is required'),
  files: yup.mixed().test('required', 'Please select a file', (value) => {
    return value && value.length
  }),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passRegex,
      'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'
    ),
  cPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Password and Confirm password must be same '
    )
  // uResume: yup.array()
  // .nullable()
  // .required('File is required')
  // uResume: yup.object().required('File is required').nullable()
})

function CounsellorDetails (props) {
  const navigate = useNavigate()

  /* for professionalExpertness */
  const professionalExpertness = [
    { value: '10th', label: '10th' },
    { value: '12th', label: '12th' }
  ]
  const [selectedProfessionalExpertness] = useState([
    { value: '10th', label: '10th' }
  ])
  /* modal */
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  // const [mobile, setMobile] = useState(false)
  const [cData, setCData] = useState([])
  const [otp, setOTP] = useState('')
  const [type, setType] = useState('password')
  const [isShowPassword, setShowPassword] = useState(false)
  // const [Ctype, setCType] = useState('password')
  // const [isShowCPassword, setShowCPassword] = useState(false)
  const handleCallback = (childData) => {
    setOTP(childData)
  }
  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)
  const dispatch = useDispatch()
  const isVerified = useSelector(state => state.auth.isOTPSignupVerified)
  const isDone = useSelector(state => state.auth.isMobileOTPSend)
  // const [isVerifiedFlag, setIsVerifiedFlag] = useState(false)
  const { control, register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  // useEffect(() => {
  //   setSelectedFile(false)
  // }, [])
  const { onChange, onBlur, name } = register('firstName', 'dob', 'gender', 'fName', 'mName', 'mobileNumber', 'email', 'terms', 'files', 'professional')
  // useEffect(() => {
  //   if (isVerified === true) {
  //     setIsVerifiedFlag(true)
  //   } else {
  //     setIsVerifiedFlag(false)
  //   }
  // }, [isVerified])
  const handleShow = () => {
    let userData = {}
    if (email) {
      userData = {
        emailMobile: email
      }
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

  // Handle method show/hide password
  // const handleShowHideCPassword = () => {
  //   if (Ctype === 'password') {
  //     setCType('text')
  //     setShowCPassword(true)
  //   } else {
  //     setCType('password')
  //     setShowCPassword(false)
  //   }
  // }

  const onSubmit = (data) => {
    // eslint-disable-next-line react/prop-types
    props.setNow(33.3)
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
      file: data.files[0],
      professional: data.professional.value,
      otp,
      password: data.password
    }
    if (array) {
      setCData({
        ...array
      })
    }
    console.log('array', array)

    navigate('/educationdetails', { state: { data: array } })
    // reset()
  }
  console.log('dataaa', cData)
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group
          className={`form-group ${
            errors.firstName?.message ? 'error-occured' : ''
          }`}
          controlId='formfirstname'
        >
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter First Name'
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e)
            }}
            {...register('firstName', { required: true })}
          />
          {errors.firstName?.message && (
            <Form.Text className='error-msg'>
              {errors.firstName?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className={`form-group ${
            errors.middleName?.message ? 'error-occured' : ''
          }`}
          controlId='formfullname'
        >
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type='text'
            name={name}
            placeholder='Enter Middle Name'
            onChange={(e) => {
              onChange(e)
            }}
            {...register('middleName', { required: true })}
          />
          {errors.middleName?.message && (
            <Form.Text className='error-msg'>
              {errors.middleName?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className={`form-group ${
            errors.lastName?.message ? 'error-occured' : ''
          }`}
          controlId='formfullname'
        >
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            name={name}
            placeholder='Enter Last Name'
            onChange={(e) => {
              onChange(e)
            }}
            {...register('lastName', { required: true })}
          />
          {errors.lastName?.message && (
            <Form.Text className='error-msg'>
              {errors.lastName?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className={`form-group ${errors.dob?.message ? 'error-occured' : ''}`}
          controlId='formdate'
        >
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type='date'
            placeholder='Date Of Birth'
            name={name}
            onChange={(e) => {
              onChange(e)
            }}
            {...register('dob', { required: true })}
          />
          {errors.dob?.message && (
            <Form.Text className='error-msg'>{errors.dob?.message} </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className='form-group gender-box d-flex align-items-center'
          // className={`form-group gender-box d-flex align-items-center ${errors.dob?.message ? 'error-occured' : ''}`}
          controlId='formgender'
        >
          <Form.Label>Gender</Form.Label>
          <Form.Check type='radio' id='radio-1'>
            <div className='radio-input'>
              <Form.Check.Input
                type='radio'
                name={name}
                onBlur={onBlur}
                value='male'
                onChange={(e) => {
                  onChange(e)
                }}
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
                value='female'
                onBlur={onBlur}
                onChange={(e) => {
                  onChange(e)
                }}
                {...register('gender', { required: true })}
              />
            </div>
            <Form.Check.Label>Female</Form.Check.Label>
          </Form.Check>
        </Form.Group>
        {errors.gender?.message && (
          <Form.Text className='error-msg'>{errors.gender?.message} </Form.Text>
        )}
        <Form.Group
          className={`form-group ${
            errors.fName?.message ? 'error-occured' : ''
          }`}
          controlId='formfathername'
        >
          <Form.Label>Father&apos;s Name</Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter Father's Name"
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e)
            }}
            {...register('fName', { required: true })}
          />
          {errors.fName?.message && (
            <Form.Text className='error-msg'>
              {errors.fName?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className={`form-group ${
            errors.mName?.message ? 'error-occured' : ''
          }`}
          controlId='formmothername'
        >
          <Form.Label>Mother&apos;s Name</Form.Label>
          <Form.Control
            type='text'
            placeholder="Enter Mother's Name"
            name={name}
            onBlur={onBlur}
            onChange={(e) => {
              onChange(e)
            }}
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
              type='tel'
              placeholder='Enter Mobile Number'
              name={name}
              onBlur={onBlur}
              {...register('mobileNumber', { required: true })}
              onChange={(e) => {
                onChange(e)
                setEmail(e.target.value)
              }}
            />
            <button
              type='button'
              onClick={handleShow}
              className='otp-verification-link'
            >
              <span>OTP Verification</span>{' '}
              <img src={verified} className='verification-sign' alt='' />
            </button>
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
              type='email'
              placeholder='Enter Email ID'
              name={name}
              {...register('email', { required: true })}
              onChange={(e) => {
                onChange(e)
                setEmail(e.target.value)
              }}
            />
            <button
              type='button'
              disabled={!email}
              onClick={handleShow}
              className='otp-verification-link'
            >
              <span>OTP Verification</span>{' '}
              <img src={verified} className='verification-sign' alt='' />
            </button>
          </div>
          {errors.email?.message && (
            <Form.Text className='error-msg'>
              {errors.email?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className='form-group common-select-style'
          controlId='formfullname'
        >
          <Form.Label>Professional Expertness</Form.Label>
          <Controller
            name='professional'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                // onChange={setSelectedProfessionalExpertness}
                options={professionalExpertness}
                placeholder={'Select Professional Expertness'}
                {...field}
                // enable isClearable to demonstrate extra error handling
                isSearchable={false}
                Value={selectedProfessionalExpertness}
                className='react-dropdown'
                classNamePrefix='dropdown'
              />
            )}
          />
          <p className='error-msg'>
            {errors.professional?.message || errors.professional?.label.message}
          </p>
        </Form.Group>
        <Form.Group
          controlId='formFile'
          className='form-group resume-file-input'
        >
          <Form.Label>Resume</Form.Label>
          <Form.Control
            type='file'
            title='Upload Resume'
            className='hidden-file'
            name='files'
            accept='application/pdf,application/msword'
            {...register('files', { required: true })}
          />
          <div className='form-control d-flex justify-content-between align-items-center'>
            {/* <p className='m-0'>Upload Resume</p> */}
            {!watch('files') || watch('files').length === 0
              ? (
              <p className='m-0'>Upload Resume</p>
                )
              : (
              <p className='m-0 file-name-resume'>{watch('files')[0].name}</p>
                )}
            <button className='browse-btn'>Browse</button>
          </div>
          <p className='error-msg'>
            {errors.files?.message || errors.files?.label.message}
          </p>
        </Form.Group>
        <Form.Group
          className={`form-group ${
            errors.password?.message ? 'error-occured' : ''
          }`}
          controlId='formnewPassword'
        >
          <Form.Label>New Password</Form.Label>
          <div className='password-box'>
            <Form.Control
              type={type}
              placeholder='Enter New Password'
              name={name}
              onChange={(e) => {
                onChange(e)
              }}
              {...register('password', { required: true })}
            />
            <span
              className={`show-hide-pass ${isShowPassword ? 'show-pass' : ''}`}
              onClick={handleShowHidePassword}
            ></span>
          </div>
          {errors.password?.message && (
            <Form.Text className='error-msg'>
              {errors.password?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group
          className={`form-group ${
            errors.cPassword?.message ? 'error-occured' : ''
          }`}
          controlId='formconfirmPassword'
        >
          <Form.Label>Confirm Passwod</Form.Label>
          <div className='password-box no-eye'>
            <Form.Control
              type='password'
              placeholder='Re-enter New Password'
              name={name}
              onChange={(e) => {
                onChange(e)
              }}
              {...register('cPassword', { required: true })}
            />
            {/* <span
                    className={`show-hide-pass ${isShowCPassword ? 'show-pass' : ''}`}
                              onClick={handleShowHideCPassword} >
                  </span> */}
          </div>
          {errors.cPassword?.message && (
            <Form.Text className='error-msg'>
              {errors.cPassword?.message}{' '}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant='primary' type='submit' className='theme-btn large-btn' onClick={() => onSubmit()}>
          {' '}
          Next{' '}
        </Button>
      </Form>
      <Modal
        show={show}
        email={email}
        setShow={setShow}
        parentCallback={handleCallback}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      />
    </>
  )
}

export default CounsellorDetails
