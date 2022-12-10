import React from "react";
import {firebase} from '../firebase'

import { Input, Button } from 'reactstrap';
import { signOut, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import '../styles/Profile.css'

/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */
export default function UserProfile(props){
    const [storage] = React.useState(getStorage(firebase));
    const [email, setEmail] = React.useState("")

    return (
        <div className='Profile-header'>
            <h1 className="white">Welcome Back, {props.user.email}!</h1>
            <div className="Top-profile-container">
                <img alt="profile pic" src="https://www.w3schools.com/howto/img_avatar.png" className="avatar"/>
                <div className="Top-profile-textCols">
                    <div className="Top-profile-textRows">
                        <Input className="spacing" inline type="email" name="newEmail" id="newEmail" placeholder="New Email" value={email}  onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                        <Button color="success" className="spacing" onClick={()=>{
                            
                            updateEmail(props.user, email).then(()=>{
                                alert("succeeded") 
                            }).catch((err)=>{
                                alert(err.message)
                            })

                        }}>Change Email</Button>
                    </div>
                    <div className="Top-profile-textRows">
                        <Input className="spacing" inline type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" />
                        <Input className="spacing" inline type="password" name="newPassword" id="newPassword" placeholder="New Password" />
                        <Button className="spacing" color="primary">Change Password</Button>
                    </div>
                </div>
            </div>
            <Button>⬆</Button>
            <Button onClick={()=>{
                signOut(props.auth)
            }}>Logout</Button>
        </div>
    )
}