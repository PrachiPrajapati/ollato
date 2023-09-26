
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileHeader from '../../Components/MobileHeader'
import Sidebar from '../../Components/Sidebar'
/* images */
import congrats from '../../assets/images/congrats.svg'

function Congratulations (props) {
  const locationn = useLocation()
  console.log('location', Number(locationn.state))
  return (
    <>
       <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <div className="title-header no-breadcrumbs">
                <ul className="breadcrumbs">
                    <li className="breadcrumbs-item"><h3>{location?.data} Question test</h3></li>
                </ul>
            </div>
            <div className='main-layout whitebox-layout fullscreendata'>
                <div className='contentbox'>
                    <div className="timesupdesc">
                        <img src={congrats} alt='timeup' />
                        <h2>Congratulations...!</h2>
                        <h4>You have attempted test successfully in 30   minutes</h4>
                        <Link to={`/test-process/test-question/${Number(locationn?.state) + 1}`} className='theme-btn text-none'>Go to Next Test</Link>
                    </div>
                </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default Congratulations
