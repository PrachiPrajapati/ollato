import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { getSpecificTestNormsDescription } from '../../../../Actions/Admin/Norms/TestNormsDescription/TestNormsDescription'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNormsList } from '../../../../Actions/Admin/Norms/norms'
import { getAllMainCategoriesDataAction } from '../../../../Actions/Admin/test'
import { getAllSubCategory } from '../../../../Actions/Admin/Test/Question'
function ViewTestDescriptionNorms () {
  // Constant
  const navigate = useNavigate()
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  const [norms, setNorms] = useState([])
  const [test, setTest] = useState([])
  const [subTest, setSubTest] = useState([])

  // useSelector
  const mainData = useSelector(state => state.testNormsDescription.resData)
  const normsArray = useSelector((state) => state.norms.normsList)
  const testArray = useSelector(state => state.test.mainCategoryData)
  const subTestArray = useSelector(state => state.question.testSubCategoryList)

  // useEffect to get data by id
  useEffect(() => {
    dispatch(getSpecificTestNormsDescription(Number(id), token))
    dispatch(getAllNormsList(token))
    dispatch(getAllMainCategoriesDataAction(token))
    dispatch(getAllSubCategory(token))
  }, [])

  useEffect(() => {
    normsArray && setNorms(normsArray?.filter((data) => data?.id === mainData?.norm_id))
  }, [mainData, normsArray])
  useEffect(() => {
    testArray && setTest(testArray?.filter((data) => data?.id === mainData?.test_id))
  }, [mainData, testArray])
  useEffect(() => {
    subTestArray && setSubTest(subTestArray?.filter((data) => data?.id === mainData?.test_detail_id))
  }, [mainData, subTestArray])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader
            name='View Test Description Norms'
            title='Norms Management'
          />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>View Test Description Norms</h5>
              <div className='btn-box'>
                <button className='theme-btn dark-btn text-none' onClick={() => navigate('/norms-management/test-description-norms')} >Cancel</button>
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
                      <Form.Label>Norms</Form.Label>
                      <Form.Control value={norms[0]?.title} disabled />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>Test</Form.Label>
                      <Form.Control value={test[0]?.title} disabled />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      <Form.Label>SubTest</Form.Label>
                      <Form.Control value={subTest[0]?.title} disabled />
                    </Form.Group>
                  </div>
                  <div className='col-md-12'>
                    <div className='row'>
                      <div className='col-md-6'>
                        <Form.Group
                          className='form-group'
                          controlId='formdescription'
                        >
                          <Form.Label>Test Description</Form.Label>
                          <Form.Control
                            as='textarea'
                            className='big-textarea'
                            disabled
                            value={mainData?.description}
                          />
                        </Form.Group>
                      </div>
                      <div className='col-md-6'>
                        <Form.Group
                          className='form-group'
                          controlId='formplanofaction'
                        >
                          <Form.Label>Plan of action</Form.Label>
                          <Form.Control
                            as='textarea'
                            className='big-textarea'
                            disabled
                            value={mainData?.plan_of_action}
                          />
                        </Form.Group>
                      </div>
                    </div>
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

export default ViewTestDescriptionNorms
