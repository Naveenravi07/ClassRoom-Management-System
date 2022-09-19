import React, { useState, useEffect, useContext } from 'react'
import './LoginComp.css'
import { useHistory } from 'react-router-dom'
import axios from "../../axios/config"
import { AuthContext } from '../../contexts/AuthContext'

function LoginComp({ type }) {

  let history = useHistory()
  let { user, setUser } = useContext(AuthContext)
  useEffect(() => {
    if (localStorage.getItem("nova")) {
      history.goBack()
    }
  }, [])

  let [password, setPassword] = useState('')
  let [email, setEmail] = useState('')

  let handleSubmit = (e) => {
    e.preventDefault()

    let data = {
      email, password
    }
    if (type === "student") {

      
      axios.post('/student/login', data).then((userr) => {
        console.log(userr);
        localStorage.clear()
        localStorage.setItem("nova", JSON.stringify(userr.data))
        setUser(userr.data)
        history.push('/student')
      }).catch((err) => {
        history.push('/student/login')
      })

    } else if (type == 'tutor') {
      axios.post('/tutor/login', data).then((tutor) => {
        console.log(tutor);
        localStorage.clear()
        localStorage.setItem("nova", JSON.stringify(tutor.data))
        setUser(tutor.data)
        history.push('/tutor')
      }).catch((err) => {
        history.push('/tutor/login')
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

            <form className="login100-form validate-form" action="/students/login" method="post">
              <span className="login100-form-title">
                Student Login
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
                <a className="txt2" href="#">
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
