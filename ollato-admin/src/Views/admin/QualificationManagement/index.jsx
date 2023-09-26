import React, { useState, useRef, useEffect } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
// import DeleteModal from '../../../Components/DeleteModal'

/* Action File */
import { getAllQualificationAction } from '../../../Actions/Admin/qualification'

/* import axios from 'axios' */
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'

function GradeManagement () {
  // Constanst
  const dispatch = useDispatch()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')

  // useState
  const [page, setPage] = useState(1)
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  const [limit] = useState(10)
  const [sort] = useState('title')
  const [sortField, setSortField] = useState('')
  const [start, setStart] = useState(0)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [id, setId] = useState('')
  const [qualificationArray, setQualificationArray] = useState([])

  // useSelector
  const gradeResMessage = useSelector(state => state.grade.resMessage)
  const isGradeDeleted = useSelector(state => state.grade.isDeleted)
  const qualificationListData = useSelector(state => state.qualification.qualificationData)
  const count = useSelector(state => state.qualification.count)

  // previousProps
  const previousProps = useRef({ qualificationListData, qualificationArray }).current

  // useEffect to get data
  useEffect(() => {
    dispatch(getAllQualificationAction(start, limit, sort, sortOrder, search, token))
  }, [])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className="button-box">
          <Link to={`/grade-management/view-grade/${cell?.id}`} >
            <button className='action-btns green-bg' type='button'> <img src={view} alt='' /> View</button>
          </Link>
          <Link to={`/grade-management/edit-grade/${cell?.id}`} >
            <button className='action-btns light-blue-bg' type='button'> <img src={edit} alt='' /> Edit</button>
          </Link>
          <button className='action-btns light-red-bg' onClick={() => handleShow(cell?.id)} type='button'> <img src={deletes} alt='' /> Delete</button>
        </div>
      </>
    )
  }

  // Function to delete Row in table
  const handleDelete = () => {
    if (id) {
      // dispatch(deleteGrade(data, token))
    }
  }

  const handleShow = (id) => {
    console.log('id*******', id)
    setId(id)
    setShow(true)
  }
  const handleClose = () => setShow(false)

  console.log('--', page)
  useEffect(() => {
    if (previousProps?.qualificationListData !== qualificationListData) {
      if (qualificationListData) {
        setQualificationArray(qualificationListData)
      }
    }
    return () => {
      previousProps.qualificationListData = qualificationListData
    }
  }, [qualificationListData])
  const columns = [
    {
      dataField: 'Sr.no',
      text: 'Sr. No',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'title',
      text: 'Title',
      sort: true
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]

  useEffect(() => {
    if (start) {
      dispatch(getAllQualificationAction(start, limit, sort, sortOrder, search, token))
    }
  }, [start])
  const onPageChange = (page, sizePerPage) => {
    setPage(page)
    setStart((limit * (page - 1)) - 1 < 0 ? 0 : (limit * (page - 1)))
    if (page === 1) {
      dispatch(getAllQualificationAction(0, limit, sort, sortOrder, search, token))
    }
  }
  const options = {
    sizePerPage: limit,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: false,
    alwaysShowAllBtns: true,
    totalSize: count,
    remote: { pagination: true },
    onPageChange
  }
  const products = qualificationArray
  const handleCallback = (childData) => {
    setSearch(childData)
  }
  useEffect(() => {
    if (search) {
      dispatch(getAllQualificationAction(0, limit, sort, sortOrder, search, token))
    } else if (search === null) {
      dispatch(getAllQualificationAction(0, limit, sort, sortOrder, '', token))
    } else {
      dispatch(getAllQualificationAction(0, limit, sort, sortOrder, '', token))
    }
  }, [search])
  console.log('search', search)
  useEffect(() => {
    if (search === '') {
      dispatch(getAllQualificationAction(start, limit, sort, sortOrder, search, token))
    }
  }, [])

  // Toastify Notification
  useEffect(() => {
    if (previousProps?.isGradeDeleted !== isGradeDeleted) {
      if (isGradeDeleted) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllQualificationAction(0, limit, sort, sortOrder, '', token))
      } else if (isGradeDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        }
        )
      }
    }
    return () => {
      previousProps.isGradeDeleted = isGradeDeleted
    }
  }, [isGradeDeleted])

  const selectRow = (row, isSelect, rowIndex) => {
    console.log('roww***************______', row.id)
    setRowArray(oldArray => [...oldArray, row.id])
  }
  console.log('rowArray', rowArray)
  const defaultSortedBy = [{
    dataField: 'name',
    order: 'asc' // or desc
  }]
  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      // setPage(1)
      setSortField(sortField)
      setSortOrder(sortOrder)
    }
  }
  useEffect(() => {
    if (sortOrder) {
      dispatch(getAllQualificationAction(start, limit, sort, sortOrder, search, token))
    }
  }, [sortOrder])
  console.log('--------sortField', sortField)
  console.log('--------sortOrder', sortOrder)
  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='Qualification List'
            parentCallback={handleCallback}
          />
          <TitleHeader name='Qualification List' title="Qualification" url='add-new-qualification' rowArray={rowArray} location={location} />
          <div className='main-layout'>
            <BootstrapTable
              keyField='id'
              data={products}
              columns={columns}
              remote={true}
              selectRow={{ mode: 'checkbox', clickToSelect: false, classes: 'custom-class', onSelect: selectRow }}
              // pagination={paginationFactory(pagination)}
              //  pagination={paginationFactory({ sizePerPage: 10 })} responsive="md"
              pagination={paginationFactory(options)} responsive="md"
              options={options}
              defaultSorted={defaultSortedBy}
              onTableChange={handleTablechange}
            />
            {/* <PaginationProvider
                    pagination={ paginationFactory(paginationOption) }
                  >
                    {
                      ({
                        paginationProps,
                        paginationTableProps
                      }) => (
                        <div>
                          <BootstrapTable
                            keyField="id"
                            data={ products }
                            columns={ columns }
                            selectRow={ { mode: 'checkbox', clickToSelect: false, classes: 'custom-class' }}
                            { ...paginationTableProps }
                          />
                        </div>
                      )
                    }
                  </PaginationProvider> */}
          </div>
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

export default GradeManagement
