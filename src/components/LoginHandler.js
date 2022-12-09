import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {firebase} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import ModalPopup from "../components/ModalPopup";

import '../styles/Profile.css'

/**
 * Component to handle login/signup. Uses Firebase for user authentication.
 * @module LoginHandler
 */
export default function Profile(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [loginState, toggleLoginState] = React.useState(true)
    const [confirmPassword, setConfirmedPassword] = React.useState("")
    const [showForgotPasswordModal, toggleModal] = React.useState(false);

    const [showGeneralModal, toggleGeneralModal] = React.useState(false);
    const [generalModalText, setModalText] = React.useState("")
    const [generalModalHeader, setModalHeader] = React.useState("")

    const [auth] = React.useState(getAuth(firebase));
    
    /**
     * Checks whether a password is secure: in this case, whether it is at least 8 characters long and contains at least one uppercase letter, lowercase letter and number
     * @function checkForStrongPassword
     * @param {string} password Password to check
     * @returns boolean value of whether or not password is secure
     */
    function checkForStrongPassword(password){
        return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password)
    }

    /**
     * Checks whether a string is in a valid email format: s1@s2.s3, where s1, s2 and s3 are strings.
     * @function checkForValidEmail
     * @param {string} email Email string to check
     * @returns boolean value of whether string is a valid email address
     */
    function checkForValidEmail(email){
        return email.split("@").length===2 && email.split("@")[1].split(".").length===2
    }

    /**
     * Handles user authentication: attempts to login with Firebase if client is in login state, otherwise tries to sign them up if password is secure.
     * @function handleAuthentication
     */
    function handleAuthentication(){
        if(loginState) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
            })
            .catch((error) => {
                const errorMessage = error.message;
                generateModal("Sign In Failed", errorMessage)
            })
        }
        else {
            if(password !== confirmPassword)
                generateModal("Passwords Don't Match!", "Please ensure \"Password\" and \"Confirm password\" fields are the same.")
            else {
                if(checkForStrongPassword(password)) {
                    createUserWithEmailAndPassword(auth, email, password)
                    .then(() => {
                    })
                    .catch((error) => {
                        const errorMessage = error.message;
                        generateModal("Sign Up Failed", errorMessage)
                    })
                }
                else
                    generateModal("Password Not Secure!", "Please ensure your password is at least eight characters long and contains at least one uppercase letter, one lowercase letter, and one number.")
            }   
        }     
    }

    /**
     * Shows a pop up modal with a given header and body text
     * @function generateModal
     * @param {string} header Header text
     * @param {string} body Body text
     */
    function generateModal(header, body){
        toggleGeneralModal(true)
        setModalHeader(header)
        setModalText(body)
    }
    
    return (
        <div className="Login-header">
        <div className='Login-box'>
            <ModalPopup showModal={showForgotPasswordModal} toggleModal={()=>{toggleModal(!showForgotPasswordModal)}}
             header={"Forgot Password?"} 
             body={<div>
                <p>Enter the email address you made your account with and press submit to receive a password reset email.</p>
                <Form>
                    <FormGroup>
                      <Input type="email" placeholder="example@email.com" value={email}  onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    </FormGroup>
                </Form>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{
                    if(checkForValidEmail(email)){
                        sendPasswordResetEmail(auth,email).then(()=>{
                            generateModal("Check Your Inbox", "If we have your email on file, we'll send a password reset email shortly.")  
                        }).catch((err)=>{
                            generateModal("Something went wrong", err.message)
                        })
                    } else{
                        generateModal("Invalid Email", "Please make sure the inputted email is valid.")
                    }
                }}>Submit</Button>{' '}
                <Button color="secondary" onClick={()=>{toggleModal(!showForgotPasswordModal)}}>Cancel</Button>
            </div>
            }/>
            <ModalPopup showModal={showGeneralModal} toggleModal={()=>{toggleGeneralModal(!showGeneralModal)}}
             header={generalModalHeader} 
             body={<div>
                <p>{generalModalText}</p>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{toggleGeneralModal(!showGeneralModal)}}>OK</Button>
            </div>
            }/>
            <h1>{loginState?"Log In to":"Sign Up For"} New Beginnings</h1>
            <p style={{textAlign:'center'}}>{loginState?"Don't have an account?":"Already have an account?"} <button className="link" onClick={() =>{ 
                toggleLoginState(!loginState) }}>Click here</button> to {loginState?"sign up":"log in"}</p>  
            <Form>
                <FormGroup>
                    <Label for="email" size="lg">Email</Label>
                    <Input type="email" name="email" id="email" value={email} placeholder="email@example.com" bsSize="lg" onChange={(e) => {
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