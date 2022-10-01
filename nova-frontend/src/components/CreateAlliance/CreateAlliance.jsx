import React, { useState, useEffect, useContext } from 'react'
import axios from '../../axios/config'
import './CreateAlliance.css'
import { useHistory } from 'react-router-dom'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'
import firebase from '../../firebase/config'

function CreateAlliance() {
    let { tutor, setTutor } = useContext(TutuorAuthContext)

    useEffect(() => {
        if (!tutor) {
            history.push('/tutor/login')
        }
    }, [])

    let parsedUser = JSON.parse(tutor)
    console.log(tutor);

    let history = useHistory()
    let [fname, setFname] = useState(parsedUser && parsedUser.name)
    let [alc, setAlc] = useState("")
    let [phone, setPhone] = useState("")
    let [lname, setLname] = useState("")
    let [email, setEmail] = useState("")
    let [image, setImage] = useState(null)
    let id
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', image, id)

        let details = {
            "firstname": fname,
            "lastname": lname,
            "alliance": alc,
            "email": email,
            "phone": phone,
            "tutorid": parsedUser.id
        }
      
        firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
            ref.getDownloadURL().then((url) => {
                details.url = url
                axios.post('/tutor/create-alliance', details).then((response) => {
                    console.log(response);
                    history.push("/tutor/alliances")
                })
            })
        }).catch((err) => {
            history.push("/tutor/create-alliance")
        })

    }
    return (
        <form>
            <h3>Create Alliance</h3>
            <div className="mb-3">
                <label>First name</label>
                <input
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    type={"text"}
                    className="form-control"
                    placeholder="First name"
                />
            </div>
            <div className="mb-3">
                <label>Last name</label>
                <input
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    type={"text"} className="form-control" placeholder="Last name" />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type={"email"}
                    className="form-control"
                    placeholder="Enter email"
                />
            </div>
            <div className="mb-3">
                <label>Alliance Name</label>
                <input
                    value={alc}
                    onChange={(e) => setAlc(e.target.value)}
                    type={"text"}
                    className="form-control"
                    placeholder="Enter Name Of Your Alliance"
                />
            </div>
            <div className="mb-3">
                <label>Phone No</label>
                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type={"tel"}
                    className="form-control"
                    placeholder="Enter Phone Number"
                />
            </div>

            <div class="form-group">

                <div class="form-input">
                    <label for="chequeno">Profile Image</label>
                    <input onChange={(e) => setImage(e.target.files[0])}
                        type={"file"} name="image" id="chequeno" required />
                </div>

            </div>
            <div className="d-grid">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default CreateAlliance
