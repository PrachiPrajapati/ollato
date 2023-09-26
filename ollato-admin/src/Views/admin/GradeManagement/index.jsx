import React, { useState, useRef, useEffect } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import Select from 'react-select'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
// import DeleteModal from '../../../Components/DeleteModal'

/* Action File */
import {
  getAllGradeListAction,
  deleteGrade,
  editSpecificGrade
} from '../../../Actions/Admin/grade'

/* import axios from 'axios' */
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'

function GradeManagement () {
  // Constant
  const dispatch = useDispatch()
  const location = useLocation()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [, setPage] = useState(1)
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  const [limit, setLimit] = useState(10)
  const [sort] = useState('title')
  const [, setSortField] = useState('')
  const [start, setStart] = useState(0)
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [id, setId] = useState('')
  const [gradeArray, setGradeArray] = useState([])

  // useSelector
  const gradeResMessage = useSelector((state) => state.grade.resMessage)
  const isGradeDeleted = useSelector((state) => state.grade.isDeleted)
  const isGradeUpdated = useSelector((state) => state.grade.isGradeEdited)
  const gradeListData = useSelector((state) => state.grade.gradeList)
  const count = useSelector((state) => state.grade.gradeCount)

  // previousProps
  const previousProps = useRef({
    gradeListData,
    gradeResMessage,
    isGradeDeleted,
    isGradeUpdated
  }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(
      getAllGradeListAction(start, limit, sort, sortOrder, search, token)
    )
  }, [])

  useEffect(() => {
    if (previousProps?.gradeListData !== gradeListData) {
      if (gradeListData) {
        setGradeArray(gradeListData)
      }
    }
    return () => {
      previousProps.gradeListData = gradeListData
    }
  }, [gradeListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          <Link to={`/grade-management/view-grade/${cell?.id}`}>
            <button className='action-btns green-bg' type='button'>
              <img src={view} alt='' /> View
            </button>
          </Link>
          <Link to={`/grade-management/edit-grade/${cell?.id}`}>
            <button className='action-btns light-blue-bg' type='button'>
              <img src={edit} alt='' /> Edit
            </button>
          </Link>
          <button
            className='action-btns light-red-bg'
            onClick={() => handleShow(cell?.id)}
            type='button'
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
    const data = {
      id
    }
    if (id) {
      dispatch(deleteGrade(data, token))
    }
  }
  // Multiple row delete
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
    dispatch(editSpecificGrade(data, token))
    setGradeArray(
      gradeArray.map((item) => {
        if (item.id === id) {
          item.is_active = e.target.checked ? 'y' : 'n'
          return item
        } else return item
      })
    )
  }

  const handleCallback = (childData) => {
    if (childData) {
      dispatch(getAllGradeListAction(0, limit, sort, sortOrder, search, token))
    } else if (search === null) {
      dispatch(getAllGradeListAction(0, limit, sort, sortOrder, '', token))
    } else {
      dispatch(getAllGradeListAction(0, limit, sort, sortOrder, '', token))
    }
    setSearch(childData)
  }

  const products = gradeArray
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
      text: 'Grade Name',
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
  const onPageChange = (page) => {
    setPage(page)
    setStart(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1))
    if (page === 1) {
      dispatch(getAllGradeListAction(0, limit, sort, sortOrder, search, token))
    } else {
      dispatch(
        getAllGradeListAction(
          limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1),
          limit,
          sort,
          sortOrder,
          search,
          token
        )
      )
    }
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    dispatch(getAllGradeListAction(start, e.value, sort, sortOrder, search, token))
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
      order: 'asc'
    }
  ]
  const handleTablechange = (type, { page, sortField, sortOrder }) => {
    if (type === 'sort') {
      setSortField(sortField)
      setSortOrder(sortOrder)
      if (sortOrder) {
        dispatch(
          getAllGradeListAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isGradeDeleted !== isGradeDeleted) {
      if (isGradeDeleted) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllGradeListAction(0, limit, sort, sortOrder, '', token))
      } else if (isGradeDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isGradeDeleted = isGradeDeleted
    }
  }, [isGradeDeleted])

  // Notification for status
  useEffect(() => {
    if (previousProps?.isGradeUpdated !== isGradeUpdated) {
      if (isGradeUpdated) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllGradeListAction(0, limit, sort, sortOrder, '', token))
      } else if (isGradeUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${gradeResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isGradeUpdated = isGradeUpdated
    }
  }, [isGradeUpdated])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='Grade List' parentCallback={handleCallback} />
          <TitleHeader
            name='Grade'
            title='Grade Management'
            url='add-new-grade'
            rowArray={rowArray}
            location={location}
          />
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
                data={products}
                columns={columns}
                remote={true}
                selectRow={{
                  mode: 'checkbox',
                  clickToSelect: false,
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
            onClick={() => handleDelete(id)}
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

export default GradeManagement
