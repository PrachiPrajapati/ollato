import React from 'react'

/* React Packages */
import { Link, NavLink, useLocation } from 'react-router-dom'
import moment from 'moment'

/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import backcaret from '../../assets/images/back-caret.svg'

/* images */
import queansline from '../../assets/images/question-answer-line.svg'
import timerline from '../../assets/images/timer-line.svg'
const TestCategoryDetail = () => {
  const location = useLocation()
  const { dataObject } = location.state
  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader name='Test Process'/>
            <div className="gobackbtn">
                <Link to='/test-process'><img src={backcaret} alt="backarrrow" />Go Back</Link>
              </div>
            <div className='main-layout whitebox-layout test-desc'>
            <div className='common-white-box'>
                    <div className="left-box">
                      <h5>{dataObject?.title}</h5>
                      <div className="inner-box d-flex align-items-center">
                        <h4> <img src={queansline} alt="queansline" /> {dataObject?.no_of_questions} Questions</h4>
                        {
                            dataObject?.test_time == null ? '' : <h4> <img src={timerline} alt="timerline" /> {dataObject?.test_time?.time_Sec ? moment.utc(dataObject?.test_time?.time_Sec * 1000).format('mm') : '0'} Minutes</h4>
                        }
                      </div>
                    </div>
                    <div className="right-box d-md-block text-end">
                      <NavLink to={`/test-process/test-question/${dataObject?.id}`} className="theme-btn text-none">Start Test Now</NavLink>
                      <p className='note-line mb-0'>All questions are mandatory</p>
                    </div>
                  </div>
                <div className="test-description">
                    <p>{dataObject?.description}</p>
                  <div className="instruction">
                    <h4>Instructions</h4>
                    <ul>
                      <li>Each question is timed</li>
                      <li>Do not use search engines or get help from others</li>
                      <li>Once you’ve submitted an answer, you cannot go back</li>
                    </ul>
                  </div>
                </div>
            </div>
          </div>
    </div>
  </>
  )
}

export default TestCategoryDetail
