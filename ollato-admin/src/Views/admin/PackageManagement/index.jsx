import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'
import { Link, useLocation } from 'react-router-dom'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import {
  deletePackage,
  editSpecificPackage,
  getAllPackageListAction
} from '../../../Actions/Admin/package'

function PackageManagement () {
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
  const [limit, setLimit] = useState(10)
  const [sort] = useState('title')
  const [order] = useState('ASC')
  const [, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [start, setStart] = useState(0)
  const [show, setShow] = useState(false)
  const [id, setId] = useState([])
  const [rowArray, setRowArray] = useState([])
  const [packageArray, setPackageArray] = useState([])
  const [, setSortField] = useState('')
  const [, setSortOrder] = useState('asc')

  // useSelector
  const count = useSelector((state) => state.packages.packageCount)
  const isPackageDeleted = useSelector((state) => state.packages.isDeleted)
  const isPackageUpdated = useSelector(
    (state) => state.packages.isPackageEdited
  )
  const packageResData = useSelector((state) => state.packages.resMessage)
  const packageListData = useSelector((state) => state.packages.packageList)

  // previousProps
  const previousProps = useRef({
    packageListData,
    isPackageDeleted,
    isPackageUpdated,
    packageResData
  }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(getAllPackageListAction(start, limit, sort, order, search, token))
  }, [])

  useEffect(() => {
    if (previousProps?.packageListData !== packageListData) {
      if (packageListData) {
        setPackageArray(packageListData)
      }
    }
    return () => {
      previousProps.packageListData = packageListData
    }
  }, [packageListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <div className='button-box'>
        <Link to={`/package-management/view-package/${cell?.id}`}>
          <button className='action-btns green-bg' type='button'>
            <img src={view} alt='' /> View
          </button>
        </Link>
        <Link to={`/package-management/edit-package/${cell?.id}`}>
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
      dispatch(deletePackage({ id: [id] }, token))
    }
  }
  // Delete Row
  const selectRow = (row, isSelect, rowIndex) => {
    setRowArray((oldArray) => [...oldArray, row.id])
  }

  // Table Switch : Status on/off
  const switchAction = (row, cell) => {
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
    dispatch(editSpecificPackage(data, token))
    setPackageArray(
      packageArray.map((item) => {
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
      dispatch(getAllPackageListAction(0, limit, sort, order, search, token))
    } else if (search === null) {
      dispatch(getAllPackageListAction(0, limit, sort, order, '', token))
    } else {
      dispatch(getAllPackageListAction(0, limit, sort, order, '', token))
    }
    setSearch(childData)
  }

  const products = packageArray
  const columns = [
    {
      dataField: 'id',
      text: 'Sr. No',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'title',
      text: 'Package Name',
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
      dataField: 'package_number',
      text: 'Package Number',
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
      dataField: 'amount',
      text: 'Price',
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
      dispatch(getAllPackageListAction(0, limit, sort, order, search, token))
    } else {
      dispatch(
        getAllPackageListAction(
          limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1),
          limit,
          sort,
          order,
          search,
          token
        )
      )
    }
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    dispatch(getAllPackageListAction(start, e.value, sort, order, search, token))
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
          getAllPackageListAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isCityDeleted !== isPackageDeleted) {
      if (isPackageDeleted) {
        setShow(false)
        enqueueSnackbar(`${packageResData}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllPackageListAction(0, limit, sort, order, '', token))
      } else if (isPackageDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${packageResData}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isPackageDeleted = isPackageDeleted
    }
  }, [isPackageDeleted])

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isPackageUpdated !== isPackageUpdated) {
      if (isPackageUpdated) {
        setShow(false)
        enqueueSnackbar(`${packageResData}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllPackageListAction(0, limit, sort, order, '', token))
      } else if (isPackageUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${packageResData}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isPackageUpdated = isPackageUpdated
    }
  }, [isPackageUpdated])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header parentCallback={handleCallback} />
          <TitleHeader
            title='Package Management'
            name='Package'
            url='add-new-package'
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

export default PackageManagement
