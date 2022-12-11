import React from "react";
import { Input, Button, FormGroup, Label, FormText, Form, Table } from 'reactstrap';

import {firebase} from '../firebase'
import { signOut, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";

import ModalPopup from "../components/ModalPopup";

import '../styles/Profile.css'
import '../styles/Resources.css'

/**
 * Renders the user signup/login page if they are not authenticated, otherwise renders the user's profile
 * @module Profile
 */
export default function UserProfile(props){
    const [storage] = React.useState(getStorage(firebase));
    const [email, setEmail] = React.useState("")

    const [showModal, toggleModal] = React.useState(false)
    const [modalText, setModalText] = React.useState("")
    const [modalHeader, setModalHeader] = React.useState("")

    const [resumeList, setResumeList] = React.useState({})
    const [refreshResumes, setRefresh] = React.useState(0)

    const [file, setFile] = React.useState();

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
        const storageRef = ref(storage, `/${props.user.uid}/resumes/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);
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
            setModalText("Your resume has been uploaded!")
            setRefresh(refreshResumes+1)
        });
    }

    function mapDataToRows(data){
            return Object.entries(data).map(vals=>{
                let key=vals[0]
                let value=vals[1]
                return (<tr>
                    <td>
                        <a target="_blank" rel="noopener noreferrer" href={value}>{key}</a>
                    </td>
                </tr>)
            })
    }

    React.useEffect(()=>{
        const listRef=ref(storage,`/${props.user.uid}/resumes`)
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
    },[props.user.uid, storage, refreshResumes])

    return (
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
            <div className="Top-profile-container">
                <img alt="profile pic" src="https://www.w3schools.com/howto/img_avatar.png" className="avatar"/>
                <h2>Welcome back, {props.user.email}!</h2>
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
                <Button color="info" onClick={()=>{
                    signOut(props.auth)
                }}>Logout</Button>
            </div>
            <div className="resume-feature-container">
                <h1 className="resumes">My Resumes</h1>
                <div className="upload-resume">
                    <Form inline>
                        <FormGroup>
                            <Label for="resumeSelect">Upload a Resume</Label>
                            <div id="resume" className="upload-resume">
                            <Input style={{width:'80%'}} type="file" id="resumeSelect" accept=".pdf" onChange={handleChange}/>
                            <Button style={{marginLeft: '2%'}} color="primary" className="uploadButton" onClick={handleUpload}>⬆ Upload</Button>
                            </div>
                            <FormText color="black">Upload a resume in .pdf format to be connected to relevant employer oppurtunities around New Jersey. Once you select a file, press the "⬆ Upload" button.</FormText>
                        </FormGroup>
                    </Form>
                </div>
                <div className="table">
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
        </div>
    )
        }
