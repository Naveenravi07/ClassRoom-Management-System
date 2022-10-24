import React from 'react'
import './ClassNavigators.css'

function ClassNavigators({ handleVideo }) {
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <div className='classnavigators'>
                <div className="navitems">

                    <div className='addspace' onClick={handleVideo}>
                        <span className="material-icons navicon ">
                            videocam
                        </span>
                    </div>

                    <div className='addspace'>
                        <span class="material-icons navicon">
                            mic
                        </span>
                    </div>

                    <div className='addspace infobtn'>
                        <span class="material-icons navicon">
                            info
                        </span>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ClassNavigators