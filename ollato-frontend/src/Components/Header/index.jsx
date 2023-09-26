import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'

/* React Packages */
import { useSelector } from 'react-redux'

/* Images */
import notification from '../../assets/images/notification.svg'
import profile from '../../assets/images/profile.png'

function Header (props) {
  const [searchValue, setsearchValue] = useState('')
  const handleChange = (e) => {
    const value = e.target.value
    setsearchValue(value)
  }
  const userInfoData = useSelector(state => state.auth.userData)
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (props?.parentCallback) {
      // eslint-disable-next-line react/prop-types
      props?.parentCallback(searchValue)
    }
  }, [searchValue])

  return (
    <>
        <header className="header-section">
            <div className="search-box">
                <Form>
                    <Form.Group className="form-group mb-0" controlId="formsearch">
                        <Form.Control type="search" placeholder="Search"
                          onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="profile-info">
                <button type='button' className="notification-box"><img src={notification} alt="" /></button>
                <button className="profile-box">
                    <img src={profile} alt="" />
                    <h6>{userInfoData?.user_name || ''}</h6>
                </button>
            </div>
        </header>
    </>
  )
}

export default Header
