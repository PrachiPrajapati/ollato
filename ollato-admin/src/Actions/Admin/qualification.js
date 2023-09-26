import axios from 'axios'
import constants from '../../Shared/Types/constants'

/* Add Qualification Functionality */
export const addQualificationAction = (qualificationData, token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_ADD_QUALIFICATION_DATA })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/qualification/create`, qualificationData, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.ADD_QUALIFICATION_DATA,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        isQualificationAdded: true
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.ADD_QUALIFICATION_DATA,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message,
        isQualificationAdded: false
      }
    })
  })
}

/* Get all Qualification Functionality */
export const getAllQualificationAction = (start, limit, sort, order, search, token) => (dispatch) => {
  const data = {
    start,
    limit,
    sort,
    order,
    search
  }
  dispatch({ type: constants.CLEAR_GET_ALL_QUALIFICATIONS_DATA })
  axios.post(`${process.env.REACT_APP_AXIOS_BASE_URL_DEV}/v1/admin/qualification/get-all-qualification`, data, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.GET_ALL_QUALIFICATIONS_DATA,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        qualificationData: response.data.data,
        count: response.data.total
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.GET_ALL_QUALIFICATIONS_DATA,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}
