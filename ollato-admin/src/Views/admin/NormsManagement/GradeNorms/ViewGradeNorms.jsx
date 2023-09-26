import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllGreades,
  getSpecificGradeNorms
} from '../../../../Actions/Admin/Norms/GradeNorms/GradeNorms'
import { useNavigate, useParams } from 'react-router-dom'
import {
  getAllTestCategory,
  getAllSubCategory
} from '../../../../Actions/Admin/Test/Question'
import { getAllNormsFrontend } from '../../../../Actions/Admin/Norms/norms'
function ViewGradeNorms () {
  // Constant
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // useState
  const [gradeData, setGradeData] = useState([])
  const [testData, setTestData] = useState([])
  const [normsData, setNormsData] = useState([])
  const [subTestData, setsubTestData] = useState([])

  // useEffect to get Data
  useEffect(() => {
    dispatch(getSpecificGradeNorms(Number(id), token))
    dispatch(getAllGreades(token))
    dispatch(getAllTestCategory(token))
    dispatch(getAllSubCategory(token))
    dispatch(getAllNormsFrontend(token))
  }, [])

  // useSelector
  const mainData = useSelector((state) => state.gradeNorms.resData)
  const gradeArray = useSelector((state) => state.gradeNorms.gradeList)
  const testArray = useSelector((state) => state.question.testCategoryList)
  const normsArray = useSelector((state) => state.norms.normsFrontList)
  const subtestArray = useSelector((state) => state.question.testSubCategoryList)

  useEffect(() => {
    gradeArray &&
      setGradeData(
        gradeArray?.filter((data) => data?.id === mainData?.grade_id)
      )
    testArray &&
      setTestData(testArray?.filter((data) => data?.id === mainData?.test_id))
    subtestArray &&
      setsubTestData(
        subtestArray?.filter((data) => data?.id === mainData?.test_detail_id)
      )
    normsArray &&
      setNormsData(normsArray?.filter((data) => data?.id === mainData?.norm_id))
  }, [mainData, gradeArray, testArray, normsArray, subtestArray])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='View GradeNorms' title='Norms Management' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>View GradeNorms</h5>
              <div className='btn-box'>
                <button
                  className='theme-btn dark-btn text-none'
                  onClick={() => navigate('/norms-management/gradenorms')}
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
                      <Form.Label>Norms</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={normsData[0]?.title}
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
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>SubTest</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={subTestData[0]?.title}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formminmarks'>
                      <Form.Label>Min Marks</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={mainData?.min_marks}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group className='form-group' controlId='formmaxmarks'>
                      <Form.Label>Max Marks</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={mainData?.max_marks}
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

export default ViewGradeNorms
