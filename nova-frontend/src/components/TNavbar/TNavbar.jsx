import React, { useState, useContext } from 'react'
import '../Navbar/Navbar.css'
import { NavLink, useHistory } from 'react-router-dom'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'

function TNavbar() {
    let { tutor, setTutor } = useContext(TutuorAuthContext)

    let boolean
    let parsedUser = {
        alt: "manage"
    }
    let history = useHistory()
    console.log(tutor);

    if (tutor == null) {
        boolean = false
    } else {
        boolean = true
        parsedUser = JSON.parse(tutor)
    }

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    let handleLogout = () => {
        localStorage.clear("tutor")
        setTutor(null)
    }
    return (
        <div>
            <div>
                <>
                    <nav className="navbar">
                        <div className="nav-container">
                            <NavLink exact to="/" className="nav-logo">
                                NOVA
                                <i className="fas fa-code"></i>
                            </NavLink>

                            <ul className={click ? "nav-menu active" : "nav-menu"}>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/about"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        My Alliances
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        exact
                                        to="/blog"
                                        activeClassName="active"
                                        className="nav-links"
                                        onClick={handleClick}
                                    >
                                        Notifications
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle " id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {boolean ? parsedUser.name : parsedUser.alt}
                                        <img className='imgnav'
                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvcJSJgrLlqVEQ1XNM3GzT0qGSyBX5jg1nd5Xn7_krVmMVL3gXR5u6TaU1q8xS4FNV6k&usqp=CAU'
                                            alt="" />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {tutor ?
                                            <li><a className="dropdown-item itemcur" onClick={handleLogout}>Logout</a></li>
                                            :
                                            <li><a className="dropdown-item itemcur" onClick={() => history.push('/tutor/login')}>Login</a></li>
                                        }

                                        <li><a className="dropdown-item" onClick={() => history.push("/tutor")} >Something else here</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <div className="nav-icon" onClick={handleClick}>
                                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
                            </div>
                        </div>
                    </nav>
                </>
            </div >
        </div>
    )
}

export default TNavbar
