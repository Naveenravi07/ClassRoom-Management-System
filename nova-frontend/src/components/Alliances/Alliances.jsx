import React, { useEffect, useContext, useState } from 'react'
import './Alliances.css'
import { useHistory } from 'react-router-dom'
import axios from "../../axios/config"


function Alliances() {
    let [alcs, setAlcs] = useState([])
    let history = useHistory()

    let tutor = localStorage.getItem("tutor")
    let parsedUser = JSON.parse(tutor)
    let data = {
        "id": parsedUser.id
    }

    useEffect(() => {
        axios.post("/tutor/alliances", data).then((response) => {
            setAlcs(response.data)
        }).catch((err) => {
            console.log("api call err");
            console.log(err);
        })
    }, [])

    let handleInvite = (allianceName, id, tutorid) => {
        let data = {
            "alliance": allianceName,
            "id": id,
            "tutorid": tutorid
        }
        console.log(data);

        axios.post('/tutor/invitestudent', data).then((res) => {
            console.log(res);
        })
    }
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
                                <div className="btnns">
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
                                    {alcs.length > 0 ?
                                        <tbody>
                                            {

                                                alcs.map((obj, index) =>
                                                    <tr>
                                                        <td>
                                                            <div className="user-info">
                                                                <div className="user-info__img">
                                                                    <img src="https://preview.redd.it/5vro0cwvl9m31.jpg?width=720&format=pjpg&auto=webp&s=b552d48fcc46a739fd412efa91cc4ff82a630c63" alt=" Group Icon" />
                                                                </div>
                                                                <div className="user-info__basic">
                                                                    <h5 className="mb-0"> {obj.alliance} </h5>
                                                                    <p className="text-muted mb-0"> {obj.studentscount} Students </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="active-circle bg-success"></span> Active
                                                        </td>

                                                        <td> {obj.createdAt} </td>
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
                                                                <button onClick={() => handleInvite(`${obj.alliance}`, `${obj._id}`, `${obj.tutorid}`)} className='btn2' >
                                                                    Invite
                                                                </button>
                                                            </div>

                                                            <div className='iconsetting'>
                                                                <span class="material-symbols-outlined">
                                                                    group_add
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )

                                            }
                                        </tbody>
                                        : <h1>No Alliace</h1>}
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
