import React from 'react'
/* import LogoBg from '../../../assets/images/icon-bglogo.png' */
import { ProgressBar } from 'react-bootstrap'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
import { useLocation } from 'react-router-dom'

// import EducationDetails from '../../../Components/Signup/EducationDetails'
import BackArrow from '../../../Components/BackArrow'
import UserDetails from '../../../Components/Signup/UserDetails'
function SignUp () {
  const location = useLocation()
  console.log('locatiohn', location)
  return (
    <>
      <div className="common-layout">
       <AuthLeftLogo />
        <div className="form-box-section">
        <ProgressBar now={50} />
         <div className="middle-form signup-page">
         <BackArrow location={location} />
          <div className="title-box">
              <h2>Sign Up</h2>
            </div>
              <UserDetails />
              {/* <EducationDetails /> */}
              {/* <Form>
              <Form.Group className="form-group checkbox-box" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" id='checkbox-1'>
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>I agree with all <a href="#">Terms & Conditions</a></Form.Check.Label>
                </Form.Check>
               </Form.Group>
              <Button variant="primary" type="submit" className='theme-btn large-btn'> Next </Button>
            </Form> */}
          </div>
          <div className="redirect-to-signin">
            <p>Already have an account? <a href="#">Login</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
