import React, { useEffect, useRef, useState } from 'react'

/* React-Packages */
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import ollatoicon from '../../assets/images/ollatoicon.svg'

/* Action File */
import { getDashboardCount } from '../../Actions/dashboard'
const Index = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [dataArray, setDataArray] = useState([])
  const token = localStorage.getItem('token')
  const data = useSelector(state => state.dashboard.dashboardData)
  const previousProps = useRef({ data }).current
  console.log('location', location)
  useEffect(() => {
    if (token) {
      dispatch(getDashboardCount(token))
    }
  }, [])

  useEffect(() => {
    if (previousProps?.data !== data) {
      if (data) {
        setDataArray(data)
      }
    }
    return () => {
      previousProps.data = data
    }
  }, [data])
  return (
    <>
    <div className='common-layout common-dashboard-wrapper dashboard no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader name='Dashboard'/>
            <div className='main-layout'>
                <div className="row">
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box">
                        <h5>Completed Test</h5>
                        <h2>{dataArray?.completedTest}%</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box">
                        <h5>Aptitude Test</h5>
                        <h2>{dataArray?.aptitudeTestProgress}%</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box">
                        <h5>Interest Test</h5>
                        <h2>{dataArray?.interestTestProgress}</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box">
                        <h5>Package Purchase</h5>
                        <h2>{dataArray?.packagePurchased}</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
    </div>
  </>
  )
}

export default Index
