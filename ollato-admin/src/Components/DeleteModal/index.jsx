import React from 'react'
import { Modal } from 'react-bootstrap'

const Index = (props) => {
    return (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            <Modal show={props.show} onHide={props.handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <div className="title-box has-subtitle">
                        <h2>Delete </h2>
                        <h4>Are you sure to delete this?</h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className='theme-btn w-100 red-btn'>
                        Delete
                    </button>
                    <button type="submit" className='theme-btn w-100 gray-btn'>
                        Cancel
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Index
