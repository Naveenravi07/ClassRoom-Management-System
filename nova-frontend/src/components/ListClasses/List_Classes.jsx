import React, { useEffect, useState, Fragment } from 'react'
import axios from '../../axios/config'
import "./ListClasses.css"
import { useHistory } from 'react-router-dom'

function List_Classes({ type, data }) {
    let history = useHistory()
    let obj
    let [classes, setClasses] = useState([])
    useEffect(() => {
        axios.post('/tutor/getClasses', data).then((res) => {
            setClasses(res.data)
        })
    }, [])
    return (
        <div className='bind'>
            <div className="container">
                <h1 className='classh1'>My Classes</h1>
                <br />
                <br />

                <table className="table">

                    <thead>

                        <tr className='classlist'>
                            <th className='align-bottom classlist'>Alliance</th>
                            <th className='align-bottom classlist'>Status</th>
                            <th className='align-bottom classlist'>Created At</th>
                            <th className='align-bottom classlist'>Actions</th>
                            {type === "tutor" ? <th className='align-bottom invite'>Invite</th> : <Fragment />}
                        </tr>

                    </thead>
                    <tbody>
                        {
                            classes.map((obj, index) =>
                                <tr className='tablerow' key={index}>
                                    <td >
                                        <div className="user-info">
                                            <div className="user-info__img">
                                                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt=" Group Icon" />
                                            </div>
                                            <div className="user-info__basic">
                                                <h5 className="mb-0"> {obj.tutorname} </h5>
                                                <p className="text-muted mb-0">80Students  <br />  in meeting</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="active-circle bg-success"></span> {obj.active == "true" ? "Live" : "Meeting Ended"}
                                    </td>

                                    <td> {obj.createdAt.date} </td>
                                    <td>
                                        <div className='alignadd'>
                                            <button className="btn2">JOIN</button>
                                            <button className="btn2">Delte</button>
                                        </div>
                                        <div className='iconsetting'>
                                            <span class="material-symbols-outlined">
                                                videocam
                                            </span>
                                            <span class="material-symbols-outlined spacer">
                                                delete
                                            </span>
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
                        }
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default List_Classes