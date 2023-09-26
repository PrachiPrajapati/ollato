import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import { getSpecificGradeData } from '../../../Actions/Admin/grade'

function EditGrade () {
  // Constant
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const id = params.id
  const token = localStorage.getItem('token')
  const handleclick = () => {
    navigate('/grade-management')
  }

  // useEffect to get data by id
  useEffect(() => {
    if (id) {
      dispatch(getSpecificGradeData(Number(id), token))
    }
  }, [id])

  // useSelector
  const specificGradeData = useSelector(
    (state) => state.grade.specificGradeData
  )

  return (
    <>
      <div className='common-layout common-dashboard-wrapper add-new-form'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='View Grade' />
          <TitleHeader name='View Grade' title='Grade Management' />
          <div className='main-layout'>
            <Form className='light-bg'>
              <div className='heading-box'>
                <h5>View Grade</h5>
                <div className='btn-box'>
                  <button
                    type='button'
                    className='theme-btn dark-btn text-none'
                    onClick={handleclick}
                  >
                    Cancel
                  </button>
                  {/* <button type="submit" className='theme-btn text-none'>Save</button> */}
                </div>
              </div>
              <div className='form-middle-layout'>
                <div className='row'>
                  <div className='col-md-6'>
                    <Form.Group
                      className='form-group'
                      controlId='formgradenumber'
                    >
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        type='text'
                        Value={
                          (specificGradeData && specificGradeData?.title) || ''
                        }
                        disabled
                      />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditGrade
