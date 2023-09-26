import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
/* import axios from 'axios' */
import view from '../../../assets/images/view-eye.svg'
import edit from '../../../assets/images/pencil-line.svg'
import deletes from '../../../assets/images/delete-bin-line.svg'
import { Link } from 'react-router-dom'
// import { useDispatch } from 'react-redux'

function CareerProfile () {
  // Constant
  // const dispatch = useDispatch()
  // const location = useLocation()
  // const token = localStorage.getItem('token')

  // useState

  // useEffect for listing Data
  useEffect(() => {
    // dispatch()
  }, [])

  const actionbutton = (row, cell) => {
    return (
      <div className='button-box'>
        <Link to='/norms-management/gradenorms/view-gradenorms'>
          <button className='action-btns green-bg' type='button'>
            <img src={view} alt='' /> View
          </button>
        </Link>
        <Link to='/norms-management/gradenorms/edit-gradenorms'>
          <button className='action-btns light-blue-bg' type='button'>
            <img src={edit} alt='' /> Edit
          </button>
        </Link>
        <Link to=''>
          <button className='action-btns light-red-bg' type='button'>
            <img src={deletes} alt='' /> Delete
          </button>
        </Link>
      </div>
    )
  }
  const columns = [
    {
      dataField: 'id',
      text: 'Profile Rec ID'
    },
    {
      dataField: 'profiletype',
      text: 'Profile Type'
    },
    {
      dataField: 'body',
      text: 'Action',
      formatter: actionbutton
    }
  ]
  const products = [
    {
      id: 1,
      profiletype: 'Academic Professions',
      action: ''
    },
    {
      id: 2,
      profiletype: 'Academic Professions',
      action: ''
    },
    {
      id: 3,
      profiletype: 'Administration',
      action: ''
    },
    {
      id: 4,
      profiletype: 'Academic Professions',
      action: ''
    },
    {
      id: 5,
      profiletype: 'Academic Professions',
      action: ''
    },
    {
      id: 6,
      profiletype: 'Administration',
      action: ''
    }
  ]
  return (
    <>
      <div className='common-layout common-dashboard-wrapper no-breadcrumbs'>
        <Sidebar />
        <MobileHeader />
        <div className='main-content-box'>
          <Header />
          <TitleHeader
            name='Career Profile'
            title='Career Profile'
            url='add-new-career-profile'
          />
          <div className='main-layout'>
            <BootstrapTable
              keyField='id'
              data={products}
              columns={columns}
              selectRow={{
                mode: 'checkbox',
                clickToSelect: true,
                classes: 'custom-class'
              }}
              pagination={paginationFactory({ sizePerPage: 6 })}
              responsive='md'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CareerProfile
