import React, { useState, useContext } from 'react'
import '../Navbar/Navbar.css'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

function SNavbar() {

    let { user, setUser } = useContext(AuthContext)
    let history = useHistory()
    let boolean
    let parsedUser = {
        alt: "manage"
    }
    console.log(user);
    if (user == null) {
        boolean = false
    } else {
        boolean = true
        parsedUser = JSON.parse(user)
    }

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    let handleLogout = () => {
        localStorage.clear("nova")
        setUser(null)
    }
    return (
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
                                    to="/student/alliances"
                                    activeClassName="active"
                                    className="nav-links"
                                    onClick={handleClick}
                                >
                                    Alliances
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
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {boolean ? parsedUser.name : parsedUser.alt}
                                    <img className='imgnav'
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlvcJSJgrLlqVEQ1XNM3GzT0qGSyBX5jg1nd5Xn7_krVmMVL3gXR5u6TaU1q8xS4FNV6k&usqp=CAU'
                                        alt="" />
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    {user ?
                                        <li><a class="dropdown-item itemcur" onClick={handleLogout}>Logout</a></li>
                                        :
                                        <div>
                                            <li><a class="dropdown-item itemcur" onClick={() => history.push('/student/login')}>Login</a></li>
                                            <li><a class="dropdown-item itemcur" onClick={() => history.push('/student/signup')}>Signup</a></li>
                                        </div>
                                    }

                                    <li><a class="dropdown-item" onClick={() => history.push("/student")} >Something else here</a></li>
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
    )
}

export default SNavbar

