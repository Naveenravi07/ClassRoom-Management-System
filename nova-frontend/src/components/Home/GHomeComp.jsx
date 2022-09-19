import React from 'react'
import './GhomeComp.css'
import { useHistory, } from "react-router-dom"

function GHomeComp() {

    let history = useHistory()

    return (
        <div>
            <div class="container-fluid">
                <div class="row ">

                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-4 homeleft">
                        <div class="text text-md-center text-xl-left text-lg-left texthome">
                            <h4 class="text-xl-center fs-5 lh-lg premtext" style={{ color: "aliceblue" }}>
                                Premium Video Meetings Now For Free For Everyone
                            </h4>
                            <p style={{ marginTop: "40px", color: "#fff" }}> Learn More About Nova</p>

                            <div class="buttons-home" style={{ marginTop: "50px", marginBottom: "30px" }}>
                                <a onClick={() => history.push('/student')}
                                    class="btn btn-primary btn-lg" >students</a>

                                <a onClick={() => history.push('/tutor')}
                                    class="btn btn-primary btn-lg tutorbtn">Tutors</a>
                            </div>


                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-8">
                        <img class="img-fluid" src={require("../../assets/images/home-teach.jpg")} alt="" height="auto" />
                    </div>
                </div>
            </div>

        </div >
    )
}

export default GHomeComp