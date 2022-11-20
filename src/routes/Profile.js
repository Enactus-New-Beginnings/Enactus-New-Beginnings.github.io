import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import '../styles/Profile.css'

export default function Profile(){
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [state, setState] = React.useState(true)
    const [confirmPass, setConfirmedPassword] = React.useState("")
    
    
    return (
        <div className="Profile-header">
            <div className='Login-box'>
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
                            <Input type="Confirm Password" name="Confirm Password" id="Confirm Password" placeholder="re-enter password" bsSize="lg" onChange={(e) => {
                        setConfirmedPassword(e.target.value)
                            }} />
                        </div>:<></>
                        //test
                    }
                    
                    {/* // <Label for="Confirm Password" size="lg">Confirm Password</Label>
                    // <Input type="Confirm Password" name="Confirm Password" id="Confirm Password" placeholder="confirm password" bsSize="lg" onChange={(e) => {
                        setConfirmedPassword(e.target.value)
                    }} /> */}
                    <p style={{fontSize: 15}}>
                        Forgot password? <button className="link">Click here.</button>
                        
                            
                    </p>
                    
                    
                </FormGroup>
                <Button size="lg" className="center" onClick={()=>{
                    // alert(email + "\n" + password)
                    // alert(state)
                    // if(password === confirmPass)
                    // alert(true)
                    // else
                    // alert(false)

                    if(!state)
                    {
                        if(password !== confirmPass)            //checks if password and the confirmed password match
                        alert("Passwords don't match")
                        if(password === confirmPass)
                        {
                            // alert("match")
                            
                                var length = 0
                                var upper = 0
                                var lower = 0
                                var containsNum = false
                                
                                    // var str = confirmPass

                                    for (var i = 0; i < password.length; i++)               //goes through the password and makes sure it's secure
                                                                                                //at least 8 characters
                                                                                                //at least one upper and one lower case letter
                                                                                                //at least one digit
                                    {   
                                        length++
                                        // alert(length)
                                        if(password[i] === password[i].toUpperCase())
                                        {   
                                            if(!(/[0-9]/.test(password[i])))
                                        {
                                            upper++
                                        }
                                        }
                                        if(password[i] === password[i].toLowerCase())
                                        {
                                            if(!(/[0-9]/.test(password[i])))
                                            {
                                                lower++
                                            }
                                            // alert("hi1")
                                        }
                                        if(/[0-9]/.test(password[i]))
                                        {
                                            // alert("integer")
                                            containsNum = true
                                        }
                                        // alert("hi2")
                                    }
                                    // alert(containsNum)
                                    // alert(length)
                                    // alert(upper)
                                    // alert(lower)

                                    if(length >= 8 && upper > 0 && lower > 0 && containsNum)
                                    alert("Good password")
                                    else
                                    alert("Not secure")
                                
                            
                        }
                        
                        
                        // alert("test")
                            
                    }
                    
                }}>Submit</Button>
                
            </Form>
            </div>
        </div>
    )
}