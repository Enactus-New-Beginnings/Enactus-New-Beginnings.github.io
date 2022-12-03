import React from "react";
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import {firebase} from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import '../styles/Profile.css'

export default function Profile(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [state, setState] = React.useState(true)
    const [confirmPass, setConfirmedPassword] = React.useState("")
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
                setState(!state) }}>Click here</button> to sign up</p>  
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
                        !state?
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
                    
                    if(state)
                    {
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
                    if(!state)
                    {
                        if(password !== confirmPass)            //checks if password and the confirmed password match
                            alert("Passwords don't match")
                        if(password === confirmPass){
                            let length = 0 
                            let upper = 0
                            let lower = 0
                            let containsNum = false

                            for (let i = 0; i < password.length; i++)               //goes through the password and makes sure it's secure
                            {   
                                length++
                                if(password[i] === password[i].toUpperCase())
                                {   
                                    if(!(/[0-9]/.test(password[i])))
                                        upper++
                                }
                                if(password[i] === password[i].toLowerCase())
                                {
                                    if(!(/[0-9]/.test(password[i])))
                                        lower++
                                }
                                if(/[0-9]/.test(password[i]))
                                    containsNum=true
                            }

                            if(length >= 8 && upper > 0 && lower > 0 && containsNum)
                            {
                                alert("Good password")
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
                }}>Submit</Button>
            </Form>
            </div>
        </div>
    )
}