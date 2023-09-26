import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
// import Select from 'react-select'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

/* Components */
import Sidebar from '../../../Components/Sidebar'
import Header from '../../../Components/Header'
import MobileHeader from '../../../Components/MobileHeader'
import TitleHeader from '../../../Components/TitleHeader'

/* Action file */
import { getSpecificSchoolData } from '../../../Actions/Admin/school'
import { getAllCountriesAction, getAllStatesAction, getAllDistrictAction, getAllBoardsAction } from '../../../Actions/auth'

function ViewSchool () {
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const [country, setCountry] = useState([])
  const [state, setState] = useState([])
  const [district, setDistrict] = useState([])
  const [board, setBoard] = useState([])
  const [coun, setCoun] = useState('')
  const [st, setSt] = useState('')
  const [dis, setDis] = useState('')
  const [boa, setBoa] = useState('')
  console.log('---', coun)
  console.log('---', st)
  console.log('---', dis)
  console.log('---', boa)
  console.log('---', boa)
  const id = params.id
  const token = localStorage.getItem('token')
  const specificSchoolData = useSelector(state => state.school.specificSchoolData)
  const countriesArray = useSelector(state => state.auth.countriesData)
  const statesData = useSelector(state => state.auth.statesData)
  const districtData = useSelector(state => state.auth.districtData)
  const boardData = useSelector(state => state.auth.boardsData)
  const previousProps = useRef({ countriesArray, statesData, districtData, boardData }).current
  console.log('specificSchoolData', specificSchoolData)
  console.log('state', state)
  const { register, reset } = useForm({})

  console.log('id', id)
  useEffect(() => {
    if (id) {
      dispatch(getSpecificSchoolData(Number(id), token))
    }
  }, [id])

  useEffect(() => {
    dispatch(getAllCountriesAction())
    dispatch(getAllStatesAction())
    dispatch(getAllDistrictAction())
    dispatch(getAllBoardsAction())
  }, [])

  useEffect(() => {
    if (specificSchoolData && country?.length && state.length && district.length && board.length) {
      const contryV = country.filter((c) => c.value === specificSchoolData?.county_id)[0]
      const stateV = state.filter((c) => c.value === specificSchoolData?.state_id)[0]
      const districtV = district.filter((c) => c.value === specificSchoolData?.city_id)[0]
      const BoardV = board.filter((c) => c.value === specificSchoolData?.board_id)[0]
      console.log({ contryV }, { stateV }, { districtV })
      reset({
        country: contryV,
        state: stateV,
        district: districtV,
        board: BoardV
      })
    }
  }, [specificSchoolData, country, state, district, board])

  /* Cancel button */
  const handleclick = () => {
    navigate('/school-management')
  }
  /* for country */
  useEffect(() => {
    if (previousProps?.countriesArray !== countriesArray) {
      const array = []
      if (countriesArray) {
        // eslint-disable-next-line array-callback-return
        countriesArray.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setCountry(array)
      }
    }
    return () => {
      previousProps.countriesArray = countriesArray
    }
  }, [countriesArray])
  useEffect(() => {
    if (previousProps?.countriesArray !== countriesArray) {
      if (countriesArray) {
        const selCountry = countriesArray.filter(data => data?.id === specificSchoolData?.county_id)
        console.log('--', selCountry)
        // setSelectedCountry({})
        setCoun(selCountry[0]?.title)
      }
    }
    return () => {
      previousProps.countriesArray = countriesArray
    }
  }, [countriesArray])
  // const [selectedCountry, setSelectedCountry] = useState([{ value: 'India', label: 'India' }])
  /* for state */
  useEffect(() => {
    if (previousProps?.statesData !== statesData) {
      const array = []
      if (statesData) {
        // eslint-disable-next-line array-callback-return
        statesData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setState(array)
      }
    }
    return () => {
      previousProps.statesData = statesData
    }
  }, [statesData])
  useEffect(() => {
    if (previousProps?.statesData !== statesData) {
      if (statesData) {
        console.log('statesData', statesData)
        const selState = statesData.filter(data => data?.id === specificSchoolData?.state_id)
        console.log('--', selState)
        // setSelectedCountry({})
        setSt(selState[0]?.title)
      }
    }
    return () => {
      previousProps.statesData = statesData
    }
  }, [statesData])
  /* for District */
  useEffect(() => {
    if (previousProps?.districtData !== districtData) {
      const array = []
      if (districtData) {
        // eslint-disable-next-line array-callback-return
        districtData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setDistrict(array)
      }
    }
    return () => {
      previousProps.districtData = districtData
    }
  }, [districtData])
  useEffect(() => {
    if (previousProps?.districtData !== districtData) {
      if (districtData) {
        const selState = districtData.filter(data => data?.id === specificSchoolData?.city_id)
        // setSelectedCountry({})
        setDis(selState[0]?.title)
      }
    }
    return () => {
      previousProps.districtData = statesData
    }
  }, [districtData])
  /* for Board */
  useEffect(() => {
    if (previousProps?.boardData !== boardData) {
      const array = []
      if (boardData) {
        // eslint-disable-next-line array-callback-return
        boardData.map((data) => {
          array.push({
            value: data.id, label: data.title
          })
        })
        setBoard(array)
      }
    }
    return () => {
      previousProps.boardData = boardData
    }
  }, [boardData])
  useEffect(() => {
    if (previousProps?.boardData !== boardData) {
      if (boardData) {
        const selState = boardData.filter(data => data?.id === specificSchoolData?.board_id)
        // setSelectedCountry({})
        setBoa(selState[0]?.title)
      }
    }
    return () => {
      previousProps.boardData = statesData
    }
  }, [boardData])
  return (
    <>
         <div className='common-layout common-dashboard-wrapper add-new-form'>
            <Sidebar />
            <MobileHeader />
            <div className='main-content-box'>
              <Header />
              <TitleHeader name='School'/>
              <div className='main-layout'>
                  <div className="heading-box">
                      <h5>View School</h5>
                      <div className="btn-box">
                        <button type="button" onClick={handleclick} className='theme-btn dark-btn text-none'>Cancel</button>
                        {/* <button className='theme-btn text-none'>Save</button> */}
                      </div>
                  </div>
                    <div className="form-middle-layout">
                      <Form className='light-bg'>
                          <div className="row">
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formschoolfullname">
                                <Form.Label>School Full Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Full Name"
                                  Value={ specificSchoolData?.title ? specificSchoolData?.title : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formschoolabbreviation">
                                <Form.Label>School Abbreviation</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Abbreviation"
                                  Value={ specificSchoolData?.abbreviation ? specificSchoolData?.abbreviation : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                  type="text"
                                  {...register('country.label')}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Abbreviation"
                                  {...register('state.label')}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>District</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Abbreviation"
                                  {...register('district.label')}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group common-select-style" controlId="formfullname">
                                <Form.Label>Board</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter School Abbreviation"
                                  {...register('board.label')}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formaddressline1">
                                <Form.Label>Address Line 1</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line 1"
                                  Value={ specificSchoolData?.address_1 ? specificSchoolData?.address_1 : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formaddressline2">
                                <Form.Label>Address Line 2</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Address Line 2"
                                  Value={ specificSchoolData?.address_2 ? specificSchoolData?.address_2 : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formpincode1">
                                <Form.Label>PIN Code</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter PIN Code"
                                  Value={ specificSchoolData?.pin_code ? specificSchoolData?.pin_code : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                            <div className="col-md-6">
                              <Form.Group className="form-group" controlId="formpincode1">
                                <Form.Label>Area</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter PIN Code"
                                  Value={ specificSchoolData?.area ? specificSchoolData?.area : '-' }
                                  disabled
                                />
                              </Form.Group>
                            </div>
                          </div>
                      </Form>
                    </div>
              </div>
            </div>
      </div>
    </>
  )
}

export default ViewSchool
