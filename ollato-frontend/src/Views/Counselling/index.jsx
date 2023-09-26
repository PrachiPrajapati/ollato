import React, { useState } from 'react'
/* React Packages */
import { Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
/* images */
import rating from '../../assets/images/rating.png'
import background from '../../assets/images/brooklyn-simmons.png'
import { Link } from 'react-router-dom'
const Counselling = () => {
  const [startDate, setStartDate] = useState(new Date())
  /* for TimeFilter */
  const timeFilter = [{ value: '10:00 AM', label: '10:00 AM' }, { value: '12:00 AM', label: '12:00 AM' }, { value: '01:00 AM', label: '01:00 AM' }, { value: '03:00 AM', label: '03:00 AM' }]
  const [selectedTimeFilter, setSelectedTimeFilter] = useState([{ value: '10:00 AM', label: '10:00 AM' }])

  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-breadcrumbs'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader title="Counselling"/>
            <div className='main-layout whitebox-layout no-padding'>
              <div className='heading-box counselling-page'>
                    <h5 className='mr-1'>Book Session</h5>
                    <Form>
                    <div className='btn-box filter-box light-bg'>
                        <div className="filter-date-btn filter-btn">
                          <DatePicker className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div>
                          <span className='seperator'>-</span>
                        </div>
                        <div className="filter-time-btn filter-btn">
                          <Form.Group className="form-group common-select-style mb-0" controlId="formfullname">
                            <Select classNamePrefix="filter-custom" isSearchable={false} defaultValue={selectedTimeFilter} onChange={setSelectedTimeFilter} options={timeFilter}/>
                          </Form.Group>
                        </div>
                    </div>
                    </Form>
                  </div>
                  <div className="counsellor-box">
                <div className="row">
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                  <div className="col-xxl-3 col-xl-4 col-sm-6">
                    <Link to='/counselling/counselor-detail' className='d-block'>
                    <div className="counsellor-item">
                      <div className="counsellor-img" style={{ backgroundImage: 'url(' + background + ')' }}></div>
                      <div className="counsellor-info">
                          <h6 className='counsellor-name' >Brooklyn Simmons</h6>
                          <div className="rating"><img src={rating} alt="rating" /><p>3.5/5</p></div>
                          <div className="btn-box">
                            <button type='button' className="white-btn book-now">Book Now</button>
                          </div>
                      </div>
                    </div>
                    </Link>
                  </div>
                </div>
              </div>
              </div>
          </div>
    </div>
  </>
  )
}

export default Counselling
