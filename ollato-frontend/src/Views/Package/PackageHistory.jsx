import React, { useEffect, useRef, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import pdficon from '../../assets/images/pdf-icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPackageHistoryDataAction } from '../../Actions/packages'
import { useSnackbar } from 'react-notistack'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const PackageHistory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  const [packageHistoryDataSet, setPackageHistoryDataSet] = useState([])
  const packageHistoryData = useSelector(state => state.packages.packageHistoryArray)
  const responseStatus = useSelector(state => state.packages.resStatus)
  const responseMessage = useSelector(state => state.packages.resMessage)
  const previousProps = useRef({ packageHistoryData, responseStatus, responseMessage }).current
  useEffect(() => {
    if (responseStatus === 401) {
      localStorage.removeItem('token')
      enqueueSnackbar(`${responseMessage}`, {
        variant: 'error',
        autoHide: true,
        hide: 3000
      })
      navigate('/')
    }
  }, [responseStatus])
  useEffect(() => {
    if (token) {
      dispatch(getAllPackageHistoryDataAction(token))
    }
  }, [token])
  useEffect(() => {
    if (previousProps?.packageHistoryData !== packageHistoryData) {
      if (packageHistoryData) {
        setPackageHistoryDataSet(packageHistoryData)
      }
    }
    return () => {
      previousProps.packageHistoryData = packageHistoryData
    }
  }, [packageHistoryData])
  console.log('packageHistoryData--', packageHistoryData)
  // console.log('packageHistoryDataSet', packageHistoryDataSet)
  const actionbutton = (row, cell) => {
    // console.log('cell', cell)
    return (
      <div className="button-box">
        <button className='action-btns light-red-bg medium-btn' type='button'>{cell?.isExpired === false ? 'Active' : 'InActive'}</button>
      </div>
    )
  }
  // const handleDownload = (id) => {
  //   navigate(`/http://3.7.98.19:1340/api/v1/student/purchased-package/invoice/${id}`)
  // }
  const invoicebutton = (row, cell, rowIndex) => {
    return (
      <div className="button-box">
        {/* <Link to={`http://3.7.98.19:1340/api/v1/student/purchased-package/invoice/${cell.package_custom_id}`} > */}
        <a href={`http://3.7.98.19:1340/api/v1/student/purchased-package/invoice/${cell.package_custom_id}`} >
          <button className='outline-btn withicon' type='button' >
          <img src={pdficon} alt="" /> <span>Download</span></button>
        </a>
        {/* </Link> */}
      </div>
    )
  }
  const columns = [
    {
      dataField: 'Sr.no',
      text: 'Sr. No',
      formatter: (cell, row, rowIndex) => {
        const rowNumber = rowIndex + 1
        return <span>{rowNumber}</span>
      }
      // sortFunc: (a, b, order, dataField, rowA, rowB) => {
      //   console.log('order', order)
      // }
    },
    {
      dataField: 'package_name',
      text: 'Package Name'
    },
    {
      dataField: 'purchase_date',
      text: 'Package Purchased',
      formatter: (cell, row, rowIndex) => {
        const data = moment(cell?.purchase_date).local().format('YYYY-MM-DD HH:mm:ss')
        return <span>{data}</span>
      }
    },
    {
      dataField: '',
      text: 'Package Status',
      formatter: actionbutton
    },
    {
      dataField: 'package-invoice',
      text: 'Package Invoice',
      formatter: invoicebutton
    }
  ]
  const products = packageHistoryDataSet
  return (
    <>
    <div className='common-layout common-dashboard-wrapper '>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader title="Your Active Package" name="Package History" />
            <div className='main-layout whitebox-layout table-student'>
              <BootstrapTable keyField='id' data={products} columns={columns} responsive="md"/>
            </div>
          </div>
    </div>
  </>
  )
}

export default PackageHistory
