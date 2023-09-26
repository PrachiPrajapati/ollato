
import axios from 'axios'
import constants from '../Shared/Types/constants'

/* login action method */
export const login = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_LOGIN })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/login-with-password`, userData).then((response) => {
    localStorage.setItem('token', response.data.Authorization)
    dispatch({
      type: constants.LOGIN,
      payload: {
        resStatus: true,
        userData: response.data.data,
        resMessage: response.data.message,
        token: response.data.Authorization,
        isAuthenticated: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.LOGIN,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isAuthenticated: false
      }
    })
  })
}

/* login with otp */
export const sendOTP = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_SEND_OTP })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/login-with-otp`, userData).then((response) => {
    dispatch({
      type: constants.SEND_OTP,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isOTPSend: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.SEND_OTP,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isOTPSend: false
      }
    })
  })
}

export const verifyOtp = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_VERIFY_OTP })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/login-with-verify-otp`, userData).then((response) => {
    localStorage.setItem('token', response.data.Authorization)
    dispatch({
      type: constants.VERIFY_OTP,
      payload: {
        resStatus: true,
        data: response.data.data,
        resMessage: response.data.message,
        token: response.data.Authorization,
        isAuthenticated: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.VERIFY_OTP,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isAuthenticated: false
      }
    })
  })
}

/* forgot password verify email */
export const forgotPasswordVerifyEmail = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_FORGET_PASSWORD_VERIFY_EMAIL })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/student/forgot-password`, userData).then((response) => {
    dispatch({
      type: constants.FORGET_PASSWORD_VERIFY_EMAIL,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isForgotOTPSend: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.FORGET_PASSWORD_VERIFY_EMAIL,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isForgotOTPSend: false
      }
    })
  })
}

export const getDummyData = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_DUMMY })
  axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
    dispatch({
      type: constants.DUMMY,
      payload: {
        resStatus: true,
        data: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.DUMMY,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
   Module - Forgot Password
*/
// verify email -Forgot Password
export const emailVerifiedAction = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_EMAIL_VERIFY_FORGOT_PASSWORD })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/forgot-password`, userData).then((response) => {
    // localStorage.setItem('authToken', response.data.Authorization)
    dispatch({
      type: constants.EMAIL_VERIFY_FORGOT_PASSWORD,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        authToken: response.data.Authorization,
        isEmailVerified: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.EMAIL_VERIFY_FORGOT_PASSWORD,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isEmailVerified: false
      }
    })
  })
}

// verify otp -Forgot Password
export const otpVerifiedAction = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_OTP_VERIFICATION_FORGOT_PASSWORD })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/otp-verification`, userData).then((response) => {
    dispatch({
      type: constants.OTP_VERIFICATION_FORGOT_PASSWORD,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isOtpVerified: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.OTP_VERIFICATION_FORGOT_PASSWORD,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isOtpVerified: false
      }
    })
  })
}

/*
   Module - Reset Password
*/
export const resetPassword = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_RESET_PASSWORD })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/reset-password`, userData).then((response) => {
    dispatch({
      type: constants.RESET_PASSWORD,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isReset: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.RESET_PASSWORD,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isReset: false
      }
    })
  })
}

/*
  Register Email verification
*/
export const emailVerification = (studentData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_SEND_OTP_SIGNUP })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/email-otp-send`, studentData).then((response) => {
    dispatch({
      type: constants.SEND_OTP_SIGNUP,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isEmailAddressVerified: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.SEND_OTP_SIGNUP,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isEmailAddressVerified: false
      }
    })
  })
}

/*
  Register OTP verification
*/
export const otpVerification = (studentData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_VERIFY_OTP_SIGNUP })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/email-otp-verify`, studentData).then((response) => {
    dispatch({
      type: constants.VERIFY_OTP_SIGNUP,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isOTPSignupVerified: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.VERIFY_OTP_SIGNUP,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isOTPSignupVerified: false
      }
    })
  })
}

/*
  Get All States Data
*/
export const getAllStatesAction = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_STATES })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/student/get_all_state`).then((response) => {
    dispatch({
      type: constants.GET_ALL_STATES,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        statesData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_STATES,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Get All Countries Data
*/
export const getAllCountriesAction = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_COUNTRIES })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/student/get_all_country`).then((response) => {
    dispatch({
      type: constants.GET_ALL_COUNTRIES,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        countriesData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_COUNTRIES,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Get All District Data
*/
export const getAllDistrictAction = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_DISTRICTS })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/student/get_all_cities`).then((response) => {
    dispatch({
      type: constants.GET_ALL_DISTRICTS,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        districtData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_DISTRICTS,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Get All Boards Data
*/
export const getAllBoardsAction = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_BOARDS })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/board/get-all-board`).then((response) => {
    dispatch({
      type: constants.GET_ALL_BOARDS,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        boardsData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_BOARDS,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Get All Qualification Data
*/
export const GetQualificationAction = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_QUALIFICATIONS })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/get_qualification`).then((response) => {
    dispatch({
      type: constants.GET_ALL_QUALIFICATIONS,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        qData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_QUALIFICATIONS,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Get All Universities Data
*/
export const GetAllUniversityData = () => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_UNIVERSITIES })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/get_all_university`).then((response) => {
    dispatch({
      type: constants.GET_ALL_UNIVERSITIES,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        universityData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_UNIVERSITIES,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}

/*
  Post Signup
*/
export const registerC = (formData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_SIGNUP })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/register`, formData).then((response) => {
    dispatch({
      type: constants.SIGNUP,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        registerData: response.data.data,
        isRegistered: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.SIGNUP,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isRegistered: false
      }
    })
  })
}

/*
  Post Signup
*/
export const adminLogin = (formData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADMIN_LOGIN })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/login-with-password`, formData).then((response) => {
    localStorage.setItem('token', response.data.Authorization)
    dispatch({
      type: constants.ADMIN_LOGIN,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        adminData: response.data.data,
        isLogin: true
      }
    })
    localStorage.setItem('token', response.data.Authorization)
  }).catch((error) => {
    dispatch({
      type: constants.ADMIN_LOGIN,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isLogin: false
      }
    })
  })
}

/*
    Admin Forgot Password
*/
export const forgotPasswordEmailAction = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADMIN_FORGOT_PASSWORD })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/forgot-password`, userData).then((response) => {
    // localStorage.setItem('authToken', response.data.Authorization)
    dispatch({
      type: constants.ADMIN_FORGOT_PASSWORD,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        adminToken: response.data.Authorization,
        isAdminEmailVerified: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.ADMIN_FORGOT_PASSWORD,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isAdminEmailVerified: false
      }
    })
  })
}

/*
  Register Email verification
*/
export const mobileVerification = (studentData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_MOBILE_VERIFICATION })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/email-otp-send`, studentData).then((response) => {
    dispatch({
      type: constants.MOBILE_VERIFICATION,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isMobileOTPVerification: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.MOBILE_VERIFICATION,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isMobileOTPVerification: false
      }
    })
  })
}

/*
  Register OTP verification
*/
export const mobileOTPVerification = (studentData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_MOBILE_VERIFICATION_OTP_SEND })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/counsellor/email-otp-verify`, studentData).then((response) => {
    dispatch({
      type: constants.MOBILE_VERIFICATION_OTP_SEND,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isMobileOTPSend: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.MOBILE_VERIFICATION_OTP_SEND,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isMobileOTPSend: false
      }
    })
  })
}

/*
   Module - Admin Reset Password
*/
export const adminResetPassword = (userData) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADMIN_RESET_PASSWORD })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/reset-password/`, userData).then((response) => {
    dispatch({
      type: constants.ADMIN_RESET_PASSWORD,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isAdminReset: true
      }
    })
    // localStorage.setItem('token',  )
  }).catch((error) => {
    dispatch({
      type: constants.ADMIN_RESET_PASSWORD,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isAdminReset: false
      }
    })
  })
}

/*
  Logout
*/
export const logoutAction = (token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADMIN_LOGOUT })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/logout`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.ADMIN_LOGOUT,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isLoggedOut: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.ADMIN_LOGOUT,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isLoggedOut: false
      }
    })
  })
}
