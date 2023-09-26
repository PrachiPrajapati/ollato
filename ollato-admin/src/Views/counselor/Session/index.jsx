import React from 'react'
/* React Packages */
import { Nav, Tab } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
/* images */
// import rating from '../../../assets/images/rating.png'
import repeat from '../../../assets/images/reschedule-blue.svg'
import cancel from '../../../assets/images/cancel.svg'
import counsimg from '../../../assets/images/couns.png'
// import review from '../../../assets/images/review.svg'
import starticon from '../../../assets/images/starticon.svg'
import accepttick from '../../../assets/images/accept-tick.svg'
import view from '../../../assets/images/view-eye.svg'
import reports from '../../../assets/images/reports.svg'
import { Link } from 'react-router-dom'
const actionbutton = (row, cell) => {
  return (
    <>
    <div className="btn-common-box d-flex align-items-center justify-content-between">
      <div className="button-box">
          <Link to='/counselling/reschedule'><button className='action-btns green-bg' type='button'> <img src={accepttick} alt='' /> Accept</button></Link>
          <Link to='/counselling/reschedule'><button className='action-btns light-blue-bg' type='button'> <img src={repeat} alt='' /> Reschedule</button></Link>
          <Link to='/'><button className='action-btns light-red-bg' type='button'> <img src={cancel} alt='' /> Cancel</button></Link>
      </div>
      <Link to='/'><button className='action-btns green-bg img-btn' type='button'> <img className='mr-0' src={view} alt='' /></button></Link>
    </div>
    </>
  )
}
const completedactionbutton = (row, cell) => {
  return (
    <>
    <div className="btn-common-box d-flex align-items-center justify-content-between">
    <div className="button-box">
      <Link to='/'><button className='action-btns green-bg' type='button'> <img src={starticon} alt='' /> Start Session</button></Link>
      <Link to='/'><button className='action-btns light-blue-bg' type='button'> <img src={reports} alt='' /> Reports</button></Link>
      <Link to='/'><button className='action-btns light-red-bg img-btn' type='button'> Cancelled</button></Link>
    </div>
    <Link to='/'><button className='action-btns green-bg img-btn' type='button'> <img className='mr-0' src={view} alt='' /></button></Link>
    </div>
    </>
  )
}
const counsellorinfo = (row, cell) => {
  return (
    <div className="counsellor-infobox">
      <img src={counsimg} alt='' />
      <div className="counsinfo">
        <p>Savannah Nguyen</p>
        <a className='email-text' href='mailto:savannah.n@gmail.com'>savannah.n@gmail.com</a>
      </div>
    </div>
  )
}
const Session = () => {
  /* for TimeFilter */
/*   const timeFilter = [{ value: '10:00 AM', label: '10:00 AM' }, { value: '12:00 AM', label: '12:00 AM' }, { value: '01:00 AM', label: '01:00 AM' }, { value: '03:00 AM', label: '03:00 AM' }]
  const [selectedTimeFilter, setSelectedTimeFilter] = useState([{ value: '10:00 AM', label: '10:00 AM' }])
  const [startDate, setStartDate] = useState(new Date()) */
  const columns = [
    {
      dataField: 'id',
      text: 'Sr. no.'
    },
    {
      dataField: 'studentdetails',
      text: 'Student Details',
      formatter: counsellorinfo
    },
    {
      dataField: 'datetime',
      text: 'Date & Time'
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]
  const products = [{
    id: 1,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 2,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 3,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 4,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 5,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 6,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  }]
  const completedcolumns = [
    {
      dataField: 'id',
      text: 'Sr. no.'
    },
    {
      dataField: 'counsellor',
      text: 'Counsellor',
      formatter: counsellorinfo
    },
    {
      dataField: 'datetime',
      text: 'Date & Time'
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: completedactionbutton
    }
  ]
  const completedproducts = [{
    id: 1,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 2,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 3,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 4,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 5,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  },
  {
    id: 6,
    studentdetails: '',
    datetime: '2020-06-29 02:46 PM',
    action: ''
  }]
  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-dropdown no-breadcrumbs table-tab'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader title="Sessions" />
            <div className='main-layout whitebox-layout'>
                 <div className="session-history-box">
                 <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                    <div className="d-flex justify-content-between align-items-center heading-box">
                      <Nav variant="pills" >
                        <Nav.Item>
                            <Nav.Link eventKey="all">All</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="pending">Pending</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="upcoming">upcoming</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="completed">Completed</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="canceled">Canceled</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="rescheduled">Rescheduled</Nav.Link>
                        </Nav.Item>
                        </Nav>
                       {/*  <div className='counselling-page'>
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
                                    <Select isSearchable={false} defaultValue={selectedTimeFilter} onChange={setSelectedTimeFilter} options={timeFilter}/>
                                  </Form.Group>
                                </div>
                            </div>
                          </Form>
                        </div> */}
                    </div>
                      <Tab.Content className='overflow-auto'>
                        <Tab.Pane eventKey="all">
                          <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                          <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        <Tab.Pane eventKey="pending">
                          <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                          <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        <Tab.Pane eventKey="upcoming">
                          <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                          <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        <Tab.Pane eventKey="completed">
                           <BootstrapTable keyField='id' data={completedproducts} columns={completedcolumns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                            <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        <Tab.Pane eventKey="canceled">
                          <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                          <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        <Tab.Pane eventKey="rescheduled">
                          <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
                          <h6 className='pending-sessions text-start'>Showing 7 from 50</h6>
                        </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                 </div>
              </div>
          </div>
    </div>
  </>
  )
}

export default Session
