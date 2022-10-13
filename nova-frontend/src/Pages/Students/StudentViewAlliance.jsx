import React from 'react'
import ViewAlliance from '../../components/ViewAlliance/ViewAlliance'
import SNavbar from '../../components/SNavbar/SNavbar'
import { useLocation } from 'react-router-dom'


function StudentViewAlliance() {
    let location = useLocation()
    console.log(location.state);
    let allianceId = location.state.id
    let alcname = location.state.alc

    let obj = {
        "id": allianceId,
        "name": alcname
    }

    return (
        <div>
            <SNavbar />
            <ViewAlliance type="student" data={obj} />
        </div>
    )
}

export default StudentViewAlliance