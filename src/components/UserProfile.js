import React from "react";
import { Input, Button } from 'reactstrap';
import { signOut } from "firebase/auth";

import '../styles/Profile.css'

/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */
export default function UserProfile(props){

    return (
        <div className='Profile-header'>
            <h1 className="white">Welcome Back, {props.user.email}!</h1>
            <div className="Top-profile-container">
                <img alt="profile pic" src="https://www.w3schools.com/howto/img_avatar.png" className="avatar"/>
                <div className="Top-profile-textCols">
                    <div className="Top-profile-textRows">
                        <Input className="spacing" inline type="email" name="newEmail" id="newEmail" placeholder="New Email" />
                        <Button color="success" className="spacing">Change Email</Button>
                    </div>
                    <div className="Top-profile-textRows">
                        <Input className="spacing" inline type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" />
                        <Input className="spacing" inline type="password" name="newPassword" id="newPassword" placeholder="New Password" />
                        <Button className="spacing" color="primary">Change Password</Button>
                    </div>
                </div>
            </div>
            <Button onClick={()=>{
                signOut(props.auth)
            }}>Logout</Button>
        </div>
    )
}