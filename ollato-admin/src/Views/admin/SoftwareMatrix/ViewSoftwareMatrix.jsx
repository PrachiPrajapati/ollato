import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificsoftwareMetricsData } from '../../../Actions/Admin/softwareMetrix'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllSubCategory } from '../../../Actions/Admin/Test/Question'
import { profileDetail } from '../../../Actions/Admin/careerProfile'
function ViewSoftwareMatrix () {
  // Constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { id } = useParams()
  const navigate = useNavigate()

  // useState
  const [pDetail, setPdetail] = useState({})

  // useSelector
  const mainData = useSelector(state => state.softwareMetrics.resData)
  console.log('mainData', mainData)
  const careerProfile = useSelector(
    (state) => state.careerProfile.careerProfileData
  )

  // useEffect
  useEffect(() => {
    dispatch(getSpecificsoftwareMetricsData(Number(id), token))
    dispatch(getAllSubCategory(token))
    dispatch(profileDetail(token))
  }, [])

  useEffect(() => {
    if (mainData && careerProfile?.length) {
      setPdetail(careerProfile?.find((data) => data?.id === mainData?.career_profile_detail_id))
    }
  }, [mainData, careerProfile])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader name='View Software Matrix' title='Software Matrix' />
          <div className='main-layout'>
            <div className='heading-box'>
              <h5>View SoftwareMatrix</h5>
              <div className='btn-box'>
                <button className='theme-btn dark-btn text-none' onClick={() => navigate('/software-matrix')} >Cancel</button>
              </div>
            </div>
            <div className='form-middle-layout'>
              <Form className='light-bg'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation1'
                    >
                      <Form.Label>Test Abbrevation 1</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={mainData?.test_abb_1}
                      />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation2'
                    >
                      <Form.Label>Test Abbrevation 2</Form.Label>
                      <Form.Control
                        type='text'
                        disabled
                        value={mainData?.test_abb_2}
                        />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formtestabbrevation3'
                    >
                      <Form.Label>Test Abbrevation 3</Form.Label>
                      <Form.Control type='text' disabled value={mainData?.test_abb_3} />
                    </Form.Group>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group common-select-style'
                      controlId='formfullname'
                    >
                      {console.log('pDetail', pDetail?.profile_type)}
                      <Form.Label>Profile Details</Form.Label>
                      <Form.Control type='text' disabled value={pDetail?.profile_type} />
                    </Form.Group>
                  </div>
                  <div className='col-md-6 align-self-center'>
                    <div className='row align-items-center'>
                      <div className='col-xxl-6'>
                        <Form.Group
                          className='form-group switchbox mb-2 d-flex align-items-center'
                          controlId='formfullname'
                        >
                          <Form.Label className='mb-0'>Math Dropped</Form.Label>
                          <label className='switch'>
                            <input
                              type='checkbox'
                              name='mathDropped'
                              disabled
                              checked={mainData?.math_dropped}
                            />

                            <span className='slider blue' id='round'></span>
                          </label>
                        </Form.Group>
                      </div>
                      <div className='col-xxl-6'>
                        <Form.Group
                          className='form-group switchbox mb-2 d-flex align-items-center'
                          controlId='formfullname'
                        >
                          <Form.Label className='mb-0'>
                            Science Dropped
                          </Form.Label>
                          <label className='switch'>
                            <input
                              type='checkbox'
                              name='scienceDropped'
                              disabled
                              checked={mainData?.science_dropped}
                            />

                            <span className='slider blue' id='round'></span>
                          </label>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formsortorder'
                    >
                      <Form.Label>Sort Order</Form.Label>
                      <Form.Control type='text' disabled value={mainData?.sort_order} />
                    </Form.Group>
                  </div>
                  <div className='software-det-box'>
                    <h4 className='black-font mb-4'>Software Details</h4>
                    <div className='grade-profile d-flex align-items-start'>
                      <div className='row addmoreaddbox d-flex align-items-start'>
                        <div className=' col-md-12 '>
                          <div className='option-item w-100'>
                            <div className='optionitembox'>
                              <Form.Group
                                className='form-group text-input'
                                controlId='formoption'
                              >
                                <Form.Label>Norms Grade</Form.Label>
                                <Form.Control
                                  type='text'
                                  disabled
                                />
                              </Form.Group>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <div className='option-item w-100'>
                            <div className='optionitembox'>
                              <Form.Group
                                className='form-group common-select-style'
                                controlId='formfullname'
                              >
                                <Form.Label>Sub Test</Form.Label>
                                <Form.Control type='text' disabled />
                              </Form.Group>
                            </div>
                          </div>
                        </div>
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

export default ViewSoftwareMatrix
