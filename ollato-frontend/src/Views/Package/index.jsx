import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
/* React Packages */
import { useDispatch, useSelector } from 'react-redux'
// import { useSnackbar } from 'react-notistack'
import Loader from '../../Components/Loader'
/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'

/* Action File */
import { getPackagesDataAction } from '../../Actions/packages'

const Package = () => {
  const location = useLocation()
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { enqueueSnackbar } = useSnackbar()
  const [sort] = useState('title')
  const [start] = useState(0)
  const [sortOrder] = useState('asc')
  const [limit] = useState(10)
  const token = localStorage.getItem('token')
  // const [packagesArray, setPackagesArray] = useState([])
  const packagesArrayData = useSelector(state => state.packages.packagesData)
  console.log('packagesArrayData', packagesArrayData)
  const loadingData = useSelector(state => state.packages.isLoading)
  // const previousProps = useRef({ packagesArrayData }).current
  // useEffect(() => {
  //   if (previousProps?.packagesArrayData !== packagesArrayData) {
  //     if (packagesArrayData) {
  //       setPackagesArray(packagesArrayData)
  //     }
  //   }
  //   return () => {
  //     previousProps.packagesArrayData = packagesArrayData
  //   }
  // }, [packagesArrayData])
  useEffect(() => {
    console.log('Hellooooooo')
    const data = {
      start,
      limit,
      sort,
      order: sortOrder
    }
    if (token && location.pathname === '/package') {
      dispatch(getPackagesDataAction(data, token))
    }
  }, [token && location.pathname])
  // console.log('packagesArray', packagesArray)
  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-breadcrumbs'>
          <Sidebar location={location?.pathname} />
          <MobileHeader />
          {
            // eslint-disable-next-line multiline-ternary
            loadingData === true ? <Loader /> : (
              <>
                <div className='main-content-box'>
                    <Header />
                  <TitleHeader title='Your Courses Package'/>
                  <div className='main-layout'>
                      <div className="package-module">
                          <ul>
                              {
                                  packagesArrayData && packagesArrayData.length >= 0
                                    ? packagesArrayData.map((data) => {
                                      return (
                                          <>
                                              <li className='common-white-box'>
                                                  <div className="left-box">
                                                      <h5>{data.title}</h5>
                                                      <h4>{data.description}</h4>
                                                  </div>
                                                  <div className="right-box">
                                                      <div className="price-box">
                                                          <h5>{data.amount}/- Rs</h5>
                                                          <p>+ 18% GST</p>
                                                      </div>
                                                      <NavLink to={`/package/package-detail/${data.id}`} className="theme-btn">View Details</NavLink>
                                                  </div>
                                              </li>
                                              {/* <li className='common-white-box'>
                                                  <div className="left-box">
                                                      <h5>Package 05</h5>
                                                      <h4>Online Testing, Report Generation</h4>
                                                  </div>
                                                  <div className="right-box">
                                                      <div className="price-box">
                                                          <h5>2499/- Rs</h5>
                                                          <p>+ 18% GST</p>
                                                      </div>
                                                      <Link to="/package-detail" className="theme-btn">View Details</Link>
                                                  </div>
                                              </li> */}
                                          </>
                                      )
                                    })
                                    : <p>No Data Found</p>
                              }
                          </ul>
                      </div>
                  </div>
                </div>
              </>
            )
          }
    </div>
  </>
  )
}

export default Package
