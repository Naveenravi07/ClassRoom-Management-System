import React, { useEffect, useContext, useState } from 'react'
import './Alliances.css'
import { useHistory } from 'react-router-dom'
import axios from "../../axios/config"
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'

function Alliances() {
    let [alcs, setAlcs] = useState([])
    let history = useHistory()

    // getting tutor global state
    let { tutor, setTutor } = useContext(TutuorAuthContext)
    console.log("itutor" + tutor);
    let parsedUser = JSON.parse(tutor)
    console.log(parsedUser.id);
    
    let data = {
        "id": parsedUser.id
    }
    useEffect(() => {

        axios.post("/tutor/alliances", data).then((response) => {
            console.log(response.data);
            setAlcs(response.data)
        }).catch((err) => {
            console.log("api call err");
            console.log(err);
        })

    }, [])


    return (
        <div>
            <div>
                <div className="conatiner-fluid mttop">
                    <div className="row">
                        <div className="col-lg-6 col-xl-6 mycontainer" >
                            <img className="img img-fluid img-thumbnail imgalign" src={require("../../assets/images/alliances.jpg")} alt="Novaimg" />
                        </div>
                        <div className="col-lg-6 col-xl-6 mycontainer">
                            <div className="texthome">
                                <h2 className="text text-center">Manage your scholar activities easily</h2>
                                <p className="textpara"> Manage your students fees, classes, notes , attendence and much more </p>
                                <div class="btnns">
                                    <a onClick={() => history.push('/tutor/create-alliance')} className="btn btn-primary">Create allaince</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid">

                <div className="row">
                    <div className="col-xl-12 addoverflow" >
                        <section className="main-content">
                            <div className="container">
                                <h1>My Alliances</h1>
                                <br />
                                <br />

                                <table className="table">

                                    <thead>

                                        <tr>
                                            <th className='align-bottom'>Alliance</th>
                                            <th className='align-bottom'>Status</th>
                                            <th className='align-bottom'>Created At</th>
                                            <th className='align-bottom'>Actions</th>
                                            <th className='align-bottom invite'>Invite</th>
                                        </tr>

                                    </thead>

                                    <tbody>
                                        {alcs.length > 0 ?
                                            <tr>
                                                <td>
                                                    <div className="user-info">
                                                        <div className="user-info__img">
                                                            <img src="https://preview.redd.it/5vro0cwvl9m31.jpg?width=720&format=pjpg&auto=webp&s=b552d48fcc46a739fd412efa91cc4ff82a630c63" alt=" Group Icon" />
                                                        </div>
                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0"> Hii</h5>
                                                            <p className="text-muted mb-0"> 60 Students </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="active-circle bg-success"></span> Active
                                                </td>

                                                <td> Ravi </td>
                                                <td>
                                                    <div className='alignadd'>
                                                        <button className="btn2">Manage</button>
                                                    </div>
                                                    <div className='iconsetting'>
                                                        <span class="material-symbols-outlined">
                                                            settings
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='alignadd'>
                                                        <button className='btn2' >
                                                            Invite
                                                        </button>
                                                    </div>

                                                    <div className='iconsetting'>
                                                        <span class="material-symbols-outlined">
                                                            group_add
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr> : <h1>No Alliace</h1>}

                                    </tbody>

                                </table>
                            </div>
                        </section>
                    </div>
                </div>

            </div>


            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        </div>

    )
}

export default Alliances
