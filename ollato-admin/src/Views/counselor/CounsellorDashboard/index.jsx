import React from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import ollatoicon from '../../../assets/images/ollatoicon.svg'
const CounsellorDashboard = () => {
  return (
    <>
    <div className='common-layout common-dashboard-wrapper dashboard no-breadcrumbs no-dropdown'>
          <Sidebar />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <div className='main-layout'>
                <div className="row">
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box text-start">
                        <h5>Upcoming </h5>
                        <h2>21</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box text-start">
                        <h5>Completed</h5>
                        <h2>23</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box text-start">
                        <h5>Rescheduled</h5>
                        <h2>10</h2>
                      </div>
                      <div className="right-box">
                        <img src={ollatoicon} alt="ollatoicon" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className='common-white-box withrightlogo'>
                      <div className="left-box text-start">
                        <h5>Cancelled</h5>
                        <h2>07</h2>
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

export default CounsellorDashboard
