import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificNormsData } from '../../../Actions/Admin/Norms/norms'
function ViewNorms () {
  // Constant
  const { id } = useParams()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const mainData = useSelector((state) => state.norms.resData)

  // useSelector
  useEffect(() => {
    dispatch(getSpecificNormsData(Number(id), token))
  }, [])
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='View Norms' title='Norms Management'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>View Norms</h5>
                      <div className="btn-box">
                        <button className='theme-btn dark-btn text-none' onClick={() => navigate('/norms-management')} >Cancel</button>
                      </div>
                  </div>
                    <div className="form-middle-layout">
                      <Form className='light-bg'>
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formnormscode">
                                <Form.Label>Norms Code</Form.Label>
                                <Form.Control disabled type="text" value={mainData?.code} />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formnormsdescription">
                                <Form.Label>Norms Description</Form.Label>
                                <Form.Control disabled type="text" value={mainData?.title} />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formsortorder">
                                <Form.Label>Sort Order </Form.Label>
                                <Form.Control disabled type="text" value={mainData?.sort_order} />
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

export default ViewNorms
