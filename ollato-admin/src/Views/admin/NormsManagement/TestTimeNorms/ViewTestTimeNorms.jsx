import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGreade,
  getSpecificTestTimeNorms
} from '../../../../Actions/Admin/Norms/TestTimeNorms/TestTimeNorms'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllTestCategory } from '../../../../Actions/Admin/Test/Question'
function ViewTestTimeNorms () {
  // Constant
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // useState
  const [gradeData, setGradeData] = useState([])
  const [testData, setTestData] = useState([])

  // useSelector
  const mainData = useSelector((state) => state.testTimeNorms.resData)
  const gradeArray = useSelector((state) => state.testTimeNorms.gradeList)
  const testArray = useSelector((state) => state.question.testCategoryList)

  // useEffect to get Data
  useEffect(() => {
    dispatch(getSpecificTestTimeNorms(id, token))
    dispatch(getAllGreade(token))
    dispatch(getAllTestCategory(token))
  }, [])

  useEffect(() => {
    gradeArray &&
    setGradeData(
      gradeArray?.filter((data) => data?.id === mainData?.grade_id)
    )
    testArray &&
    setTestData(
      testArray?.filter((data) => data?.id === mainData?.test_detail_id)
    )
  }, [mainData, gradeArray, testArray])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='View Test Time Norms' title='Norms Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>View Test Time Norms</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/norms-management/test-time-norms')}
                >
                  Cancel
                </button>
              </div>
            </div>
            <div className='form-middle-layout'>
              <Form className='light-bg'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={gradeData[0]?.title}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Test</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={testData[0]?.title}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtimeinsec'
                    >
                      <Form.Label>Time in Sec</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={mainData?.time_Sec}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewTestTimeNorms
