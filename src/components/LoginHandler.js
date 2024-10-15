import React, { useState } from "react";
import ReactGA from "react-ga4";
import { Button, Form, FormGroup, Label, Input, FormFeedback,  } from 'reactstrap';

import {firebase} from '../firebase'
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import ModalPopup from "../components/ModalPopup";

import '../styles/Profile.css'

/**
 * Component to handle login/signup. Uses Firebase for user authentication.
 * @module LoginHandler
 */
export default function Profile(){
    // const analytics=getAnalytics(firebase)

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [loginState, toggleLoginState] = useState(true);
        const [confirmPassword, setConfirmedPassword] = useState("");
        const [showForgotPasswordModal, toggleModal] = useState(false);
        const [showGeneralModal, toggleGeneralModal] = useState(false);
        const [generalModalText, setModalText] = useState("");
        const [generalModalHeader, setModalHeader] = useState("");
        const [auth] = useState(getAuth(firebase));
        const [buttonAnimation, setButtonAnimation] = useState("");
        const containerClassName = loginState ? 'login-container' : 'signup-container';

    
        /**
         * Toggles between login and signup states and applies animation.
         */
        function toggleLogin() {
            toggleLoginState(!loginState);
            setButtonAnimation(loginState ? "expand-animation" : "collapse-animation");
            setTimeout(() => {
                setButtonAnimation("");
            }, 1000);
        }
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
                        ReactGA.send({ hitType: "accountcreated", page: "newaccount" });
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
        <div className={`Login-header ${containerClassName}`}>
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
            <h1>{loginState?"Access Your Profile:":"Make Your Account:"} </h1>
            
            <div className="signup-button">
                    
                        <Button className={`circular-button ${buttonAnimation}`} onClick={toggleLogin}  >
                        <p>{loginState ? "Don't have an account?" : "Already have an account?"}</p>
                        {loginState ? "Sign Up" : "Log In"}
                    </Button>
            </div>
            <Form>
                <FormGroup className="custom-form-group">
                    <Label for="email" size="lg"></Label>
                    <Input valid={checkForValidEmail(email)} invalid={email.length>0&&!checkForValidEmail(email)} type="email" name="email" id="email" value={email} placeholder="Email" bsSize="small" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    <FormFeedback valid/>
                    <FormFeedback invalid>Please enter a valid email</FormFeedback>
                    <Label for="password" size="lg"></Label>
                    <Input valid={checkForStrongPassword(password)} invalid={password.length>0&&!checkForStrongPassword(password)} type="password" name="password" id="password" placeholder="Password" bsSize="small" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <FormFeedback valid/>
                    <FormFeedback invalid>Password must be 8+ characters long and contain one uppercase letter, lowercase letter, and number</FormFeedback>
                    {
                        !loginState?
                        <div>
                            <Label for="Confirm Password" size="lg"></Label>
                            <Input value={confirmPassword} valid={confirmPassword.length>0&&(password===confirmPassword)} invalid={confirmPassword.length>0&&(password!==confirmPassword)} type="password" name="Confirm Password" id="confirm" placeholder="Re-enter password" bsSize="small" onChange={(e) => {
                                setConfirmedPassword(e.target.value)
                            }} />
                            <FormFeedback valid/>
                            <FormFeedback invalid>Passwords do not match!</FormFeedback>
                        </div>:<></>
                    }
                    <p style={{ fontSize: 15, marginTop: '5px' }}> 
                    {loginState ? (
                         <>
                           &nbsp;Forgot password? <button className="link" type="button" onClick={() => {
                         toggleModal(true);
                        }}>Click here.</button>
                         </>
                         ) : ""}
                    </p>
                </FormGroup>
                <Button size="small" style={{ backgroundColor: '#4d7caf84', color: '#023978' }} disabled={!(checkForValidEmail(email)&&checkForStrongPassword(password))||(loginState?false:password!==confirmPassword)} className="center" onClick={()=>{
                       handleAuthentication(auth,loginState,email,password,confirmPassword)  
                }}>{loginState?"Log In":"Sign Up"}</Button>
            </Form>
            </div>
        </div>
    )
}