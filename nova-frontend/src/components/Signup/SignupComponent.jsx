import React, { useState, useContext } from 'react';
import axios from '../../axios/config'
import { AuthContext } from '../../contexts/AuthContext';
import './Signup.css';
function SignupComponent({ type }) {
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
            })
        } else if (type == 'tutor') {
            axios.post('/tutor/signup', data).then((tutor) => {
                console.log(tutor);
                localStorage.clear()
                localStorage.setItem("nova", JSON.stringify(tutor.data))
                setUser(tutor.data)
            })
        }
    }
    return (
        <div>
            < div class="wrapper" >
                <div class="inner">
                    <img src={require('../../assets/images/image-1.png')} alt="" class="image-1" />
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

                    <img src="/images/image-2.png" alt="" class="image-2" />
                    <script src="/javascripts/script.js"></script>
                </div>

            </div>
        </div >
    )
}

export default SignupComponent
