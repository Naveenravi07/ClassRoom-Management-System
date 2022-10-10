import React, { useContext } from 'react'
import axios from '../../axios/config'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'
import { useHistory } from 'react-router-dom'
import './Create_Class.css'


function Create_Class() {
    let history = useHistory()
    let { tutor } = useContext(TutuorAuthContext)
    tutor = JSON.parse(tutor)
    let data
    if (tutor) {
        data = {
            "id": tutor.id
        }
    }
    let handleNewMeeting = () => {
        axios.post('/tutor/create-class', data).then((res) => {

        })
    }
    return (
        <div className='container'>
            <div className='row row2'>
                <div className='col-lg-6 col-xl-6'>
                    <img className='' src={require("../../assets/images/create-class.png")} alt="OnlineTeching Img" />
                </div>

                <div className='col-lg-6 col-xl-6'>
                    <h2 className='meettext'>Premium Video Meetings Now Free For Everyone</h2>
                    <p className='paratext'>
                        We re-engineered the service that we built for secure business meetings, Google Meet, to make it free and available for all.
                    </p>

                    <button onClick={handleNewMeeting} className='newmeetbtn'>New Meeting</button>

                </div>
            </div>
        </div>
    )
}

export default Create_Class
