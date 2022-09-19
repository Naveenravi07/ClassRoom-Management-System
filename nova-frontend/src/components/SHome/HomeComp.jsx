import React from 'react'
import './home.css'
import { useHistory } from 'react-router-dom'

function HomeComp() {
    let history = useHistory()
    return (
        <div class="container">
            <div class="row">
                <div className="col-sm-12 col-lg-8 col-xl-6">

                    <img src={require("../../assets/images/learn.jpg")} class="img img-fluid" alt="" />

                </div>
                <div className="col-sm-12 col-lg-12 col-xl-6" style={{ display: "flex" }}>
                    <div className="texthome">
                        <h3 className="text text-center leanhtext">Learn With Nova</h3>
                        <p className="textpara">Click Join Class to join a class with a link</p>
                        <br />
                        <div className="btnns">
                            <a onClick={() => history.push('/student/dashboard')}
                                className="btn btn-primary">Join Class</a>
                            <a className='btn btn-primary dashbtn'
                                onClick={() => history.push('/student/dashboard')}> Dashboard </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeComp
