import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import Spinner from 'react-bootstrap/esm/Spinner';
import './CenterdModal.css'

function CenterdModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className="modaltitle">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4> {props.heading} {props.showloader && <Spinner animation="border" variant="danger" className='load' role="status" size='lg' />}</h4>
                <p className='modalbody'>
                    {props.body}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>{props.btnname ? props.btnname:"Close"}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CenterdModal