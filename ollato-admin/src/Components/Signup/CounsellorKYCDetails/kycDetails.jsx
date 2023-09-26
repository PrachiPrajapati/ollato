import React, { useRef, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
/* import profilePlaceholder from '../../../assets/images/profile-placeholder.svg' */
import otherdocPlaceholder from '../../../assets/images/other-img-placeholder.svg'
// import profilePicture from '../../../assets/images/profile-picture.png'
import defaultPicture from '../../../assets/images/default.png'
// import pancardImg from '../../../assets/images/pancard-img.png'
import crossWhite from '../../../assets/images/crosswhite.svg'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerC } from '../../../Actions/auth'
import { useSnackbar } from 'react-notistack'

const panCard = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/
const aadharCard = /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/
const gstNo = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
// Validation-Scheme for fields
const validationSchema = yup.object().shape({
  files: yup.mixed().test('required', 'Please select a file', value => {
    return value && value.length
  }),
  panNo: yup
    .string()
    .required('PanCard number is required').matches(panCard, 'Please enter valid pancard number'),
  panCardFiles: yup.mixed().required('File is required').test('required', 'Please select a file', value => {
    console.log('v____', value.length)
    return value && value.length
  }),
  aadharNo: yup
    .string()
    .required('AadharCard number is required').matches(aadharCard, 'Please enter valid aadhar number'),
  frontSideFiles: yup.mixed().required('File is required').test('required', 'Please select a file', value => {
    return value && value.length
  }),
  backSideFiles: yup.mixed().required('File is required').test('required', 'Please select a file', value => {
    return value && value.length
  }),
  gstNo: yup
    .string()
    .required('GST number is required').matches(gstNo, 'Please enter valid GST number'),
  signature: yup.mixed().required('File is required').test('required', 'Please select a file', value => {
    return value && value.length
  }),
  terms: yup.boolean()
    .oneOf([true], 'You must accept the policy terms and conditions')
})
function CounsellorKYCDetails () {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedImage, setSelectedFile] = useState()
  const [selectedPanCard, setPanCardImage] = useState()
  const [selectedAadharCard, setAadharCard] = useState()
  const [selectedBackSideImage, setBackSideImage] = useState()
  const [signature, setSignatureImage] = useState()
  const { enqueueSnackbar } = useSnackbar()
  const registeredFlag = useSelector(state => state.auth.isRegistered)
  const registredResMessage = useSelector(state => state.auth.resMessage)
  const previousProps = useRef({ registeredFlag, registredResMessage }).current
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema)
  })
  console.log('selectedPanCard', selectedPanCard)
  useEffect(() => {
  }, [selectedPanCard])
  const handleImageClose = (e, type) => {
    console.log('e', e)
    e.preventDefault()
    switch (type) {
      case 'panCardFile':
        return setPanCardImage()
      case 'frontSideFiles':
        return setAadharCard()
      case 'backSideFiles':
        return setBackSideImage()
      case 'signature':
        return setSignatureImage()
      // eslint-disable-next-line no-fallthrough
      default :
        return null
    }
  }
  useEffect(() => {
    console.log('helloooooo', previousProps?.registeredFlag !== registeredFlag)
    if (previousProps?.registeredFlag !== registeredFlag) {
      if (registeredFlag) {
        enqueueSnackbar(`${registredResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        navigate('/dashboard')
      } else if (registeredFlag === false) {
        console.log('inside')
        enqueueSnackbar(`${registredResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.registeredFlag = registeredFlag
    }
  }, [registeredFlag])
  const { onChange, name } = register('panNo')
  // Form onSubmit Method
  const onSubmit = data => {
    console.log('data', data)
    console.log('location', location.state.data.email)
    const array = {
      first_name: location.state.data.first_name,
      middle_name: location.state.data.middle_name,
      last_name: location.state.data.last_name,
      email: location.state.data.email,
      mobile: location.state.data.mobile,
      dob: location.state.data.dob,
      gender: location.state.data.gender,
      father_name: location.state.data.father_name,
      mother_name: location.state.data.mother_name,
      password: location.state.data.password,
      OTP: location.state.data.OTP,
      is_verify: 'y',
      is_active: 'y',
      professional_expertness: location.state.data.professional_expertness,
      created_by: 'ollato',
      updated_by: 'ollato',
      country_id: location.state.data.country_id,
      city_id: location.state.data.city_id,
      pin_code: location.state.data.pin_code,
      high_qualification_id: location.state.data.high_qualification_id,
      high_university_id: location.state.data.high_university_id,
      last_qualification_id: location.state.data.last_qualification_id,
      last_university_id: location.state.data.last_university_id,
      certificate_qualification_id: location.state.data.certificate_qualification_id,
      certificate_university_id: location.state.data.certificate_university_id,
      experience_year: location.state.data.experience_year,
      experience_month: location.state.data.experience_month,
      state_id: location.state.data.state_id,
      resume: location.state.data.resume,
      adharcard_front: data.frontSideFiles[0],
      adharcard_back: data.backSideFiles[0],
      pancard: data.panCardFiles[0],
      profile_picture: data.files[0],
      signature: data.signature[0],
      gst_no: data.gstNo,
      adhar_card_number: data.aadharNo,
      pan_number: data.panNo
    }
    console.log('kycarray', array)
    const formData = new FormData()
    formData.append('first_name', location.state.data.first_name)
    formData.append('middle_name', location.state.data.middle_name)
    formData.append('last_name', location.state.data.last_name)
    formData.append('email', location.state.data.email)
    formData.append('mobile', location.state.data.mobile)
    formData.append('dob', location.state.data.dob)
    formData.append('gender', location.state.data.gender)
    formData.append('father_name', location.state.data.father_name)
    formData.append('mother_name', location.state.data.mother_name)
    formData.append('password', location.state.data.password)
    formData.append('OTP', location.state.data.OTP)
    formData.append('is_verify', 'y')
    formData.append('is_active', 'y')
    formData.append('professional_expertness', location.state.data.professional_expertness)
    formData.append('created_by', 'ollato')
    formData.append('updated_by', 'ollato')
    formData.append('country_id', location.state.data.country_id)
    formData.append('city_id', location.state.data.city_id)
    formData.append('pin_code', location.state.data.pin_code)
    formData.append('high_qualification_id', location.state.data.high_university_id)
    formData.append('high_university_id', location.state.data.high_university_id)
    formData.append('last_qualification_id', location.state.data.last_qualification_id)
    formData.append('last_university_id', location.state.data.last_university_id)
    formData.append('certificate_qualification_id', location.state.data.certificate_qualification_id)
    formData.append('certificate_university_id', location.state.data.certificate_university_id)
    formData.append('experience_year', location.state.data.experience_year)
    formData.append('experience_month', location.state.data.experience_month)
    formData.append('state_id', location.state.data.state_id)
    formData.append('resume', location.state.data.resume)
    formData.append('adharcard_front', data.frontSideFiles[0])
    formData.append('adharcard_back', data.backSideFiles[0])
    formData.append('pancard', data.panCardFiles[0])
    formData.append('profile_picture', data.files[0])
    formData.append('signature', data.signature[0])
    formData.append('gst_no', data.gstNo)
    formData.append('adhar_card_number', data.aadharNo)
    formData.append('pan_number', data.panNo)
    dispatch(registerC(formData))
    reset()
  }
  return (
    <>
    {console.log('errors', errors)}
    <Form>
    <Form.Group controlId="formFile" className="form-group profile-picture common-input-file uploaded-profile">
          <Form.Control
                  type="file"
                  title='Upload Resume'
                  className='hidden-file'
                  name="files"
                  {...register('files', { required: true })}
                  // onChange= {(e) => console.log('e.targe', e.target.files[0])}
                  onChange={(e) => {
                    onChange(e)
                    setSelectedFile(e.target.files[0])
                  }}
          />
         <div className="form-control d-flex align-items-center flex-column justify-content-center text-center ">
          {/*  <div className="img-box"> <img src={profilePlaceholder} alt="" /></div> */}
          <div className="img-box">
            {console.log('selectedImage', selectedImage)}
          {selectedImage
            ? <img
             src={URL.createObjectURL(selectedImage)}
             alt="" />
            : <img
             src={defaultPicture}
             alt="" /> }
           </div>
          <p className='m-0 blue-placeholder'>Upload Profile Photo</p>
         </div>
      </Form.Group>
      <p className="error-msg">{errors.files?.message || errors.files?.label.message}</p>
      <Form.Group className={`form-group ${errors.panNo?.message ? 'error-occured' : ''}`} controlId="formpancardnumber">
        <Form.Label>Pan Card Number</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter Pan Card Number"
            name={name}
            onChange={(e) => { onChange(e) }}
            {...register('panNo', { required: true })}
        />
        <p className="error-msg">{errors.panNo?.message || errors.panNo?.label.message}</p>
       </Form.Group>
      <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file  uploaded-doc">
        <Form.Label>Upload Pan Card</Form.Label>
        <Form.Control
            type="file"
            className='hidden-file'
            name="panCardFiles"
            {...register('panCardFiles', { required: true })}
            onChange={(e) => {
              onChange(e)
              setPanCardImage(e.target.files[0])
            }}
        />
        <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
         <div className="img-box">
         {selectedPanCard
           ? <><img
                  src={URL.createObjectURL(selectedPanCard)}
                  alt="" /><button className="close-cross-btn" onClick={(e) => handleImageClose(e, 'panCardFile')}
                  >
                      <img src={crossWhite} alt="" /></button></>
           : <img
             src={otherdocPlaceholder}
             alt="" />
             }
          <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p>
            {/* <img src={otherdocPlaceholder} alt="" /> */}
         </div>
        </div>
      </Form.Group>
      <p className="error-msg">{errors.panCardFiles?.message || errors.panCardFiles?.label.message}</p>
      <Form.Group className={`form-group ${errors.aadharNo?.message ? 'error-occured' : ''}`} controlId="formaadharcardnumber">
        <Form.Label>Aadhar Card Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Aadhar Card Number"
          name={name}
          onChange={(e) => { onChange(e) }}
          {...register('aadharNo', { required: true })}
        />
        <p className="error-msg">{errors.aadharNo?.message || errors.aadharNo?.label.message}</p>
      </Form.Group>
      <Form.Group controlId="formFile" className="form-group mb-3 document-file-input common-input-file uploaded-doc">
        <Form.Label>Upload Aadhar Card</Form.Label>
        <Form.Control
           type="file"
           className='hidden-file'
           name="frontSideFiles"
           {...register('frontSideFiles', { required: true })}
           onChange={(e) => {
             onChange(e)
             setAadharCard(e.target.files[0])
           }}
        />
        <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
         <div className="img-box">
         {selectedAadharCard
           ? <> <img
             src={URL.createObjectURL(selectedAadharCard)}
             alt="" /><button className="close-cross-btn" onClick={(e) => handleImageClose(e, 'frontSideFiles')} ><img src={crossWhite} alt="" /></button></>
           : <img
             src={otherdocPlaceholder}
             alt="" /> }
             <p className='m-2 blue-placeholder'>Upload JPG, PNG or PDF</p>
          <p className='m-0 color-black'>Front Side</p>
            {/* <img src={otherdocPlaceholder} alt="" /> */}
         </div>
        </div>
      </Form.Group>
      <p className="error-msg">{errors.frontSideFiles?.message || errors.frontSideFiles?.label.message}</p>
      <Form.Group controlId="formFile" className="form-group document-file-input common-input-file uploaded-doc">
        <Form.Control
            type="file"
            className='hidden-file'
            name="backSideFiles"
           {...register('backSideFiles', { required: true })}
           onChange={(e) => {
             onChange(e)
             setBackSideImage(e.target.files[0])
           }}
        />
        <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
         <div className="img-box">
         {selectedBackSideImage
           ? <><img
             src={URL.createObjectURL(selectedBackSideImage)}
             alt="" /><button className="close-cross-btn" onClick={(e) => handleImageClose(e, 'backSideFiles')} ><img src={crossWhite} alt="" /></button></>
           : <><img
             src={otherdocPlaceholder}
             alt="" />
             <p className='m-2 blue-placeholder'>Upload JPG, PNG or PDF</p>
            <p className='m-0 color-black'>Back Side</p></>
             }
            {/* <img src={otherdocPlaceholder} alt="" /> */}
           {/* <img src={otherdocPlaceholder} alt="" /> */}
           {/* <button className="close-cross-btn"><img src={crossWhite} alt="" /></button> */}
           </div>

        </div>
      </Form.Group>
      <p className="error-msg">{errors.backSideFiles?.message || errors.backSideFiles?.label.message}</p>
      <Form.Group className={`form-group ${errors.gstNo?.message ? 'error-occured' : ''}`} controlId="formgstnumber">
        <Form.Label>GST No</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter GST No"
            name={name}
            onChange={(e) => { onChange(e) }}
            {...register('gstNo', { required: true })}
        />
      <p className="error-msg">{errors.gstNo?.message || errors.gstNo?.label.message}</p>
      </Form.Group>
      <Form.Group controlId="formgstnumber" className="form-group document-file-input common-input-file uploaded-doc">
        <Form.Label>Upload Signature</Form.Label>
        <Form.Control
            type="file"
            className='hidden-file'
            name="signature"
            {...register('signature', { required: true })}
            onChange={(e) => {
              onChange(e)
              setSignatureImage(e.target.files[0])
            }}
        />
        <div className="form-control d-flex align-items-center flex-column justify-content-center text-center">
         <div className="img-box">
          {signature
            ? <><img
              src={URL.createObjectURL(signature)}
              alt="" />
              <button className="close-cross-btn" onClick={(e) => handleImageClose(e, 'signature')} ><img src={crossWhite} alt="" /></button></>
            : <><img
              src={otherdocPlaceholder}
              alt="" />
              <p className='m-0 blue-placeholder'>Upload JPG, PNG or PDF</p></>
              }
           {/* <img src={otherdocPlaceholder} alt="" /> */}
         {/* <button className="close-cross-btn"><img src={crossWhite} alt="" /></button> */}
         </div>
        </div>
      </Form.Group>
      <p className="error-msg">{errors.signature?.message || errors.signature?.label.message}</p>
      <Form.Group className="form-group checkbox-box" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" id='checkbox-1'>
                  <Form.Check.Input
                    type="checkbox"
                    onChange={(e) => { onChange(e) }}
                    {...register('terms', { required: true })}
                  />
                  <Form.Check.Label>I agree with all <a href="#">Terms & Conditions</a></Form.Check.Label>
                </Form.Check>
               {errors.terms?.message && <Form.Text className="error-msg">{errors.terms?.message} </Form.Text>}
               </Form.Group>
      <Button variant="primary" type="submit" className='theme-btn large-btn' onClick={handleSubmit(onSubmit)}> Sign Up </Button>
    </Form>
    </>
  )
}

export default CounsellorKYCDetails
