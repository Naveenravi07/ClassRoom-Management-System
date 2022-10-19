import React from 'react'
import Class from '../../components/Class/Class'
import { useLocation } from 'react-router-dom'
import TNavbar from '../../components/TNavbar/TNavbar'
import SNavbar from '../../components/SNavbar/SNavbar'

function ClassPage() {

    let location = useLocation()
    console.log(location.state);

    return (
        <div>
            {
                location.state.type === "tutor" ? <TNavbar /> : <SNavbar />
            }
            <Class details={location.state} />
        </div>
    )
}

export default ClassPage