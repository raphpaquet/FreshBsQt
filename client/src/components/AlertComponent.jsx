import React, { useState, useEffect } from 'react';
import './AlertComponent.css';


export default function AlertComponent(props) {
    const [modalDisplay, toggleDisplay] = useState('none');
    const openModal = () => {
        toggleDisplay('block');     
    }
    const closeModal = () => {
        toggleDisplay('none'); 
        props.hideError(null);
        toggleDisplay('hide')
    }
    useEffect(() => {
        if(props.errorMessage !== null) {
            openModal()
        } else {
            closeModal()
        }
    });
    
    return(
        <div 
            className={"alert alert-danger alert-dismissable mt-4"} 
            role="alert" 
            id="alertPopUp"
            style={{ display: modalDisplay }}
            style={{ display: 'flex' }}
        >
            <div className="d-flex alertMessage">
                <span onClick={() => closeModal()}>{props.errorMessage}</span>
            </div>
            
        </div>
    )
} 

