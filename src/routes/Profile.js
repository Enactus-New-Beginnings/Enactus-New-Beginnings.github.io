import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import '../styles/Profile.css'

export default function Profile(){
    const [email, setEmail] = React.useState("")
    return (
        <div className="Profile-header">
            <div className='Login-box'>
                <h1>Log In to New Beginnings</h1>
                <p style={{textAlign:'center'}}>Don't have an account? <button className="link" >Click here</button> to sign up</p>
            <Form>
                <FormGroup>
                    <Label for="email" size="lg">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="email@example.com" bsSize="lg" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </FormGroup>
                <FormGroup>
                    <Label for="password" size="lg">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="enter password" bsSize="lg"/>
                    <p style={{fontSize: 15}}>
                        Forgot password? <button className="link">Click here.</button>
                    </p>
                </FormGroup>
                <Button size="lg" className="center" onClick={()=>{
                    alert(email)
                }}>Submit</Button>
            </Form>
            </div>
        </div>
    )
}