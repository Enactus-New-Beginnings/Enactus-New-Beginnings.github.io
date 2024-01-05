import React from "react";
import { Input, Button, FormGroup, FormText, Form, Table, ButtonGroup } from 'reactstrap';

import {firebase} from '../firebase'
import { signOut, updateEmail, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, listAll, deleteObject} from "firebase/storage";

import {getDatabase, ref as dbRef, set, child, get} from "firebase/database"

import ModalPopup from "../components/ModalPopup";

import '../styles/Profile.css'
import '../styles/Resources.css'



/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */

export default function UserProfile(props){
    const db = getDatabase(firebase);
    const [storage] = React.useState(getStorage(firebase));

    const [email, setEmail] = React.useState("")
    const [oldPassword, setOldPassword] = React.useState("")
    const [newPassword, setNewPassword] = React.useState("")

    const [showModal, toggleModal] = React.useState(false)
    const [modalText, setModalText] = React.useState("")
    const [modalHeader, setModalHeader] = React.useState("")

    const [resumeList, setResumeList] = React.useState({})
    const [refreshResumes, setRefresh] = React.useState(0)

    const [profileOption, setProfileOption] = React.useState("settings")

    const [file, setFile] = React.useState();

    const [currRes, setCurrent] = React.useState("")

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            toggleModal(true)
            setModalHeader("File Not Found")
            setModalText("Please choose a file first!")
        }
        const storageRefr = storageRef(storage, `/${props.user.uid}/resumes/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRefr, file);
        toggleModal(true)
        setModalHeader("File Upload In Progress...")
        uploadTask.on('state_changed', (snapshot) =>{
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setModalText('Upload is ' + progress + '% done');
        },
        (err) => setModalText(err),
        () => {
            toggleModal(true)
            setModalHeader("File Upload Complete")
            setCurrentResume(file.name)
            setModalText("Your resume has been uploaded!")
            setRefresh(refreshResumes+1)
        });
    }

    function setCurrentResume(name){
        set(dbRef(db, 'users/'+props.user.uid+'/resumes/current'), name).then(()=>{console.log("success")}).catch((error)=>{console.log(error)});
    }

    function mapDataToRows(data){
            return Object.entries(data).map(vals=>{
                let key=vals[0]
                let value=vals[1]
                return (<tr>
                    <td>
                        <a target="_blank" rel="noopener noreferrer" href={value}>{key}</a> 
                        <Button style={{marginLeft: '2%'}} color="primary" className="deleteButton" onClick={()=>removeResume(key,value)}>Remove</Button>
                    </td>
                </tr>)
            })
    }

    function removeResume(resumeName,resumeLink){
        // in mapDataToRows function, 'value' stores the link to the document in firebase. key stores the name of the file
        const desertRef = storageRef(storage, resumeLink);

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            toggleModal(true)
            setModalHeader("File Deleted")
            setModalText("Your resume has been removed!")
            setRefresh(refreshResumes+1)
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

        set(dbRef(db, 'users/'+props.user.uid+'/resumes/current'), null)
          .then(() => {
            // Data deleted successfully!
            console.log("successful delete")
          })
          .catch((error) => {
            // The delete failed...
            console.log(error)
          });
    }

    React.useEffect(()=>{
        const listRef = storageRef(storage,`/${props.user.uid}/resumes`)
        const dbr = dbRef(db)
        const promises=[]
        let newObj={}
        listAll(listRef).then((res)=>{
            res.items.forEach(itemRef=>{
                promises.push(getDownloadURL(itemRef).then((url)=>{
                    return {[itemRef.name]:url}
                }))
            })
            Promise.all(promises).then((resumeElements)=>{
                resumeElements.forEach(resumeElement=>{
                    newObj={...newObj, ...resumeElement}
                })
                setResumeList(newObj)
                console.log(newObj)
            })
        })
        get(child(dbr,'users/'+props.user.uid+'/resumes/current')).then((snapshot) =>{
            if(snapshot.exists()){
                setCurrent(snapshot.val())
            } else {
                console.log("No data available")
            }  
        })

    },[props.user.uid, storage, db, refreshResumes])

    return (
        <div>
        <div className='Profile-header'>
            <ModalPopup showModal={showModal} toggleModal={()=>{toggleModal(!showModal)}}
             header={modalHeader} 
             body={<div>
                <p>{modalText}</p>
            </div>
            }
            footer={<div>
                <Button color="primary" onClick={()=>{
                    toggleModal(!showModal)
                }}>OK</Button>
            </div>
            }/>
            <h2>Welcome back, {props.user.email}!</h2>
            <button className="link" onClick={()=>{signOut(props.auth)}}>(Click here to log out)</button>
            </div>
            <div>
                <ButtonGroup style={{marginLeft: '1.5%', marginTop: '1%', marginBottom: '1%'}}>
                    <Button active={profileOption==='settings'} onClick={()=>{setProfileOption('settings')}}>Settings</Button>
                    <Button active={profileOption==='resumes'} onClick={()=>{setProfileOption('resumes')}}>My Resumes</Button>
                </ButtonGroup>
                {
                    profileOption==='settings'?<div style={{marginLeft: '1.5%', marginRight: '1.5%'}}>
                    <h3>Account Settings</h3>
                    <hr/>
                    <h5>Change your Email</h5>
                    <p>You will be sent a confirmation to your new Email.</p>
                    <div className="Top-profile-textRows">
                        <Input autoComplete="off" style={{marginRight: '1.5%', marginBottom: '1%'}} inline type="email" name="newEmail" id="newEmail" placeholder="New Email" value={email}  onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                        <Button size="lg" style={{marginBottom: '1%'}} color="success" onClick={()=>{
                            if(email.length>0){
                                updateEmail(props.user, email).then(()=>{
                                    toggleModal(true)
                                    setModalHeader("Success")
                                    setModalText("Your email has been changed!")
                                }).catch((err)=>{
                                    toggleModal(true)
                                    setModalHeader("Something Went Wrong")
                                    setModalText(err.message)
                                })
                            } else{
                                toggleModal(true)
                                setModalHeader("Something Went Wrong")
                                setModalText("Email address must be non-empty!")
                            }
                            
                        }}>Confirm</Button>
                    </div>
                    <h5>Change your Password</h5>
                    <p>Please enter your current password in the appropriate box, then set a new password. New password must contain at least one of each: uppercase letter, lowercase letter, number.</p>
                    <div className="Top-profile-textRows">
                        <Input autoComplete="off" inline type="password" name="currentPassword" id="currentPassword" placeholder="Current Password" value={oldPassword}  onChange={(e) => {
                        setOldPassword(e.target.value)
                    }}/>
                        <Input autoComplete="off" style={{marginLeft: '1.5%'}} inline type="password" name="newPassword" id="newPassword" placeholder="New Password" value={newPassword}  onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}/>
                        <Button size="lg" style={{marginLeft: '1.5%'}} color="primary" onClick={()=>{
                            const credential = EmailAuthProvider.credential(props.auth.currentUser.email,oldPassword)
                            reauthenticateWithCredential(props.user, credential).then(() => 
                            { updatePassword(props.user, newPassword).then(()=> {
                                toggleModal(true)
                                setModalHeader("Password Changed")
                                setModalText("Your Password has been Successfully Changed")})
                            
                            }).catch((error) => {
                                toggleModal(true)
                                setModalHeader("Something Went Wrong")
                                setModalText(error.message)
                            });
                            }}>Confirm</Button>
                    </div>
                </div>: <div><div style={{marginLeft: '1.5%'}}>
                <h3>Upload a Resume</h3>
                  <hr/>
                    <Form inline>
                        <FormGroup>
                            <div id="resume" className="upload-resume">
                            <Input style={{width:'80%'}} type="file" id="resumeSelect" accept=".pdf" onChange={handleChange}/>
                            <Button style={{marginLeft: '2%'}} color="primary" className="uploadButton" onClick={handleUpload}>⬆ Upload</Button>
                            </div>
                            <FormText color="black">Upload a resume in .pdf format to be connected to relevant employer oppurtunities around New Jersey. Once you select a file, press the "⬆ Upload" button.</FormText>
                        </FormGroup>
                    </Form>
                </div>
                <div className="resume-table">

                <h3>My Resumes</h3>
                <p>Current Resume: {currRes} </p>
                <hr/>
                    <Table striped bordered responsive>
                        <thead>
                        <tr>
                            <th>
                                Past Resumes
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                mapDataToRows(resumeList)
                            }
                        </tbody>
                    </Table>
                    </div>
                </div>
                }
           </div>
        </div>
    )
}
