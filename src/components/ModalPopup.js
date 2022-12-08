import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ModalPopup(props){
    return (<Modal isOpen={props.showModal} toggle={()=>{props.toggleModal()}}>
    <ModalHeader toggle={()=>{props.toggleModal()}}>{props.header}</ModalHeader>
    <ModalBody>
        {props.body}
    </ModalBody>
    <ModalFooter>
        {props.footer}
    </ModalFooter>
</Modal>)
}