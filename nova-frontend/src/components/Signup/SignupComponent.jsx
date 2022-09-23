import React, { useState, useContext, useEffect } from 'react';
import axios from '../../axios/config'
import { AuthContext } from '../../contexts/AuthContext';
import './Signup.css';
import { useHistory } from 'react-router-dom'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'


function SignupComponent({ type }) {
    useEffect(() => {
        if (type === "student") {
            if (localStorage.getItem("nova")) {
                history.goBack()
            }
        } else {
            if (localStorage.getItem("tutor") !== null) {
                history.goBack()
            }
        }
    }, [])

    let history = useHistory()
    let [name, setName] = useState('')
    let [phone, setPhone] = useState('')
    let [mail, setMail] = useState('')
    let [password, setPassword] = useState('')
    let [err, setErr] = useState(null)
    let { setUser } = useContext(AuthContext)
    let { setTutor } = useContext(TutuorAuthContext)

    let redirectToLogin = () => {
        type === "student" ? history.push('/student/login') : history.push("/tutor/login")
    }

    let handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            name, phone, mail, password
        }
        if (type === "student") {
            axios.post('/student/signup', data).then((userr) => {
                console.log(userr);
                localStorage.setItem("nova", JSON.stringify(userr.data))
                setUser(JSON.stringify(userr.data))
                history.push("/student")
            }).catch((Err) => {
                if (Err.response) {
                    console.log(Err.response);
                    setErr(Err.response)
                }
            })
        } else if (type === 'tutor') {
            axios.post('/tutor/signup', data).then((tutorr) => {
                console.log(tutorr);
                localStorage.setItem("tutor", JSON.stringify(tutorr.data))
                setTutor(JSON.stringify(tutorr.data))
                history.push("/tutor")
            }).catch((Err) => {
                if (Err.response) {
                    console.log(Err.response);
                    setErr(Err.response)
                }
            })
        }
    }
    return (
        <div>
            < div className="wrapper" >
                <div className="inner">
                    {/* < img src={require('../../assets/images/students.jpg')} alt="" class="image-1" /> */}
                    <img src={require("../../assets/images/image-1.png")} alt="img" className='image-1' />
                    <form id="signupform" >
                        <h3>Signup As A {type} </h3>
                        <div className="form-holder">
                            <span className="lnr lnr-user"></span>
                            <input type="text" className="form-control" name="name" placeholder="Name" id="signupusername" required
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-holder">
                            <span className="lnr lnr-phone-handset"></span>
                            <input type="tel" className="form-control" name="phone" placeholder="Phone Number" required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-holder">
                            <span className="lnr lnr-envelope"></span>
                            <input type="email" className="form-control" name="email" placeholder="Mail" required
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>

                        <div className="form-holder">
                            <span className="lnr lnr-lock"></span>
                            <input type="password" className="form-control" name="password" placeholder="Password" id="pass1"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type={'submit'} onClick={handleSubmit} className='signupbtn' id="signupbtn">
                            <span >Register</span>
                        </button>
                        {err ? <p className='errmsg'> {err.data}</p> : ""}
                        <div className="text-center p-t-136 createacc">
                            <a className="txt2" onClick={redirectToLogin} >
                               Already Have An Account ?
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                            </a>
                        </div>
                    </form>


                    <script src="/javascripts/script.js"></script>
                </div>

            </div>
        </div >
    )
}

export default SignupComponent
