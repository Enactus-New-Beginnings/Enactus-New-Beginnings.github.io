import React from "react";

import {firebase} from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

// import ModalPopup from "../components/ModalPopup";
import LoginHandler from '../components/LoginHandler'
import UserProfile from "../components/UserProfile";

import '../styles/Profile.css'

/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */
export default function Profile(){
    const [auth] = React.useState(getAuth(firebase));
    const [user, setUser] = React.useState(null)

    React.useEffect(()=>{
        onAuthStateChanged(auth, (newUser) => {
            if (newUser) {
              setUser(newUser)
            } else {
              setUser(null)
            }
          });
    }, [user, auth])
    
    return (
        <div>
            {user?<UserProfile user={user} auth={auth}/>:<LoginHandler/>}
        </div>
    )
}