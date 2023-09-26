import React, { useEffect, useState } from 'react'
import { Tab, Nav } from 'react-bootstrap'
// import Tabs from 'react-bootstrap/Tabs'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import verified from '../../assets/images/verified.svg'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
/* images */
import queansline from '../../assets/images/question-answer-line.svg'
import timerline from '../../assets/images/timer-line.svg'

import { getTestProcess } from '../../Actions/testProcess'
import NeedPurchasePackage from './NeedPurchasePackage'

function TestProcess () {
  // Constant
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const statusCode = useSelector((state) => state.test.resStatus)

  // useState
  const testProcessArray = useSelector((state) => state.test.testProcessTest)
  console.log('testProcessArray', testProcessArray)
  const [key, setKey] = useState('')
  // useEffect
  useEffect(() => {
    if (token) {
      dispatch(getTestProcess(token))
    }
  }, [token])
  useEffect(() => {
    if (testProcessArray) {
      setKey(testProcessArray && testProcessArray[0]?.title)
    }
  }, [testProcessArray])

  return (
    <>
      <div className="common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown">
        <Sidebar location={location} />
        <MobileHeader />
        <div className="main-content-box">
          <Header />
          <TitleHeader name="Test Process" />
          <div className="main-layout test-process-tab">
           {
            statusCode === 400
              ? <NeedPurchasePackage/>
              : <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={key}
            activeKey={key}
            onSelect={(k) => {
              setKey(k)
            }}
          >
            <Nav variant="pills">
              {testProcessArray &&
                testProcessArray.map((data) => {
                  return (
                    <>
                      <Nav.Item>
                        <Nav.Link eventKey={data?.title}>
                          {data?.title}
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  )
                })}
            </Nav>
            <Tab.Content>
              {testProcessArray &&
                testProcessArray.map((data) => {
                  return (
                    <>
                      {data?.test_details.map((d) => {
                        return (
                          <>
                          {console.log('d---***', d)}
                            <Tab.Pane eventKey={data?.title}>
                              <ul className="pl-0">
                                <li className="common-white-box">
                                  <div className="left-box">
                                    <h5>{d?.title}</h5>
                                    <div className="inner-box d-flex align-items-center">
                                      <h4>
                                        <img
                                          src={queansline}
                                          alt="queansline"
                                        />
                                        {d?.no_of_questions} Questions
                                      </h4>
                                      {d.test_time === null
                                        ? (
                                            ''
                                          )
                                        : (
                                        <h4>
                                          <img
                                            src={timerline}
                                            alt="timerline"
                                          />
                                          {d?.test_time?.time_Sec
                                            ? moment
                                              .utc(
                                                d?.test_time?.time_Sec *
                                                    1000
                                              )
                                              .format('mm')
                                            : '0'}{' '}
                                          Minutes
                                        </h4>
                                          )}
                                    </div>
                                  </div>
                                  <div className="right-box d-md-block text-end">
                                    {
                                      d?.studentTests?.length > 0
                                        ? <div className="status-box catstatus justify-content-end">
                                            <h6>Completed</h6>
                                            <img src={verified} alt="verified" />
                                        </div>
                                        : <>
                                        <Link
                                          to={`/test-process/test-category-detail/${d?.id}`}
                                          state={{ dataObject: d }}
                                          className="theme-btn text-none"
                                        >
                                          View Details
                                        </Link>
                                        <p className="note-line mb-0">
                                          All questions are mandatory
                                        </p>
                                      </>
                                    }
                                  </div>
                                </li>
                              </ul>
                            </Tab.Pane>
                          </>
                        )
                      })}
                    </>
                  )
                })}
            </Tab.Content>
          </Tab.Container>
           }
          </div>
        </div>
      </div>
    </>
  )
}

export default TestProcess
