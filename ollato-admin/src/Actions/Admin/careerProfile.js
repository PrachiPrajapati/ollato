import axios from 'axios'
import constants from '../../Shared/Types/constants'

// Get all Profile Detail for Front-end
export const profileDetail = (token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_GET_ALL_CAREER_PROFILE_LIST })
  axios.get(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/career-profile/get-all-frontend`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.GET_ALL_CAREER_PROFILE_LIST,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        careerProfileData: response?.data?.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_CAREER_PROFILE_LIST,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}
