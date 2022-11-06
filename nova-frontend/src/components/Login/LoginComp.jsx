import React, { useState, useEffect, useContext } from 'react'
import './LoginComp.css'
import { useHistory } from 'react-router-dom'
import axios from "../../axios/config"
import { AuthContext } from '../../contexts/AuthContext'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'

function LoginComp({ type }) {

  let history = useHistory()
  let { setUser } = useContext(AuthContext)
  let { setTutor } = useContext(TutuorAuthContext)
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
  let redirectToSignup = () => {
    type === "student" ? history.push('/student/signup') : history.push("/tutor/signup")
  }

  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')
  let [err, setErr] = useState(null)
  let handleSubmit = (e) => {
    console.log("click");
    e.preventDefault()

    let data = {
      email, password
    }
    if (type === "student") {
      axios.post('/student/login', data).then((userr) => {
        console.log(userr);
        localStorage.setItem("nova", JSON.stringify(userr.data))
        setUser(JSON.stringify(userr.data))
        history.push('/student')
      }).catch((err) => {
        if (err.response) {
          console.log(err.response);
          setErr(err.response)
        }

      })

    } else if (type === 'tutor') {
      axios.post('/tutor/login', data).then((tutorr) => {
        console.log(tutorr);
        localStorage.setItem("tutor", JSON.stringify(tutorr.data))
        setTutor(JSON.stringify(tutorr.data))
        history.push('/tutor')
      }).catch((err) => {
        if (err.response) {
          console.log(err.response);
          setErr(err.response)
        }
      })
    }
  }
  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src={require("../../assets/images/img-01.png")} alt="IMG" />
            </div>

            <form className="login100-form validate-form" >

              <span className="login100-form-title">
                {type === "student" ? "Student" : "Tutor"} Login
              </span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input onChange={(e) => setEmail(e.target.value)}
                  className="input100" type="text" name="email" value={email} placeholder="Email" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input onChange={(e) => setPassword(e.target.value)}
                  className="input100" type="password" name="password" placeholder="Password" />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>
              {err ? <p className='errmsg'> {err.data}</p> : ""}
              <div className="container-login100-form-btn">
                <button onClick={handleSubmit}
                  className="login100-form-btn">
                  Login
                </button>
              </div>

              <div className="text-center p-t-12">
                <span class="txt1">
                  Forgot
                </span>
                <a className="txt2" href="#">
                  Username / Password?
                </a>
              </div>

              <div className="text-center p-t-136">
                <a className="txt2" onClick={redirectToSignup} >
                  Create your Account
                  <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginComp
