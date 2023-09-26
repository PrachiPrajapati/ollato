import React from 'react'
import { Form } from 'react-bootstrap'
import notification from '../../assets/images/notification.svg'
import profile from '../../assets/images/profile.png'

function Header (props) {
  const handleChange = (e) => {
    const value = e.target.value
    // eslint-disable-next-line react/prop-types
    props?.parentCallback(value)
  }
  return (
    <>
        <header className="header-section">
            <div className="search-box">
                <Form>
                    <Form.Group className="form-group mb-0" controlId="formsearch">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                </Form>
            </div>
            <div className="profile-info">
                <button type='button' className="notification-box"><img src={notification} alt="" /></button>
                <button className="profile-box">
                    <img src={profile} alt="" />
                    <h6>Jacob Jones</h6>
                </button>
            </div>
        </header>
    </>
  )
}

export default Header
