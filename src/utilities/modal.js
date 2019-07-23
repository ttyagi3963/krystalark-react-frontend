import React, {Component,Fragment} from 'react';
import './modal.css'
import Modal from 'react-bootstrap/Modal';



const popModal =(props)=>{
  
    return(

        <Modal
            show={props.modalShow}
            onHide ={props.handleClose}
            id={props.modalId} 
            tabIndex="-1" 
            animation= 'true'
            aria-labelledby={props.modalId} 
            aria-hidden="true"
            backdrop={props.disableBackClick}
            centered
            >
                <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {props.heading}
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
                
        </Modal>

        
    )
}
export default popModal;