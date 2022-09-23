import React from 'react'
import './THome.css'

function THome() {
    return (
        <div className='thomemain'>
            <div class="container ">
                <div class="row">
                    <div class="col-sm-12 col-xl-6 ">
                        <img src={require("../../assets/images/home-icon.jpg")} class="img img-fluid img-thumbnail" alt="" />
                    </div>
                    <div class="col-sm-12 col-xl-6 thomeh1" >
                        <div class="texthome">
                            <h4 class="text text-center teachh1">Teachings Made Easy With Nova </h4>
                            <br />
                            <p class="textpara">Click Create Class to start a class and get a classlink
                                which you can share with your
                                students </p>
                            <div class="btnns">
                                <a href="/createclass" class="btn btn-primary">Create Class</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default THome