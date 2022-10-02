import React from 'react'
import Alliances from '../../components/Alliances/Alliances'
import SNavbar from '../../components/SNavbar/SNavbar'
function SAlliance() {
    return (
        <div>
            <SNavbar />
            <Alliances type="student" />
        </div>
    )
}

export default SAlliance
