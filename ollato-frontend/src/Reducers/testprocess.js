import constants from '../Shared/Types/constants'

/* initial state */
const initialAuthState = {
  resStatus: null,
  resMessage: null,
  testProcessTest: null
}

export default (state = initialAuthState, action) => {
  switch (action.type) {
    case constants.GET_ALL_TEST_PROCESS_DATA:
      return {
        ...state,
        resStatus: action.payload.resStatus,
        resMessage: action.payload.resMessage,
        testProcessTest: action.payload.testProcessTest
      }
    case constants.CLEAR_GET_ALL_TEST_PROCESS_DATA:
      return {
        ...state,
        resStatus: null,
        resMessage: null,
        testProcessTest: null
      }
    default:
      return state
  }
}
