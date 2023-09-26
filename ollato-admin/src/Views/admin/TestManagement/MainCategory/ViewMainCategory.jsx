import React, { useEffect } from 'react'

/* React Packages */
import { Form } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

/* Components */
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'

/* Action File */
import { viewTestCategoryAction } from '../../../../Actions/Admin/test'

function ViewMainCategory () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const id = params?.id
  const token = localStorage.getItem('token')
  const testDataArray = useSelector(state => state.test.testCategoryDataById)
  useEffect(() => {
    if (id) {
      const testData = {
        id: Number(id)
      }
      dispatch(viewTestCategoryAction(testData, token))
    }
  }, [id])

  /* Cancel button */
  const handleclick = () => {
    navigate('/test-management/main-category')
  }
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='View Main Category' title='Test Management'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>View Main Category</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none' onClick={handleclick} >Cancel</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                      <Form className='light-bg'>
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>Main Category</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Main Category"
                                  Value={testDataArray?.title}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formpincode1">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter Sort Order"
                                  Value={testDataArray?.sort_order}
                                  disabled
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

export default ViewMainCategory
