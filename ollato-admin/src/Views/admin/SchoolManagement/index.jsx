import React, { useState, useEffect, useRef } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import Select from 'react-select'

/* Icons */
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import orderdefault from '../../../assets/images/order-default.svg'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'

/* Action File */
import {
  getAllSchoolAction,
  deleteSchool,
  editSpecificSchool
} from '../../../Actions/Admin/school'

function SchoolManagement () {
  // Constant
  const location = useLocation()
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [id, setId] = useState('')
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort] = useState('title')
  const [search, setSearch] = useState('')
  const [, setSortField] = useState('')
  const [order] = useState('asc')
  const [sortOrder, setSortOrder] = useState('asc')
  const [, setPage] = useState(1)
  const [show, setShow] = useState(false)
  const [schoolArray, setSchoolArray] = useState([])
  const [rowArray, setRowArray] = useState([])

  // useSelector
  const schoolResMessage = useSelector((state) => state.school.resMessage)
  const isSchoolDeleted = useSelector((state) => state.school.isSchoolDeleted)
  const isSchoolUpdated = useSelector((state) => state.school.isSchoolEdited)
  const schoolListData = useSelector((state) => state.school.schoolDataArray)
  const count = useSelector((state) => state.school.schoolCount)

  // previousProps
  const previousProps = useRef({ schoolListData, isSchoolUpdated, isSchoolDeleted }).current

  // useEffect for listing Data
  useEffect(() => {
    if (token) {
      dispatch(getAllSchoolAction(start, limit, sort, sortOrder, search, token))
    }
  }, [])
  useEffect(() => {
    if (previousProps?.schoolListData !== schoolListData) {
      if (schoolListData) {
        setSchoolArray(schoolListData)
      }
    }
    return () => {
      previousProps.schoolListData = schoolListData
    }
  }, [schoolListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          <Link to={`/school-management/view-school/${cell?.id}`}>
            <button className='action-btns green-bg' type='button'>
              <img src={view} alt='' /> View
            </button>
          </Link>
          <Link to={`/school-management/edit-school/${cell?.id}`}>
            <button className='action-btns light-blue-bg' type='button'>
              <img src={edit} alt='' /> Edit
            </button>
          </Link>
          <button
            className='action-btns light-red-bg'
            type='button'
            onClick={() => handleShow(cell?.id)}
          >
            <img src={deletes} alt='' /> Delete
          </button>
        </div>
      </>
    )
  }

  // Function to delete Row in table
  const handleShow = (id) => {
    setId(id)
    setShow(true)
  }
  const handleClose = () => setShow(false)
  const handleDelete = () => {
    if (id) {
      dispatch(deleteSchool(id, token))
    }
  }
  // Delete Row
  const selectRow = (row, isSelect, rowIndex) => {
    setRowArray((oldArray) => [...oldArray, row.id])
  }

  // Table Switch : Status on/off
  const switchAction = (row, cell, rowIndex) => {
    return (
      <label className='switch'>
        <input
          type='checkbox'
          checked={row === 'y'}
          onChange={(e) => handleChange(e, cell.id)}
        />
        <span className='slider blue' id='round'></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id) => {
    const data = {
      id,
      isActive: e.target.checked ? 'y' : 'n',
      updateType: 'status'
    }
    dispatch(editSpecificSchool(data, token))
    setSchoolArray(
      schoolArray.map((item) => {
        if (item.id === id) {
          item.is_active = e.target.checked ? 'y' : 'n'
          return item
        } else return item
      })
    )
  }

  // Search
  const handleCallback = (childData) => {
    if (childData) {
      dispatch(getAllSchoolAction(0, limit, sort, sortOrder, search, token))
    } else if (search === null) {
      dispatch(getAllSchoolAction(0, limit, sort, sortOrder, '', token))
    } else {
      dispatch(getAllSchoolAction(0, limit, sort, sortOrder, '', token))
    }
    setSearch(childData)
  }

  const products = schoolArray
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
      text: 'School Name',
      sort: true,
      sortCaret: (order, column) => {
        if (!order) {
          return (
            <span className='sort-box'>
              <img src={orderdefault} alt='order-up' />
            </span>
          )
        } else if (order === 'asc') {
          return (
            <span className='sort-box'>
              <img src={orderup} alt='order-up' />
            </span>
          )
        } else if (order === 'desc') {
          return (
            <span className='sort-box'>
              <img src={orderdown} alt='order-down' />
            </span>
          )
        }
        return null
      }
    },
    {
      dataField: 'is_active',
      text: 'Status',
      formatter: switchAction
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]

  // Pagination
  const onPageChange = (page, sizePerPage) => {
    setPage(page)
    setStart(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1))
    if (page === 1) {
      dispatch(getAllSchoolAction(0, limit, sort, sortOrder, search, token))
    } else {
      dispatch((
        getAllSchoolAction(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1), limit, sort, sortOrder, search, token)
      ))
    }
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    dispatch(getAllSchoolAction(start, e.value, sort, order, search, token))
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

  // Sorting
  const defaultSortedBy = [
    {
      dataField: 'name',
      order: 'asc' // or desc
    }
  ]
  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      setSortField(sortField)
      setSortOrder(sortOrder)
      if (sortOrder) {
        dispatch(
          getAllSchoolAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  useEffect(() => {
    if (previousProps?.isGradeDeleted !== isSchoolDeleted) {
      if (isSchoolDeleted) {
        setShow(false)
        enqueueSnackbar(`${schoolResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllSchoolAction(0, limit, sort, sortOrder, '', token))
      } else if (isSchoolDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${schoolResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isSchoolDeleted = isSchoolDeleted
    }
  }, [isSchoolDeleted])

  // Notification for status
  useEffect(() => {
    if (previousProps?.isSchoolUpdated !== isSchoolUpdated) {
      if (isSchoolUpdated) {
        setShow(false)
        enqueueSnackbar(`${schoolResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllSchoolAction(start, limit, sort, sortOrder, search, token))
      } else if (isSchoolUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${schoolResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isSchoolUpdated = isSchoolUpdated
    }
  }, [isSchoolUpdated])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header parentCallback={handleCallback} />
          <TitleHeader
            name='School List'
            title='School'
            url='add-new-school'
            rowArray={rowArray}
            location={location}
          />
          <div className='main-layout'>
            <div className='row'>
              <div className='col-md-12 text-end filterboxcontent'>
                <div className='categoryfilterbtn text-center sizeperpagebtn'>
                  <Select
                    classNamePrefix='filter-custom'
                    className='filter-time-btn withrightimg'
                    isSearchable={false}
                    options={pagePerLimitArray}
                    defaultValue={{ value: 10, label: 10 }}
                    onChange={(e) => handlePagePerLimit(e)}
                  />
                </div>
              </div>
              <div className='col-md-12'>
                <BootstrapTable
                  keyField='id'
                  remote={true}
                  data={products}
                  columns={columns}
                  selectRow={{
                    mode: 'checkbox',
                    clickToSelect: true,
                    classes: 'custom-class',
                    onSelect: selectRow
                  }}
                  pagination={paginationFactory(options)}
                  responsive='md'
                  options={options}
                  defaultSorted={defaultSortedBy}
                  onTableChange={handleTablechange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className='title-box has-subtitle'>
            <h2>Delete </h2>
            <h4>Are you sure to delete this?</h4>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type='button'
            onClick={handleDelete}
            className='theme-btn w-100 red-btn'
          >
            Delete
          </button>
          <button
            type='button'
            onClick={handleClose}
            className='theme-btn w-100 gray-btn'
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SchoolManagement
