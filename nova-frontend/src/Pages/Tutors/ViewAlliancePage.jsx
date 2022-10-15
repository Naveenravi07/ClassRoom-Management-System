import React, { useEffect } from 'react'
import ViewAlliance from '../../components/ViewAlliance/ViewAlliance'
import TNavbar from '../../components/TNavbar/TNavbar'
import { useLocation } from 'react-router-dom'
import List_Classes from '../../components/ListClasses/List_Classes'

function ViewAlliancePage() {
    let location = useLocation()
    let allianceId = location.state.id
    let alcname = location.state.alc

    let obj = {
        "id": allianceId,
        "name": alcname
    }

    return (
        <div>
            <TNavbar />
            <ViewAlliance type="tutor" data={obj} />
            <List_Classes type="tutor" data={obj} />
        </div>
    )
}

export default ViewAlliancePage
