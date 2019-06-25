import React, {Component,Fragment} from 'react';
import './modal.css'

const popModal =(props)=>{
    let styles = props.modalVisible
      ? { display: "block" }
      : { display: "none" };
    return(
        <div id={props.modalId} 
           
            className={`modal fade popModal ${props.modalVisible ? 'show' : ''}`} 
            role="dialog" 
            style={styles}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{props.heading}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                        
                        </div>
                    </div>
        </div>
    )
}
export default popModal;