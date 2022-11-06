import React from 'react'
import './ClassNavigators.css'

function ClassNavigators({ group_modal, setgroup_modal }) {
   
    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <div className='classnavigators'>
                <div className="navitems">

                    <div className='addspace' >
                        <span className="material-icons navicon ">
                            videocam
                        </span>
                    </div>

                    <div className='addspace'>
                        <span class="material-icons navicon">
                            mic
                        </span>
                    </div>

                    <div className='addspace '>
                        <span class="material-icons navicon">
                            info
                        </span>
                    </div>

                    <div className='addspace infobtn'>
                        <span class="material-icons navicon" onClick={()=>setgroup_modal(!group_modal)} >
                            groups
                        </span>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ClassNavigators