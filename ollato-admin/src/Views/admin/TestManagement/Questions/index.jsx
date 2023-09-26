import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../../../Components/Sidebar'
import Header from '../../../../Components/Header'
import MobileHeader from '../../../../Components/MobileHeader'
import TitleHeader from '../../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import view from '../../../../assets/images/view-eye.svg'
import edit from '../../../../assets/images/pencil-line.svg'
import deletes from '../../../../assets/images/delete-bin-line.svg'
import orderup from '../../../../assets/images/order-up.svg'
import orderdown from '../../../../assets/images/order-down.svg'
import orderdefault from '../../../../assets/images/order-default.svg'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'
import Select from 'react-select'
import {
  deleteQuestion,
  editSpecificQuestion,
  getAllQuestionListAction,
  getAllSubCategory
} from '../../../../Actions/Admin/Test/Question'

function Questions () {
  // Constanst
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
  const [testDetailsId, setTestDetailsId] = useState()
  const [order] = useState('asc')
  const [search, setSearch] = useState('')
  const [sort] = useState('test_detail_id')
  const [, setPage] = useState(1)
  const [show, setShow] = useState(false)
  const [id, setId] = useState('')
  const [questionArray, setQuestionArray] = useState([])
  const [, setSortOrder] = useState('asc')
  const [, setSortField] = useState('')

  // useSelector
  const isQuestionDeleted = useSelector((state) => state.question.isDeleted)
  const count = useSelector((state) => state.question.questionCount)

  const isQuestionUpdated = useSelector(
    (state) => state.question.isQuestionEdited
  )
  const questionResMessage = useSelector((state) => state.question.resMessage)
  const questionListData = useSelector((state) => state.question.questionList)
  const subtestArray = useSelector(
    (state) => state.question.testSubCategoryList
  )

  // PreviousProps
  const previousProps = useRef({
    questionListData,
    isQuestionDeleted,
    questionResMessage,
    isQuestionUpdated
  }).current

  // useEffect for Category
  useEffect(() => {
    dispatch(getAllSubCategory(token))
  }, [])

  const handleIdChange = (e) => {
    const setCategoryId = e?.id
    setTestDetailsId(setCategoryId)
    if (setCategoryId) {
      dispatch(
        getAllQuestionListAction(
          0,
          limit,
          sort,
          order,
          '',
          setCategoryId,
          token
        )
      )
    }
  }

  // useEffect for listing Data
  useEffect(() => {
    dispatch(
      getAllQuestionListAction(
        start,
        limit,
        sort,
        order,
        '',
        testDetailsId,
        token
      )
    )
  }, [])

  useEffect(() => {
    if (previousProps?.questionListData !== questionListData) {
      if (questionListData) {
        setQuestionArray(questionListData)
      }
    }
    return () => {
      previousProps.questionListData = questionListData
    }
  }, [questionListData])

  // Table Button : View, Edit, Delete
  const actionbutton = (row, cell) => {
    return (
      <div className='button-box'>
        <Link to={`/test-management/question/view-questions/${cell?.id}`}>
          <button className='action-btns green-bg' type='button'>
            <img src={view} alt='' /> View
          </button>
        </Link>
        <Link to={`/test-management/question/edit-questions/${cell?.id}`}>
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
      dispatch(deleteQuestion({ id: [id] }, token))
    }
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
    dispatch(editSpecificQuestion(data, token))
    setQuestionArray(
      questionArray.map((item) => {
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
      dispatch(
        getAllQuestionListAction(
          0,
          limit,
          sort,
          order,
          childData,
          testDetailsId,
          token
        )
      )
    } else if (childData === null) {
      dispatch(
        getAllQuestionListAction(
          0,
          limit,
          sort,
          order,
          '',
          testDetailsId,
          token
        )
      )
    } else {
      dispatch(
        getAllQuestionListAction(
          0,
          limit,
          sort,
          order,
          '',
          testDetailsId,
          token
        )
      )
    }
    setSearch(childData)
  }

  const products = questionArray
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
      dataField: 'question',
      text: 'Question'
    },
    {
      dataField: 'testDetails.title',
      text: 'Sub Category',
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
      dispatch(
        getAllQuestionListAction(
          0,
          limit,
          sort,
          order,
          '',
          testDetailsId,
          token
        )
      )
    } else {
      dispatch(
        getAllQuestionListAction(
          limit * (page - 1) - 1 < 0 ? 0 : limit * (page - 1),
          limit,
          sort,
          order,
          '',
          testDetailsId,
          token
        )
      )
    }
  }

  // pagePerLimit
  const handlePagePerLimit = (e) => {
    setLimit(e.value)
    dispatch(
      getAllQuestionListAction(
        0,
        e.value,
        sort,
        order,
        '',
        testDetailsId,
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
        dispatch(
          getAllQuestionListAction(
            start,
            limit,
            sort,
            sortOrder,
            search,
            testDetailsId,
            token
          )
        )
      }
    }
  }
  // Notification for Delete
  useEffect(() => {
    if (previousProps?.isQuestionDeleted !== isQuestionDeleted) {
      if (isQuestionDeleted) {
        setShow(false)
        enqueueSnackbar(`${questionResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(
          getAllQuestionListAction(
            0,
            limit,
            sort,
            order,
            '',
            testDetailsId,
            token
          )
        )
      } else if (isQuestionDeleted === false) {
        setShow(false)
        enqueueSnackbar(`${questionResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isQuestionDeleted = isQuestionDeleted
    }
  }, [isQuestionDeleted])

  // Notification for Status
  useEffect(() => {
    if (previousProps?.isQuestionUpdated !== isQuestionUpdated) {
      if (isQuestionUpdated) {
        setShow(false)
        enqueueSnackbar(`${questionResMessage}`, {
          variant: 'success',
          hide: 2000,
          autoHide: true
        })
        dispatch(
          getAllQuestionListAction(
            start,
            limit,
            sort,
            order,
            '',
            testDetailsId,
            token
          )
        )
      } else if (isQuestionUpdated === false) {
        setShow(false)
        enqueueSnackbar(`${questionResMessage}`, {
          variant: 'error',
          hide: 2000,
          autoHide: true,
          TransitionComponent: 'Fade'
        })
      }
    }
    return () => {
      previousProps.isQuestionUpdated = isQuestionUpdated
    }
  }, [isQuestionUpdated])
  return (
    <>
      <div className='common-layout common-dashboard-wrapper'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header parentCallback={handleCallback} />
          <TitleHeader
            name='Question'
            title='Test Management'
            url='add-new-questions'
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
                <div className='categoryfilterbtn text-center'>
                  <Select
                    classNamePrefix='filter-custom'
                    className='filter-time-btn withrightimg'
                    getOptionLabel={(option) => option.title}
                    getOptionValue={(option) => option.id}
                    options={subtestArray}
                    placeholder={'Select Category'}
                    onChange={(e) => handleIdChange(e)}
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
                    classes: 'custom-class'
                    // onSelect: selectRow
                  }}
                  defaultSorted={defaultSortedBy}
                  pagination={paginationFactory(options)}
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

export default Questions
