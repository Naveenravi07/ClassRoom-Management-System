import React, { useEffect, useState, Fragment, useContext } from 'react'
import axios from '../../axios/config'
import "./ListClasses.css"
import Spinner from 'react-bootstrap/Spinner'
import { AuthContext } from '../../contexts/AuthContext'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'
import Alert from 'react-bootstrap/Alert';
import { useHistory } from 'react-router-dom'

function List_Classes({ type, data }) {

    // Data prop contains info about the alliance

    let [classes, setClasses] = useState([])
    let [loading, setLoading] = useState(true)
    let [err, setErr] = useState(null)

    let { user } = useContext(AuthContext)
    let { tutor } = useContext(TutuorAuthContext)

    let history = useHistory()
    let handleClassJoin = (classid, owner) => {
        console.log(classid);
        history.push({
            pathname: `/classes/${classid}`,
            state: {
                "id": classid,
                "owner": owner,
                "type": type
            }
        })
    }

    useEffect(() => {

        if (type === "tutor") {
            axios.post('/tutor/getClasses', data).then((res) => {
                setClasses(res.data)
                setLoading(false)
            }).catch((Err) => {
                setErr("Ooops Somethng went wrong ")
            })

        } else if (type === "student") {
            console.log(data);
            axios.post('/student/getClasses', data).then((res) => {
                console.log(res.data);
                setClasses(res.data)
                setLoading(false)
            }).catch((Err) => {
                setErr("Ooops Somethng went wrong ")
            })
        }
    }, [user, tutor])

    return (
        <div className='bind'>
            <div className="container">
                <h1 className='classh1'>My Classes</h1>
                <br />
                <br />
                {user || tutor ?
                    <table className="table">

                        <thead>

                            <tr className='classlist'>
                                <th className='align-bottom classlist'>Alliance</th>
                                <th className='align-bottom classlist'>Status</th>
                                <th className='align-bottom classlist'>Created At</th>
                                <th className='align-bottom classlist'>Actions</th>
                                {type === "tutor" ? <th className='align-bottom invite'>Others</th> : <Fragment />}
                            </tr>

                        </thead>
                        <tbody>
                            {loading ? <Spinner animation="border" variant="danger" className='load' role="status" size='lg' /> : ""}

                            {user || tutor ?
                                classes.map((obj, index) =>

                                    <tr className='tablerow listtablerow' key={index}>
                                        <td >
                                            <div className="user-info">
                                                <div className="user-info__img">
                                                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" Group Icon" />
                                                </div>
                                                <div className="user-info__basic">
                                                    <h5 className="mb-0"> {obj.tutorname} </h5>

                                                    <p className="text-muted mb-0">{obj.students.length}  Students <br />  in meeting</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="active-circle bg-success"></span> {obj.active === "true" ? "Live" : "Meeting Ended"}
                                        </td>

                                        <td> {obj.createdAt.date}
                                            <br />
                                            {obj.timeString}
                                        </td>
                                        <td>
                                            <div className='alignadd'>
                                                <button onClick={() => handleClassJoin(obj._id, obj.tutor)} className="btn2">JOIN</button>  </div>


                                            <div className='iconsetting'>
                                                <span class="material-symbols-outlined">
                                                    videocam
                                                </span>
                                                {type === "tutor" && <span class="material-symbols-outlined spacer">
                                                    delete
                                                </span>}
                                            </div>
                                        </td>
                                        {type === "tutor" ? <td>
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
                                        </td> : ""}
                                    </tr>

                                )
                                : ""}
                            {err ? <Alert variant='danger'>{err}</Alert> : ""}
                        </tbody>

                    </table> : < Alert variant='primary' > You need to be in an alliance</Alert>}
            </div>

        </div >
    )
}

export default List_Classes