import constants from '../../Shared/Types/constants'

/* initial state */
const initialCareerProfileState = {
  resStatus: null,
  resMessage: null,
  isCityAdded: null,
  cityList: null,
  cityCount: null,
  isCityEdited: false,
  isDeleted: null,
  resData: {}
}

export default (state = initialCareerProfileState, action) => {
  switch (action.type) {
    case constants.GET_ALL_CAREER_PROFILE_LIST:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        careerProfileData: action.payload.careerProfileData
      }
    case constants.CLEAR_GET_ALL_CAREER_PROFILE_LIST:
      return {
        ...state,
        resStatus: null,
        resMessage: null
      }
    default:
      return state
  }
}
