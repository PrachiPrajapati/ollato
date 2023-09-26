import React, { useState, useRef, useEffect } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import view from '../../../assets/images/view-eye.svg'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
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
  getAllUniversityListAction,
  deleteUniversity,
  updateUniversity
} from '../../../Actions/Admin/university'

function UniversityManagement () {
  // Constanst
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
  const [start, setStart] = useState(0)
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState('')
  const [id, setId] = useState('')
  const [universityArray, setUniversityArray] = useState([])
  const [sort] = useState('title')
  const [, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')

  // useSelector
  const universityResMessage = useSelector(state => state.university.resMessage)
  const isUniversityDeleted = useSelector(state => state.university.isDeleted)
  const isUniversityUpdated = useSelector(state => state.university.isUniversityEdited)
  const universityListData = useSelector(state => state.university.universityList)
  const count = useSelector(state => state.university.universityCount)

  // PreviousProps
  const previousProps = useRef({
    universityListData,
    universityResMessage,
    isUniversityDeleted,
    isUniversityUpdated
  }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(
      getAllUniversityListAction(start, limit, sort, sortOrder, search, token)
    )
  }, [])

  useEffect(() => {
    if (previousProps?.universityListData !== universityListData) {
      if (universityListData) {
        setUniversityArray(universityListData)
      }
    }
    return () => {
      previousProps.universityListData = universityListData
    }
  }, [universityListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          <Link to={`/university-management/view-university/${cell?.id}`}>
            <button className='action-btns green-bg' type='button'>
              <img src={view} alt='' /> View
            </button>
          </Link>
          <Link to={`/university-management/edit-university/${cell?.id}`}>
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
  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteUniversity({ id }, token))
    }
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
    dispatch(updateUniversity(data, token))
    setUniversityArray(
      universityArray.map((item) => {
        if (item.id === id) {
          item.is_active = e.target.checked ? 'y' : 'n'
          return item
        } else return item
      })
    )
  }

  // Table Columns
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
      text: 'University Name',
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

  // Pagination in Table
  const onPageChange = (page, sizePerPage) => {
    setPage(page)
    setStart(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1))
    if (page === 1) {
      dispatch(
        getAllUniversityListAction(0, limit, sort, sortOrder, search, token)
      )
    } else {
      dispatch(
        getAllUniversityListAction(
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
    dispatch(getAllUniversityListAction(
      start,
      e.value,
      sort,
      sortOrder,
      search,
      token
    ))
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
  const products = universityArray

  // Searching in Tabel
  const handleCallback = (childData) => {
    if (childData) {
      dispatch(
        getAllUniversityListAction(0, limit, sort, sortOrder, search, token)
      )
    } else if (search === null) {
      dispatch(getAllUniversityListAction(0, limit, sort, sortOrder, '', token))
    } else {
      dispatch(getAllUniversityListAction(0, limit, sort, sortOrder, '', token))
    }
    setSearch(childData)
  }

  // Table Sorting
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
          getAllUniversityListAction(
            start,
            limit,
            sort,
            sortOrder,
            search,
            token
          )
        )
      }
    }
  }

  // Delete University
  const selectRow = (row) => {
    setRowArray((oldArray) => [...oldArray, row.id])
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isUniversityDeleted !== isUniversityDeleted) {
      if (isUniversityDeleted) {
        setShow(false)
        enqueueSnackbar(`${universityResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(
          getAllUniversityListAction(0, limit, sort, sortOrder, '', token)
        )
      } else if (isUniversityDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${universityResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isUniversityDeleted = isUniversityDeleted
    }
  }, [isUniversityDeleted])

  // Notification for status
  useEffect(() => {
    if (previousProps?.isUniversityUpdated !== isUniversityUpdated) {
      if (isUniversityUpdated) {
        setShow(false)
        enqueueSnackbar(`${universityResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(
          getAllUniversityListAction(
            start,
            limit,
            sort,
            sortOrder,
            search,
            token
          )
        )
      } else if (isUniversityUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${universityResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isUniversityUpdated = isUniversityUpdated
    }
  }, [isUniversityUpdated])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='University' parentCallback={handleCallback} />
          <TitleHeader
            title='University'
            name='University'
            url='add-new-university'
            location={location}
            rowArray={rowArray}
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
                  data={products}
                  columns={columns}
                  remote={true}
                  defaultSorted={defaultSortedBy}
                  onTableChange={handleTablechange}
                  selectRow={{
                    mode: 'checkbox',
                    clickToSelect: false,
                    classes: 'custom-class',
                    onSelect: selectRow
                  }}
                  pagination={paginationFactory(options)}
                  responsive='md'
                  options={options}
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

export default UniversityManagement
