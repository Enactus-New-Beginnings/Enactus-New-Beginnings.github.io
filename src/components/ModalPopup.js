import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
/**
 * @module ModalPopup
 * @function ModalPopup
 * @description Component to render a modal popup
 * @param {ModalOptions} props Functions to show and toggle Modal state, as well as JSX fields for Modal header, body, and footer
 * @returns A Modal which pops up on screen conditionally
 */
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