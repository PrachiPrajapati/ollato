import React, { useEffect, useRef } from 'react'

/* React Packages */
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'react-notistack'

/* Components */
import Sidebar from '../../Components/Sidebar'
import Header from '../../Components/Header'
import MobileHeader from '../../Components/MobileHeader'
import TitleHeader from '../../Components/TitleHeader'
import backarrow from '../../assets/images/backarrow.svg'

/* Action file */
import {
  getPackageDataByIDAction,
  purchasePackageAction
} from '../../Actions/packages'

const PackageDetail = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar()
  const token = localStorage.getItem('token')
  // const [data, setPackagesArrayData] = useState([])
  const data = useSelector(state => state.packages.packageDataById)
  const responseMessage = useSelector(state => state.packages.ressMessage)
  const isPurchased = useSelector(state => state.packages.packagePurchased)
  const previousProps = useRef({ data }).current
  useEffect(() => {
    if (token) {
      dispatch(getPackageDataByIDAction(params.id, token))
    }
  }, [token])
  // useEffect(() => {
  //   if (previousProps?.data !== data) {
  //     if (data) {
  //       setPackagesArrayData(data)
  //     }
  //   }
  //   return () => {
  //     previousProps.data = data
  //   }
  // }, [data])
  const handleActivePackage = () => {
    console.log('packageArrayData', data)
    const dataa = {
      packageId: data.id
    }
    if (data) {
      dispatch(purchasePackageAction(dataa, token))
    }
  }
  // Toastify Notification
  useEffect(() => {
    if (previousProps?.answerAdded !== isPurchased) {
      if (isPurchased) {
        enqueueSnackbar(`${responseMessage}`, {
          variant: 'success',
          autoHide: true,
          hide: 3000
        })
      } else if (isPurchased === false) {
        enqueueSnackbar(`${responseMessage}`, {
          variant: 'error',
          autoHide: true,
          hide: 3000
        }
        )
      }
    }
    return () => {
      previousProps.isPurchased = isPurchased
    }
  }, [isPurchased])
  return (
    <>
    <div className='common-layout common-dashboard-wrapper no-breadcrumbs'>
          <Sidebar location={location} />
          <MobileHeader />
          <div className='main-content-box'>
            <Header />
            <TitleHeader title='Your Courses Package'/>
            <div className='main-layout whitebox-layout'>
              <div className="back-btn">
              <Link to="/package"><img src={backarrow} alt="" /> <span>Back</span> </Link>
              {/* <Link to="/forgot-password" >Forgot Password?</Link> */}
              </div>
                <div className='common-white-box'>
                    <div className="left-box">
                        <h5>{data?.title}</h5>
                        <h4>{data?.f2f_call ? ' Face-2-Face meeting' : ''}</h4>
                        <h4>{data?.online_test ? ' Online Testing' : ''}</h4>
                        <h4>{data?.video_call ? 'Video Call' : ''}</h4>
                    </div>
                    <div className="right-box">
                        <div className="price-box">
                            <h5>{data?.amount}/- Rs</h5>
                            <p>+ 18% GST</p>
                        </div>
                    </div>
                </div>
                <div className="package-description">
                    <p>{data?.description}</p>
                </div>
                <button className="theme-btn text-none" onClick={handleActivePackage} >Active Package Now</button>
                {/* <Link
                  className="theme-btn text-none"
                  to={`/activepackage-detail/${data?.id}`}
                >Active Package Now</Link> */}
            </div>
          </div>
    </div>
  </>
  )
}

export default PackageDetail
