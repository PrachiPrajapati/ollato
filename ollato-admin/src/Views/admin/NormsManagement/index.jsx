import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import orderup from '../../../assets/images/order-up.svg'
import orderdown from '../../../assets/images/order-down.svg'
import orderdefault from '../../../assets/images/order-default.svg'
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNorms, editSpecificNorms, getAllNormsAction } from '../../../Actions/Admin/Norms/norms'
import { Modal } from 'react-bootstrap'
import { useSnackbar } from 'react-notistack'

function NormsManagement () {
  // Constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const pagePerLimitArray = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' }
  ]

  // useState
  const [normsArray, setNormsArray] = useState([])
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(10)
  const [order] = useState('asc')
  const [sort] = useState('title')
  const [search, setSearch] = useState('')
  const [id, setId] = useState([])
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])
  const [, setSortField] = useState('')
  const [, setSortOrder] = useState('asc')
  const [, setPage] = useState(1)

  // useSelector
  const normsListData = useSelector((state) => state.norms.normsList)
  const isNormsDeleted = useSelector((state) => state.norms.isDeleted)
  const isNormsUpdated = useSelector((state) => state.norms.isNormsEdited)
  const normsResMessage = useSelector((state) => state.norms.resMessage)
  const count = useSelector((state) => state.norms.normsCount)

  // previousProps
  const previousProps = useRef({ normsListData, isNormsUpdated }).current

  // useEffect for listing Data
  useEffect(() => {
    dispatch(getAllNormsAction(start, limit, sort, order, search, token))
  }, [])
  useEffect(() => {
    if (previousProps?.normsListData !== normsListData) {
      if (normsListData) {
        setNormsArray(normsListData)
      }
    }
    return () => {
      previousProps.normsListData = normsListData
    }
  }, [normsListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <div className='button-box'>
        <Link to={`/norms-management/view-norms/${cell?.id}`}>
          <button className='action-btns green-bg' type='button'>
            <img src={view} alt='' /> View
          </button>
        </Link>
        <Link to={`/norms-management/edit-norms/${cell?.id}`}>
          <button className='action-btns light-blue-bg' type='button'>
            <img src={edit} alt='' /> Edit
          </button>
        </Link>
        <Link to=''>
          <button className='action-btns light-red-bg' onClick={() => handleShow(cell?.id)} type='button'>
            <img src={deletes} alt='' /> Delete
          </button>
        </Link>
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
      dispatch(deleteNorms({ id: [id] }, token))
    }
  }
  const selectRow = (row, isSelect, rowIndex) => {
    setRowArray((oldArray) => [...oldArray, row.id])
  }

  // Table Switch : Status on/off
  const switchAction = (row, cell, rowIndex) => {
    return (
      <label className='switch'>
        <input type="checkbox" checked={row === 'y'} onChange={(e) => handleChange(e, cell.id)} />
        <span className='slider blue' id='round'></span>
      </label>
    )
  }

  // Function to handle switch of table
  const handleChange = (e, id) => {
    const data = {
      id, isActive: e.target.checked ? 'y' : 'n', updateType: 'status'
    }
    dispatch(editSpecificNorms(data, token))
    setNormsArray(normsArray.map(item => {
      if (item.id === id) {
        item.is_active = e.target.checked ? 'y' : 'n'
        return item
      } else return item
    }))
  }

  // Search
  const handleCallback = (childData) => {
    if (childData) {
      dispatch(getAllNormsAction(0, limit, sort, order, search, token))
    } else if (search === null) {
      dispatch(getAllNormsAction(0, limit, sort, order, '', token))
    } else {
      dispatch(getAllNormsAction(0, limit, sort, order, '', token))
    }
    setSearch(childData)
  }

  const products = normsArray
  const columns = [
    {
      dataField: 'id',
      text: 'Norms ID',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'title',
      text: 'Norms Code ',
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
      dataField: 'code',
      text: 'Norms Description',
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
      dataField: 'sort_order',
      text: 'Sort Order',
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
      formatter: switchAction,
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
      dispatch(getAllNormsAction(0, limit, sort, order, search, token))
    } else {
      dispatch(
        getAllNormsAction(
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
    dispatch(getAllNormsAction(start, e.value, sort, order, search, token))
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
          getAllNormsAction(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isNormsDeleted !== isNormsDeleted) {
      if (isNormsDeleted) {
        setShow(false)
        enqueueSnackbar(`${normsResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllNormsAction(0, limit, sort, order, '', token))
      } else if (isNormsDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${normsResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isNormsDeleted = isNormsDeleted
    }
  }, [isNormsDeleted])

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isNormsUpdated !== isNormsUpdated) {
      if (isNormsUpdated) {
        setShow(false)
        enqueueSnackbar(`${normsResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllNormsAction(0, limit, sort, order, '', token))
      } else if (isNormsUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${normsResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isNormsUpdated = isNormsUpdated
    }
  }, [isNormsUpdated])

  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header parentCallback={handleCallback} />
          <TitleHeader
            name='Norms'
            title='Norms Management'
            url='add-new-Norms'
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

export default NormsManagement
