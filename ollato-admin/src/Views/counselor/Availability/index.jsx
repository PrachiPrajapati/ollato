import React from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
/* import axios from 'axios' */
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import timeslotmorning from '../../../assets/images/timeslotmorning.svg'
import timeslotnoon from '../../../assets/images/timeslotnoon.svg'
import timeslotnight from '../../../assets/images/timeslotnight.svg'
import { Link } from 'react-router-dom'
const actionbutton = (row, cell) => {
  return (
    <div className="button-box">
      <Link to='/'><button className='action-btns green-bg' type='button'> <img src={view} alt='' /> View</button></Link>
      <Link to='/'> <button className='action-btns light-blue-bg' type='button'> <img src={edit} alt='' /> Edit</button></Link>
      <Link to=''><button className='action-btns light-red-bg' type='button'> <img src={deletes} alt='' /> Delete</button></Link>
    </div>
  )
}
const slotsbox = (row, cell) => {
  return (
      <ul className="slot-availablity four-col bg-white small-space mt-0">
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotmorning} alt="timeslotmorning" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnoon} alt="timeslotnoon" />09:00 AM </button> </li>
        <li> <button className="slot-booking whitebtn lightbg"> <img src={timeslotnight} alt="timeslotnight" />09:00 AM </button> </li>
      </ul>
  )
}
function Availability () {
  const columns = [
    {
      dataField: 'id',
      text: 'ID'
    },
    {
      dataField: 'date',
      text: 'Date'
    },
    {
      dataField: 'day',
      text: 'Day'
    },
    {
      dataField: 'timeslots',
      text: 'Time Slots',
      formatter: slotsbox
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]
  const products = [{
    id: 1,
    date: '01 Jun 2022',
    day: 'Monday',
    slotsbox: '',
    action: ''
  },
  {
    id: 2,
    date: '02 Jun 2022',
    day: 'Tuesday',
    slotsbox: '',
    action: ''
  },
  {
    id: 3,
    date: '03 Jun 2022',
    day: 'Wednesday',
    slotsbox: '',
    action: ''
  },
  {
    id: 4,
    date: '04 Jun 2022',
    day: 'Thursday',
    slotsbox: '',
    action: ''
  },
  {
    id: 5,
    date: '05 Jun 2022',
    day: 'Friday',
    slotsbox: '',
    action: ''
  }]
  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs availaibity-management'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <div className="title-header no-breadcrumbs d-flex flex-row align-items-center">
                  <ul className="breadcrumbs">
                      <li className="breadcrumbs-item"><h3>Availability Management</h3></li>
                  </ul>
                  <button className="theme-btn text-none">Set Availability</button>
              </div>
              <div className='main-layout'>
                  <BootstrapTable keyField='id' data={products} columns={columns} pagination={paginationFactory({ sizePerPage: 6 })} responsive="md"/>
              </div>
            </div>
      </div>
    </>
  )
}

export default Availability
