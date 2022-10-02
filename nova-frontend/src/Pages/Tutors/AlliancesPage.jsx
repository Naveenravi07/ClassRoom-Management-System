import React from 'react'
import Alliances from '../../components/Alliances/Alliances'
import TNavbar from '../../components/TNavbar/TNavbar'

function AlliancesPage() {
    return (
        <div>
            <TNavbar />
            <Alliances type="tutor" />
        </div>
    )
}

export default AlliancesPage