import { combineReducers } from 'redux'

/* reducers-file */
import auth from './auth'
import grade from './Admin/grade'
import school from './Admin/school'
import board from './Admin/board'
import university from './Admin/university'
import city from './Admin/cities'
import qualification from './Admin/qualification'
import state from './Admin/state'
import test from './Admin/test'
import packages from './Admin/package'
import question from './Admin/Test/Question'
import norms from './Admin/Norms/norms'
import testTimeNorms from './Admin/Norms/TestTimeNorms/TestTimeNorms'
import gradeNorms from './Admin/Norms/GradeNorms/GradeNorms'
import testNormsDescription from './Admin/Norms/TestNormsDescription/TestNormsDescription'
import softwareMetrics from './Admin/softwareMetrix'
import careerProfile from './Admin/careerProfile'

export default combineReducers({
  auth,
  grade,
  school,
  board,
  university,
  city,
  qualification,
  state,
  test,
  packages,
  question,
  norms,
  testTimeNorms,
  gradeNorms,
  testNormsDescription,
  softwareMetrics,
  careerProfile
})
