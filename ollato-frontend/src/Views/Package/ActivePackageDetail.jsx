/* eslint-disable no-undef */
import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getActivePackagesDataAction, getAllAddOnPackagesDataAction, getOtherPackagesAction } from '../../Actions/packages'
import { useSnackbar } from 'react-notistack'
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'

const ActivePackageDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const token = localStorage.getItem('token')
  const { enqueueSnackbar } = useSnackbar()
  const [search, setSearch] = useState('')
  const [activePackagesArray, setActivePackagesArray] = useState([])
  const [addOnPackagesArray, setAddOnPackagesArray] = useState([])
  const activePackagesArrayData = useSelector(state => state.packages.activePackagesArray)
  const addOnPackagesArrayData = useSelector(state => state.packages.addOnPackagesArray)
  const otherPackagesArrayData = useSelector(state => state.packages.otherPackagesData)
  const responseStatus = useSelector(state => state.packages.resStatus)
  const responseMessage = useSelector(state => state.packages.resMessage)
  const previousProps = useRef({ activePackagesArrayData, addOnPackagesArrayData, responseStatus, responseMessage, otherPackagesArrayData }).current
  console.log('params', params.id)
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
    if (previousProps?.activePackagesArrayData !== activePackagesArrayData) {
      if (activePackagesArrayData) {
        setActivePackagesArray(activePackagesArrayData)
      }
    }
    return () => {
      previousProps.activePackagesArrayData = activePackagesArrayData
    }
  }, [activePackagesArrayData])
  useEffect(() => {
    if (previousProps?.addOnPackagesArrayData !== addOnPackagesArrayData) {
      if (addOnPackagesArrayData) {
        setAddOnPackagesArray(addOnPackagesArrayData)
      }
    }
    return () => {
      previousProps.addOnPackagesArrayData = addOnPackagesArrayData
    }
  }, [addOnPackagesArrayData])
  useEffect(() => {
    if (token) {
      dispatch(getActivePackagesDataAction('', token))
      dispatch(getAllAddOnPackagesDataAction(token))
      dispatch(getOtherPackagesAction('', token))
    }
  }, [token])
  useEffect(() => {
    dispatch(getActivePackagesDataAction(search, token))
  }, [search])
  console.log('addOnPackagesArray', activePackagesArray)
  const handleCallback = (childData) => {
    setSearch(childData)
  }
  return (
    <>
    <div className='common-layout common-dashboard-wrapper active-package no-breadcrumbs'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header parentCallback={handleCallback} />
            <TitleHeader title='Your Active Package' />
            {
                activePackagesArray && activePackagesArray.length >= 0
                  ? activePackagesArray.map((data) => {
                    return (
                        <>
                             <div className='main-layout whitebox-layout m-2'>
                                <div className='common-white-box'>
                                    <div className="left-box">
                                        <h5>{data?.package_name}</h5>
                                        <h4>{data?.f2f_call === true ? ' Face-2-Face meeting' : ''}</h4>
                                        <h4>{data?.online_test === true ? ' Online Testing' : ''}</h4>
                                        <h4>{data?.video_call === true ? 'Video Call' : ''}</h4>
                                    </div>
                                    <div className="right-box">
                                        <div className="price-box">
                                            <p>Expired on</p>
                                            <h5>{data?.expireDate ? moment(data?.expireDate).local().format('YYYY-MM-DD HH:mm:ss') : '-'}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="package-description mb-0">
                                    <p>{data?.description}</p>
                                </div>
                            </div>
                        </>
                    )
                  })
                  : 'No Data Found'
            }
            <div className="addon-package package-module">
              <TitleHeader title='Add-Ons Packages'/>
              <ul>
                {
                    addOnPackagesArray && addOnPackagesArray.length >= 0
                      ? addOnPackagesArray.map((data) => {
                        return (
                            <>
                                <li className='common-white-box'>
                                    <div className="left-box">
                                        <h5>{data?.title}</h5>
                                        <h5>{data?.package_name}</h5>
                                        <h4>{data?.f2f_call === true ? ' Face-2-Face meeting' : ''}</h4>
                                        <h4>{data?.online_test === true ? ' Online Testing' : ''}</h4>
                                        <h4>{data?.video_call === true ? 'Video Call' : ''}</h4>
                                    </div>
                                    <div className="right-box">
                                        <div className="price-box">
                                            <h5>{data?.amount}/- Rs</h5>
                                            <p>+ 18% GST</p>
                                        </div>
                                        <Link to={`/package-detail/active/${data.id}`} state={{ id: params.id }} className="theme-btn">View Details</Link>
                                    </div>
                                </li>
                            </>
                        )
                      })
                      : 'No data Found'
                }
              </ul>
              <TitleHeader title='Other Courses Packages'/>
              <ul>
                {
                  otherPackagesArrayData && otherPackagesArrayData.length >= 0
                    ? otherPackagesArrayData.map((data) => {
                      return (
                      <>
                          <li className='common-white-box'>
                            <div className="left-box">
                                <h5>{data?.title}</h5>
                                <h4>{data?.f2f_call === true ? ' Face-2-Face meeting' : ''}</h4>
                                <h4>{data?.online_test === true ? ' Online Testing' : ''}</h4>
                                <h4>{data?.video_call === true ? 'Video Call' : ''}</h4>
                            </div>
                            <div className="right-box">
                                <div className="price-box">
                                    <h5>{data?.amount}/- Rs</h5>
                                    <p>+ 18% GST</p>
                                </div>
                                <Link to={`/package-detail/active/${data.id}`} className="theme-btn">View Details</Link>
                            </div>
                        </li>
                      </>
                      )
                    })
                    : 'No data Found'
                }
              </ul>
            </div>
          </div>
    </div>
  </>
  )
}

export default ActivePackageDetail
