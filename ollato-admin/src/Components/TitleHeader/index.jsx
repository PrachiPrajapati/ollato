/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import propTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
// import { propTypes } from 'react-bootstrap/esm/Image'
import { useDispatch } from 'react-redux'
import { deleteUniversity } from '../../Actions/Admin/university'

/* Action File */
import { deleteBoard } from '../../Actions/Admin/board'
import { deleteGrade } from '../../Actions/Admin/grade'
import { deleteSchool } from '../../Actions/Admin/school'
import { deleteCity } from '../../Actions/Admin/cities'
import { deleteState } from '../../Actions/Admin/states'
import { deletePackage } from '../../Actions/Admin/package'
import { deleteNorms } from '../../Actions/Admin/Norms/norms'
import { deleteTestCategoryAction, deleteTestSubCategoryAction } from '../../Actions/Admin/test'
import { deleteTestTimeNorms } from '../../Actions/Admin/Norms/TestTimeNorms/TestTimeNorms'
import { deleteGradeNorms } from '../../Actions/Admin/Norms/GradeNorms/GradeNorms'
import { deleteTestNormsDescription } from '../../Actions/Admin/Norms/TestNormsDescription/TestNormsDescription'
function TitleHeader (props) {
  const dispatch = useDispatch()
  const location = useLocation()
  const token = localStorage.getItem('token')

  /* modal */
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
  }
  const handleShow = () => {
    setShow(true)
  }
  const navigatePage = useNavigate()
  const handleDelete = () => {
    setShow(false)
    const universityData = {
      id: props.rowArray
    }
    const gradeData = {
      id: props.rowArray
    }
    const boardData = {
      id: props.rowArray
    }
    const cityData = {
      id: props.rowArray
    }
    const stateData = {
      id: props.rowArray
    }
    const testData = {
      id: props.rowArray
    }
    const packageData = {
      id: props.rowArray
    }
    const normsData = {
      id: props.rowArray
    }
    const normsDescriptionData = {
      id: props.rowArray
    }
    if (props?.rowArray) {
      if (props?.location?.pathname === '/grade-management') {
        dispatch(deleteGrade(gradeData, token))
      } else if (props?.location?.pathname === '/university-management') {
        dispatch(deleteUniversity(universityData, token))
      } else if (props?.location?.pathname === '/school-management') {
        dispatch(deleteSchool(gradeData, token))
      } else if (props?.location?.pathname === '/city-management') {
        dispatch(deleteCity(cityData, token))
      } else if (props?.location?.pathname === '/state-management') {
        dispatch(deleteState(stateData, token))
      } else if (props?.location?.pathname === '/test-management/main-category') {
        dispatch(deleteTestCategoryAction(testData, token))
      } else if (props?.location?.pathname === '/test-management/sub-category') {
        dispatch(deleteTestSubCategoryAction(testData, token))
      } else if (props?.location?.pathname === '/package-management') {
        dispatch(deletePackage(packageData, token))
      } else if (location?.pathname === '/norms-management') {
        dispatch(deleteNorms(normsData, token))
      } else if (location?.pathname === '/norms-management/test-time-norms') {
        dispatch(deleteTestTimeNorms(normsData, token))
      } else if (location?.pathname === '/norms-management/gradenorms') {
        dispatch(deleteGradeNorms(normsData, token))
      } else if (location?.pathname === '/norms-management/test-description-norms') {
        dispatch(deleteTestNormsDescription(normsDescriptionData, token))
      } else {
        dispatch(deleteBoard(boardData, token))
      }
    }
  }
  return (
    <>
      <div className="title-header">
        <ul className="breadcrumbs">
          <li className="breadcrumbs-item"><h3>{props.title}</h3></li>
          <li><a href="#">{props.name}</a></li>
        </ul>
        <div className="button-box">
          <button className='theme-btn red-btn' onClick={handleShow} type='button'>Delete Selected</button>
          <button className='theme-btn blue-btn' type='button' onClick={() => navigatePage(props.url)} >Add New {props.name}</button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="title-box has-subtitle">
            <h2>Delete </h2>
            <h4>Are you sure to delete this?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" onClick={handleDelete} className='theme-btn w-100 red-btn'>
            Delete
          </button>
          <button type="button" onClick={handleClose} className='theme-btn w-100 gray-btn'>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

TitleHeader.propTypes = {
  name: propTypes.string
}

export default TitleHeader
