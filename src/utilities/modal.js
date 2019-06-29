import React, {Component,Fragment} from 'react';
import './modal.css'

const popModal =(props)=>{
   
    return(

        <div className="modal fade" 
            id={props.modalId} 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true"
            data-backdrop={props.disableBackClick}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title" id="exampleModalLabel">{props.heading}</h3>
                            {props.showClose === 1 ?
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                :
                                null
                            }
                        
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