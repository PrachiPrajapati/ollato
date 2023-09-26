import React, { useState } from 'react'
/* import LogoBg from '../../../assets/images/icon-bglogo.png' */
import { ProgressBar } from 'react-bootstrap'
import AuthLeftLogo from '../../../Components/AuthLeftLogo'
// import CounsellorEducationDetails from '../../../Components/Signup/CounsellorEducationDetails'
// import CounsellorKYCDetails from '../../../Components/Signup/CounsellorKYCDetails'
import BackArrow from '../../../Components/BackArrow'
import CounsellorDetails from './educationDetails'
function SignUp () {
  const [now, setNow] = useState(33.3)
  console.log('location inside signup index', location)
  return (
    <>
      <div className="common-layout">
       <AuthLeftLogo />
        <div className="form-box-section">
        <ProgressBar now={now} />
         <div className="middle-form signup-page">
         <BackArrow location={location} />
          <div className="title-box">
              <h2>Sign Up</h2>
            </div>
              <CounsellorDetails setNow={ setNow }/>
              {/* <CounsellorEducationDetails /> */}
         {/* <CounsellorKYCDetails /> */}
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
