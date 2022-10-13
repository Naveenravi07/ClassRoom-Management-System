import React, { Fragment, useEffect, useState, useContext } from 'react'
import './Alliances.css'
import { useHistory } from 'react-router-dom'
import axios from "../../axios/config"
import Modal from '../Modal/Modal'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'


function Alliances({ type }) {
    let [alcs, setAlcs] = useState([])
    let [modal, setModal] = useState(false)
    let [url, setUrl] = useState(null)
    let [toggle, setToogle] = useState(false)
    let [inv, setInv] = useState(null)
    let [spinner, setSpinner] = useState(false)
    let history = useHistory()
    let data
    let { tutor } = useContext(TutuorAuthContext)
    let { user } = useContext(AuthContext)
    let [err, setErr] = useState(false)
    let [msg, setMsg] = useState(null)

    useEffect(() => {

        if (type === "tutor") {
            if (!tutor) {
                setSpinner(true)
                setTimeout(() => {
                    setSpinner(false)
                }, 3000)
            } else {
                let parsedUser = JSON.parse(tutor)
                data = {
                    "id": parsedUser.id
                }
            }
            axios.post("/tutor/alliances", data).then((response) => {
                setAlcs(response.data)
            }).catch((err) => {
                console.log("api call err");
                console.log(err);
            })
        } else {

            if (!user) {
                setSpinner(true)
                setTimeout(() => {
                    setSpinner(false)
                }, 2000)
                setAlcs([])
            } else {
                let parsedUser = JSON.parse(user)
                data = {
                    "id": parsedUser.id
                }
                axios.post("/student/alliances", data).then((res) => {
                    console.log(res.data);
                    setAlcs(res.data)
                })
            }
        }

    }, [tutor, user])

    let handleInvite = (allianceName, id, tutorid) => {
        let data = {
            "alliance": allianceName,
            "id": id,
            "tutorid": tutorid
        }

        axios.post('/tutor/invitestudent', data).then((res) => {
            setUrl(res.data.url)
            setModal(true)
        })
    }

    let handleJoin = (e) => {
        if (inv === null) {
            e.preventDefault()
        } else {
            if (!localStorage.getItem("nova")) {
                setErr(true)

            }
            let details = {
                "student": JSON.parse(localStorage.getItem("nova")).id,
                "inv": inv
            }

            axios.post('/student/join-alliance', details).then((response) => {
                console.log(response.data);
                alcs.push(response.data[0].conf)
                setAlcs([...alcs])
            }).catch((err) => {
                console.log("err");
                console.log(err);
                setMsg(err.response)
            })
        }
        // }

    }
    return (
        <div>

            <div>
                <div className="conatiner-fluid mttop">
                    < div className="row" >
                        <div className="col-lg-6 col-xl-6 mycontainer" >
                            <img className="img img-fluid img-thumbnail imgalign" src={require("../../assets/images/alliances.jpg")} alt="Novaimg" />
                        </div>
                        <div className="col-lg-6 col-xl-6 mycontainer">
                            <div className="texthome">
                                <h2 className="text text-center">Manage your scholar activities easily</h2>
                                <p className="textpara"> Manage your students fees, classes, notes , attendence and much more </p>
                                {type === "tutor" ? <div className="btnns">
                                    <a onClick={() => history.push('/tutor/create-alliance')} className="btn btn-primary">Create allaince</a>
                                </div> : <div className="btnns">
                                    <a onClick={() => setToogle(true)} className="btn btn-primary">Join allaince</a>

                                    {
                                        toggle && <div className='alcinviteinp'>
                                            <label > Enter the invite code : </label>
                                            <input autoFocus className='inp' onChange={(e) => setInv(e.target.value)} type="text" />
                                            {msg ? <p className='alertmsg'> {msg.data}</p>:""}
                                            {err && <Modal text="You Must Login" />}
                                            <button className='joinbtn' onClick={handleJoin}> Submit</button>
                                        </div>
                                    }
                                </div>}
                            </div>


                        </div>
                    </div >
                </div >
            </div >

            <div class="container-fluid">
                {
                    modal && <Modal text={`Your Invite Code is :- ${url}`} copy={true} />
                }
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
                                            {type === "tutor" ? <th className='align-bottom invite'>Invite</th> : <Fragment />}
                                        </tr>

                                    </thead>

                                    {spinner && <Spinner animation="border" variant="danger" className='load' role="status" size='lg' />}
                                    {alcs.length > 0 ?
                                        <tbody>
                                            {
                                                alcs.map((obj, index) =>

                                                    <tr className='tablerow' key={index}>
                                                        <td onClick={() => {
                                                            console.log(obj);
                                                            type === "student" ? history.push({
                                                                pathname: '/student/view-alliance',
                                                                state: {
                                                                    id: obj._id,
                                                                    alc: obj.alliance,

                                                                }
                                                            })
                                                                : history.push({
                                                                    pathname: `/tutor/view-alliance`,
                                                                    state: {
                                                                        id: obj._id,
                                                                        alc: obj.alliance,
                                                                    }
                                                                })
                                                        }}>
                                                            <div className="user-info">
                                                                <div className="user-info__img">
                                                                    <img src={obj.url} alt=" Group Icon" />
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
                                                        {type === "tutor" ? <td>
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
                                                        </td> : <Fragment></Fragment>}
                                                    </tr>

                                                )


                                            }
                                        </tbody>
                                        : < h1 >  No Alliance</h1>}
                                </table>
                            </div>
                        </section>
                    </div>
                </div>

            </div >


            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        </div >

    )
}

export default Alliances
