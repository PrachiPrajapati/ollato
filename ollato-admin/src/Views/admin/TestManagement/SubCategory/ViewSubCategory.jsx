import React, { useEffect, useRef, useState } from 'react'

/* React Packages */
import { Form } from 'react-bootstrap'
// import Select from 'react-select'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

/* Components */
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'

/* Action File */
import { viewTestSubCategoryAction, getAllMainCategoriesDataAction } from '../../../../Actions/Admin/test'

function ViewSubCategory () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const id = params?.id
  const token = localStorage.getItem('token')
  const [array, setArray] = useState([])
  const testDataArray = useSelector(state => state.test.testSubCategoryDataById)
  const categoriesData = useSelector(state => state.test.mainCategoryData)
  const previousProps = useRef({ testDataArray, categoriesData }).current
  const { reset } = useForm()
  useEffect(() => {
    if (token) {
      dispatch(getAllMainCategoriesDataAction(token))
    }
  }, [token])
  useEffect(() => {
    if (id) {
      const testData = {
        id: Number(id)
      }
      dispatch(viewTestSubCategoryAction(testData, token))
    }
  }, [id])

  useEffect(() => {
    if (previousProps?.categoriesData !== categoriesData) {
      const array = []
      if (categoriesData) {
        // eslint-disable-next-line array-callback-return
        categoriesData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setArray(array)
      }
    }
    return () => {
      previousProps.categoriesData = categoriesData
    }
  }, [categoriesData])
  useEffect(() => {
    if (array?.length) {
      const arrayV = array.filter(c => c.value === testDataArray?.test_id)
      reset({
        array: arrayV
      })
    }
  }, [array])

  /* Cancel button */
  const handleclick = () => {
    navigate('/test-management/sub-category')
  }
  /* for MainCategory */
  // const maincategory = [{ value: 'Interest', label: 'Interest' }, { value: 'Aptitutde', label: 'Aptitutde' }]
  // const [selectedMainCategory, setSelectedMainCategory] = useState([{ value: 'Interest', label: 'Interest' }])
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='View Sub Category' title='Test Management'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>View Sub Category</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none' onClick={handleclick}>Cancel</button>
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
                                  placeholder="Enter Sub Category"
                                  Value={array[0]?.label}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>Sub Category</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category"
                                  Value={testDataArray?.title}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>Sort Order</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category"
                                  Value={testDataArray?.sort_order}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>No of questions</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category"
                                  Value={testDataArray?.no_of_questions}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-12">
                              <Form.Group className="form-group" controlId="formmaincategory">
                                <Form.Label>Sub Category Description</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Sub Category"
                                  Value={testDataArray?.description}
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

export default ViewSubCategory
