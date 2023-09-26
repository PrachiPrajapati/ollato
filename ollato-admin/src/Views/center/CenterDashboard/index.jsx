import React from 'react'
// import Sidebar from '../../../Components/Sidebar'
import Sidebar from '../../../Components/Sidebar'
import MobileHeader from '../../../Components/MobileHeader'
import Header from '../../../Components/Header'
// import ollatoicon from '../../../assets/images/ollatoicon.svg'
import ollatoicon from '../../../assets/images/ollatoicon.svg'

const CenterDashboard = () => {
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
                    <h5>Counsellors </h5>
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
                    <h5>Completed Session</h5>
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
                    <h5>Students</h5>
                    <h2>10</h2>
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
export default CenterDashboard
