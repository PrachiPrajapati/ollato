import React from 'react'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import lightlogomark from '../../assets/images/lightlogomark.svg'
import assessment from '../../assets/images/assessmenticon.svg'
import verified from '../../assets/images/verified.svg'
import { Accordion, ProgressBar } from 'react-bootstrap'
function Assessment () {
  return (
    <>
     <div className='common-layout common-dashboard-wrapper no-breadcrumbs no-dropdown'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader name='Assessment'/>
            <div className='main-layout'>
                <div className="profile-item h-100 assessment-box d-flex align-items-center position-relative overflow-hidden">
                                <img className='assessmenticon' src={assessment} alt="assessment" />
                                <div className='student-code'>
                                    {/* <img src={studenticon} alt="studenticon" /> */}
                                    <p> Ollato Student Code </p>
                                    <h2>75%</h2>
                                </div>
                            <img src={lightlogomark} className='lightlogomark' alt="ollato-img" />
                </div>
                <div className="assessment-item-box">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header><h5>Interest</h5><div className="progress-box"><h5>3/5</h5><ProgressBar now={60} /></div></Accordion.Header>
                            <Accordion.Body>
                                <div className="subtest-box">
                                    <h4>Realistic</h4>
                                    <div className="status-box">
                                        <h6>Completed</h6>
                                        <img src={verified} alt="verified" />
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Artistic</h4>
                                    <div className="status-box">
                                        <h6>Completed</h6>
                                        <img src={verified} alt="verified" />
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Social</h4>
                                    <div className="status-box">
                                        <h6>Completed</h6>
                                        <img src={verified} alt="verified" />
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Enterprising</h4>
                                    <div className="status-box">
                                        <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Conventional</h4>
                                    <div className="status-box">
                                        <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header><h5>Aptitude</h5><div className="progress-box"><h5>1/5</h5><ProgressBar now={20} /></div></Accordion.Header>
                            <Accordion.Body>
                                <div className="subtest-box">
                                    <h4>Realistic</h4>
                                    <div className="status-box">
                                        <h6>Completed</h6>
                                        <img src={verified} alt="verified" />
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Artistic</h4>
                                    <div className="status-box">
                                    <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Social</h4>
                                    <div className="status-box">
                                    <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Enterprising</h4>
                                    <div className="status-box">
                                        <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                                <div className="subtest-box">
                                    <h4>Conventional</h4>
                                    <div className="status-box">
                                        <button type="button" className="theme-btn text-none">Give Test</button>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default Assessment
