import React, { useState, useContext } from 'react';
import axios from '../../axios/config'
import { AuthContext } from '../../contexts/AuthContext';
import './Signup.css';
import { useHistory } from 'react-router-dom'


function SignupComponent({ type }) {
    let history = useHistory()
    let [name, setName] = useState('')
    let [phone, setPhone] = useState('')
    let [mail, setMail] = useState('')
    let [password, setPassword] = useState('')

    let { user, setUser } = useContext(AuthContext)

    console.log(user);
    let handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            name, phone, mail, password
        }
        if (type === "student") {
            axios.post('/student/signup', data).then((userr) => {
                console.log(userr);
                localStorage.clear()
                localStorage.setItem("nova", JSON.stringify(userr.data))
                setUser(userr.data)
                history.push("/student")
            }).catch((Err) => {
                history.push("/student/signup")
            })
        } else if (type == 'tutor') {
            axios.post('/tutor/signup', data).then((tutor) => {
                console.log(tutor);
                localStorage.clear()
                localStorage.setItem("nova", JSON.stringify(tutor.data))
                setUser(tutor.data)
                history.push("/tutor")
            }).catch((Err) => {
                history.push("/tutor/signup")
            })
        }
    }
    return (
        <div>
            < div class="wrapper" >
                <div class="inner">
                    {/* < img src={require('../../assets/images/students.jpg')} alt="" class="image-1" /> */}
                    <img src={require("../../assets/images/image-1.png")} alt="img" className='image-1' />
                    <form id="signupform" >
                        <h3>Signup As A {type} </h3>
                        <div class="form-holder">
                            <span class="lnr lnr-user"></span>
                            <input type="text" class="form-control" name="name" placeholder="Name" id="signupusername" required
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div class="form-holder">
                            <span class="lnr lnr-phone-handset"></span>
                            <input type="tel" class="form-control" name="phone" placeholder="Phone Number" required
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div class="form-holder">
                            <span class="lnr lnr-envelope"></span>
                            <input type="email" class="form-control" name="email" placeholder="Mail" required
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>

                        <div class="form-holder">
                            <span class="lnr lnr-lock"></span>
                            <input type="password" class="form-control" name="password" placeholder="Password" id="pass1"
                                required
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type={'submit'} onClick={handleSubmit} id="signupbtn">
                            <span >Register</span>
                        </button>

                    </form>


                    <script src="/javascripts/script.js"></script>
                </div>

            </div>
        </div >
    )
}

export default SignupComponent
