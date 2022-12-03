import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {firebase} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import '../styles/Profile.css'

/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */
export default function Profile(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loginState, toggleLoginState] = React.useState(true)
    const [confirmPassword, setConfirmedPassword] = React.useState("")
    const [showForgotPasswordModal, toggleModal] = React.useState(false);
    const [auth] = React.useState(getAuth(firebase));
    
    return (
        <div className="Profile-header">
            <div className='Login-box'>
            <Modal isOpen={showForgotPasswordModal} toggle={()=>{toggleModal(!showForgotPasswordModal)}}>
                <ModalHeader toggle={()=>{toggleModal(!showForgotPasswordModal)}}>Modal title</ModalHeader>
                <ModalBody>
                    Text
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" >Submit</Button>{' '}
                    <Button color="secondary" onClick={()=>{toggleModal(!showForgotPasswordModal)}}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <h1>Log In to New Beginnings</h1>
            <p style={{textAlign:'center'}}>Don't have an account? <button className="link" onClick={() =>{ 
                toggleLoginState(!loginState) }}>Click here</button> to sign up</p>  
            <Form>
                <FormGroup>
                    <Label for="email" size="lg">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="email@example.com" bsSize="lg" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password" size="lg">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="enter password" bsSize="lg" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    {
                        !loginState?
                        <div>
                            <Label for="Confirm Password" size="lg">Confirm Password</Label>
                            <Input type="password" name="Confirm Password" id="confirm" placeholder="re-enter password" bsSize="lg" onChange={(e) => {
                                setConfirmedPassword(e.target.value)
                            }} />
                        </div>:<></>
                    }
                    <p style={{fontSize: 15}}>
                        Forgot password? <button className="link" type="button" onClick={()=>{
                            toggleModal(true)
                        }}>Click here.</button>    
                    </p>
                </FormGroup>
                <Button size="lg" className="center" onClick={()=>{
                       handleAuthentication(auth,loginState,email,password,confirmPassword)  
                }}>Submit</Button>
            </Form>
            </div>
        </div>
    )
}

/**
 * Checks whether a password is secure: in this case, whether it is at least 8 characters long and contains at least one uppercase letter, lowercase letter and number
 * @param {string} password Password to check
 * @returns boolean value of whether or not password is secure
 */
 function checkForStrongPassword(password){
    return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
}
/**
 * Handles user authentication: attempts to login with Firebase if client is in login state, otherwise tries to sign them up if password is secure.
 * @param {Auth} auth Firebase auth object
 * @param {boolean} loginState True if in loginflow, false otherwise
 * @param {string} email User inputted email
 * @param {string} password User inputted password
 * @param {string} confirmPassword User inputted "confirm password"
 */
function handleAuthentication(auth, loginState, email, password, confirmPassword){
    if(loginState) {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    }
    else {
        if(password !== confirmPassword)
            alert("Passwords don't match")
        else {
            if(checkForStrongPassword(password)) {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                })
            }
            else
                alert("Not secure")
        }   
    }     
}