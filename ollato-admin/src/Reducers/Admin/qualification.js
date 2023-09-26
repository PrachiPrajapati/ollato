import constants from '../../Shared/Types/constants'

/* initial state */
const initialAuthState = {
  resStatus: null,
  resMessage: null,
  isQualificationAdded: null,
  qualificationData: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case constants.ADD_QUALIFICATION_DATA:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        isQualificationAdded: action.payload.isQualificationAdded
      }
    case constants.CLEAR_ADD_QUALIFICATION_DATA:
      return {
        ...state,
        resStatus: null,
        resMessage: null,
        isQualificationAdded: null
      }
    case constants.GET_ALL_QUALIFICATIONS_DATA:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        qualificationData: action.payload.qualificationData,
        count: action.payload.count
      }
    case constants.CLEAR_GET_ALL_QUALIFICATIONS_DATA:
      return {
        ...state,
        resStatus: null,
        resMessage: null,
        qualificationData: null,
        count: null
      }
    default:
      return state
  }
}
