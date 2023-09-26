import React, { useEffect, useState, useRef } from 'react'
import Select from 'react-select'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import { useSnackbar } from 'react-notistack'
import view from '../../../../assets/images/view-eye.svg'
import edit from '../../../../assets/images/pencil-line.svg'
import deletes from '../../../../assets/images/delete-bin-line.svg'
import orderdefault from '../../../../assets/images/order-default.svg'
import orderup from '../../../../assets/images/order-up.svg'
import orderdown from '../../../../assets/images/order-down.svg'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import { deleteTestNormsDescription, editSpecificTestNormsDescription, getAllTestNormsDescription } from '../../../../Actions/Admin/Norms/TestNormsDescription/TestNormsDescription'

// import { useSnackbar } from 'react-notistack'

function TestDescriptionNorms () {
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
  const [start, setStart] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort] = useState('norm')
  const [order] = useState('asc')
  const [search, setSearch] = useState('')
  const [, setPage] = useState(1)
  const [testNormsDescriptionArray, setTestNormsDescriptionArray] = useState([])
  const [, setSortField] = useState('')
  const [, setSortOrder] = useState('asc')
  const [id, setId] = useState([])
  const [show, setShow] = useState(false)
  const [rowArray, setRowArray] = useState([])

  // useSelector
  const testNormsDescriptionListData = useSelector(
    (state) => state.testNormsDescription.testNormsDescriptionList
  )
  const testNormsDescriptionResMessage = useSelector(
    (state) => state.testNormsDescription.resMessage
  )
  const isTestNormsDescriptionUpdated = useSelector(
    (state) => state.testNormsDescription.isTestNormsDescriptionEdited
  )
  const isTestNormsDescriptionDeleted = useSelector(
    (state) => state.testNormsDescription.isDeleted
  )
  const count = useSelector(state => state.testNormsDescription.testNormsDescriptionCount)

  // previousProps
  const previousProps = useRef({
    testNormsDescriptionListData,
    testNormsDescriptionResMessage,
    isTestNormsDescriptionUpdated,
    isTestNormsDescriptionDeleted
  }).current

  // UseEffect for get Data
  useEffect(() => {
    dispatch(
      getAllTestNormsDescription(start, limit, sort, order, search, token)
    )
  }, [])

  useEffect(() => {
    if (
      previousProps?.testNormsDescriptionListData !==
      testNormsDescriptionListData
    ) {
      if (testNormsDescriptionListData) {
        setTestNormsDescriptionArray(testNormsDescriptionListData)
      }
    }
    return () => {
      previousProps.testNormsDescriptionListData = testNormsDescriptionListData
    }
  }, [testNormsDescriptionListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <div className='button-box'>
        <Link to={`/norms-management/test-description-norms/view-test-description-norms/${cell?.id}`}>
          <button className='action-btns green-bg' type='button'>
            <img src={view} alt='' /> View
          </button>
        </Link>
        <Link to={`/norms-management/test-description-norms/edit-test-description-norms/${cell?.id}`}>
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
      dispatch(deleteTestNormsDescription({ id: [id] }, token))
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
    dispatch(editSpecificTestNormsDescription(data, token))
    setTestNormsDescriptionArray(
      testNormsDescriptionArray.map((item) => {
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
      dispatch(getAllTestNormsDescription(0, limit, sort, order, search, token))
    } else if (search === null) {
      dispatch(getAllTestNormsDescription(0, limit, sort, order, '', token))
    } else {
      dispatch(getAllTestNormsDescription(0, limit, sort, order, '', token))
    }
    setSearch(childData)
  }

  const products = testNormsDescriptionArray
  const columns = [
    {
      dataField: 'id',
      text: 'Id',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
    },
    {
      dataField: 'test_title',
      text: 'Test'
    },
    {
      dataField: 'test_details_title',
      text: 'Sub Test'
    },
    {
      dataField: 'norm',
      text: 'Norms',
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
      dataField: 'test_details_description',
      text: 'Description'
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
      dispatch(getAllTestNormsDescription(0, limit, sort, order, search, token))
    } else {
      dispatch(
        getAllTestNormsDescription(
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
    dispatch(getAllTestNormsDescription(start, e.value, sort, order, search, token))
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
          getAllTestNormsDescription(start, limit, sort, sortOrder, search, token)
        )
      }
    }
  }

  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isTestNormsDescriptionDeleted !== isTestNormsDescriptionDeleted) {
      if (isTestNormsDescriptionDeleted) {
        setShow(false)
        enqueueSnackbar(`${testNormsDescriptionResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllTestNormsDescription(0, limit, sort, order, '', token))
      } else if (isTestNormsDescriptionDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${testNormsDescriptionResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isTestNormsDescriptionDeleted = isTestNormsDescriptionDeleted
    }
  }, [isTestNormsDescriptionDeleted])

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isTestNormsDescriptionUpdated !== isTestNormsDescriptionUpdated) {
      if (isTestNormsDescriptionUpdated) {
        setShow(false)
        enqueueSnackbar(`${testNormsDescriptionResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(getAllTestNormsDescription(0, limit, sort, order, '', token))
      } else if (isTestNormsDescriptionUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${testNormsDescriptionResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isTestNormsDescriptionUpdated = isTestNormsDescriptionUpdated
    }
  }, [isTestNormsDescriptionUpdated])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header parentCallback={handleCallback} />
          <TitleHeader
            name='Test Description Norms'
            title='Norms Management'
            url='add-new-test-description-norms'
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

export default TestDescriptionNorms
