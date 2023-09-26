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

/* Action File */
import {
  getAllStateAction,
  deleteState,
  editSpecificState
} from '../../../Actions/Admin/states'

import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'

function StateManagement () {
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
  const [limit, setLimit] = useState(10)
  const [order] = useState('asc')
  const [search, setSearch] = useState('')
  const [id, setId] = useState('')
  const [stateArray, setStateArray] = useState([])
  const [sort] = useState('title')
  const [, setSortField] = useState('')
  const [, setSortOrder] = useState('asc')
  const [rowArray, setRowArray] = useState([])

  // useSelector
  const stateResMessage = useSelector((state) => state.state.resMessage)
  const isStateDeleted = useSelector((state) => state.state.isDeleted)
  const isStateUpdated = useSelector((state) => state.state.isStateEdited)
  const stateListData = useSelector((state) => state.state.stateList)
  const count = useSelector((state) => state.state.stateCount)

  // PreviousProps
  const previousProps = useRef({
    stateListData,
    stateResMessage,
    isStateDeleted,
    isStateUpdated
  }).current

  // useEffect for listing data
  useEffect(() => {
    dispatch(getAllStateAction(start, limit, sort, order, search, token))
  }, [])

  useEffect(() => {
    if (previousProps?.stateListData !== stateListData) {
      if (stateListData) {
        setStateArray(stateListData)
      }
    }
    return () => {
      previousProps.stateListData = stateListData
    }
  }, [stateListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          <Link to={`/state-management/view-state/${cell?.id}`}>
            <button className='action-btns green-bg' type='button'>
              <img src={view} alt='' /> View
            </button>
          </Link>
          <Link to={`/state-management/edit-state/${cell?.id}`}>
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
      dispatch(deleteState({ id: [id] }, token))
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
    dispatch(editSpecificState(data, token))
    setStateArray(
      stateArray.map((item) => {
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
      dispatch(getAllStateAction(0, limit, sort, order, search, token))
    } else if (search === null) {
      dispatch(getAllStateAction(0, limit, sort, order, '', token))
    } else {
      dispatch(getAllStateAction(0, limit, sort, order, '', token))
    }
    setSearch(childData)
  }

  const products = stateArray
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
      text: 'State Name',
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
      dispatch(getAllStateAction(0, limit, sort, order, search, token))
    } else {
      dispatch(getAllStateAction(limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1), limit, sort, order, search, token))
    }
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    dispatch(
      getAllStateAction(
        start,
        e.value,
        sort,
        order,
        search,
        token
      )
    )
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
        dispatch(getAllStateAction(start, limit, sort, sortOrder, search, token))
      }
    }
  }

  // Notification for delete
  useEffect(() => {
    if (previousProps?.isStateDeleted !== isStateDeleted) {
      if (isStateDeleted) {
        setShow(false)
        enqueueSnackbar(`${stateResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        }
        )
        dispatch(getAllStateAction(0, limit, sort, order, '', token))
      } else if (isStateDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${stateResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isstateDeleted = isStateDeleted
    }
  }, [isStateDeleted])

  // Notification for status
  useEffect(() => {
    if (previousProps?.isStateUpdated !== isStateUpdated) {
      if (isStateUpdated) {
        setShow(false)
        enqueueSnackbar(`${stateResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllStateAction(0, limit, sort, order, '', token))
      } else if (isStateUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${stateResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isStateUpdated = isStateUpdated
    }
  }, [isStateUpdated])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='State List' parentCallback={handleCallback} />
          <TitleHeader
            name='State'
            title='State'
            url='add-new-state'
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
                  defaultSorted={defaultSortedBy}
                  onTableChange={handleTablechange}
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

export default StateManagement
