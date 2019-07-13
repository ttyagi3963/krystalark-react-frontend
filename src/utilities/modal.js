import React, {Component,Fragment} from 'react';
import './modal.css'
import Modal from 'react-bootstrap/Modal'
const popModal =(props)=>{
   
    return(

        <Modal
            id={props.modalId} 
            tabIndex="-1" 
            animation= 'true'
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            data-backdrop={props.disableBackClick}
            centered
            >
                <Modal.Header>
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