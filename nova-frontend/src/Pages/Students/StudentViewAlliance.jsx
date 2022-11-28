import React from 'react'
import ViewAlliance from '../../components/ViewAlliance/ViewAlliance'
import SNavbar from '../../components/SNavbar/SNavbar'
import { useLocation } from 'react-router-dom'
import List_Classes from '../../components/ListClasses/List_Classes'
import ClassContextWrapper from '../../contexts/ClassContext'
import ViewAllianceNav from '../../components/ViewAlliance/ViewAllianceNav/ViewAllianceNav'
function StudentViewAlliance() {
    let location = useLocation()
    console.log(location.state);
    let allianceId = location.state.id
    let alcname = location.state.alc
    
    // Creating an object and passing it as props into other components
    let obj = {
        "id": allianceId,
        "name": alcname
    }

    return (
        <div style={{minHeight:"100vh",background:"#202020"}}>
            <ClassContextWrapper>
            <SNavbar />
            <ViewAllianceNav/>
            <ViewAlliance type="student" data={obj} />
            <List_Classes type="student" data={obj} />
            </ClassContextWrapper>
        </div>
    )
}


export default StudentViewAlliance