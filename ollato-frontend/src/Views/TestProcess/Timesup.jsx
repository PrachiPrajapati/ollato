import React from 'react'
import { Link } from 'react-router-dom'
import MobileHeader from '../../Components/MobileHeader'
import Sidebar from '../../Components/Sidebar'
/* images */
import timesup from '../../assets/images/timesup.svg'

function Timesup () {
  return (
    <>
       <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <div className="title-header no-breadcrumbs">
                <ul className="breadcrumbs">
                    <li className="breadcrumbs-item"><h3>Realistic Question test</h3></li>
                </ul>
            </div>
            <div className='main-layout whitebox-layout fullscreendata'>
                <div className='contentbox'>
                    <div className="timesupdesc">
                        <img src={timesup} alt='timeup' />
                        <h2>Time’s Up</h2>
                        <h4>Unfortunately you’ve run out of time to complete the Realistic Question Test. Don’t fret, you’ll have another chance to retake the skill test in 30 days.</h4>
                        <Link to='/test-process' className='theme-btn text-none'>Back to Test List</Link>
                    </div>
                </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default Timesup
