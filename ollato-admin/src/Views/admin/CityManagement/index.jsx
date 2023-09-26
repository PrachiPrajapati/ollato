import React, { useState, useRef, useEffect } from 'react'

/* React Packages */
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'
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
  getAllCityListAction,
  deleteCity,
  editSpecificCity
} from '../../../Actions/Admin/cities'

import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'

function CityManagement () {
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
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort] = useState('title')
  const [order] = useState('asc')
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const [cityArray, setCityArray] = useState([])
  const [rowArray, setRowArray] = useState([])
  const [id, setId] = useState([])
  const [, setPage] = useState(1)
  const [, setSortField] = useState('')
  const [, setSortOrder] = useState('asc')

  // useSelector
  const cityResMessage = useSelector((state) => state.city.resMessage)
  const isCityDeleted = useSelector((state) => state.city.isDeleted)
  const isCityUpdated = useSelector((state) => state.city.isCityEdited)
  const cityListData = useSelector((state) => state.city.cityList)
  const count = useSelector((state) => state.city.cityCount)

  // previousProps
  const previousProps = useRef({
    cityListData,
    cityResMessage,
    isCityUpdated,
    isCityDeleted
  }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(getAllCityListAction(start, limit, sort, order, search, token))
  }, [])

  useEffect(() => {
    if (previousProps?.cityListData !== cityListData) {
      if (cityListData) {
        setCityArray(cityListData)
      }
    }
    return () => {
      previousProps.cityListData = cityListData
    }
  }, [cityListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <>
        <div className='button-box'>
          <Link to={`/city-management/view-city/${cell?.id}`}>
            <button className='action-btns green-bg' type='button'>
              <img src={view} alt='' /> View
            </button>
          </Link>
          <Link to={`/city-management/edit-city/${cell?.id}`}>
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
      dispatch(deleteCity({ id: [id] }, token))
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
    dispatch(editSpecificCity(data, token))
    setCityArray(
      cityArray.map((item) => {
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
      dispatch(getAllCityListAction(0, limit, sort, order, search, token))
    } else if (search === null) {
      dispatch(getAllCityListAction(0, limit, sort, order, '', token))
    } else {
      dispatch(getAllCityListAction(0, limit, sort, order, '', token))
    }
    setSearch(childData)
  }

  const products = cityArray

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
      text: 'City Name',
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
      dispatch(getAllCityListAction(0, limit, sort, order, search, token))
    } else {
      dispatch(
        getAllCityListAction(
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
    dispatch(getAllCityListAction(start, e.value, sort, order, search, token))
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
          getAllCityListAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isCityDeleted !== isCityDeleted) {
      if (isCityDeleted) {
        setShow(false)
        enqueueSnackbar(`${cityResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllCityListAction(0, limit, sort, order, '', token))
      } else if (isCityDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${cityResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isCityDeleted = isCityDeleted
    }
  }, [isCityDeleted])

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isCityUpdated !== isCityUpdated) {
      if (isCityUpdated) {
        setShow(false)
        enqueueSnackbar(`${cityResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllCityListAction(0, limit, sort, order, '', token))
      } else if (isCityUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${cityResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isCityUpdated = isCityUpdated
    }
  }, [isCityUpdated])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header name='City List' parentCallback={handleCallback} />
          <TitleHeader
            name='City'
            title='City'
            url='add-new-city'
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

export default CityManagement
