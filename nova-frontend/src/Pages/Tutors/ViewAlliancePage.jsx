import React, { useState, useEffect } from 'react'
import ViewAlliance from '../../components/ViewAlliance/ViewAlliance'
import TNavbar from '../../components/TNavbar/TNavbar'
import { useLocation } from 'react-router-dom'
import List_Classes from '../../components/ListClasses/List_Classes'
import ViewAllianceNav from '../../components/ViewAlliance/ViewAllianceNav/ViewAllianceNav'
function ViewAlliancePage() {
  let location = useLocation()
  let allianceId = location.state.id
  let alcname = location.state.alc
  let obj = {
    id: allianceId,
    name: alcname,
  }
  const [component, setComponent] = useState(<div> <ViewAlliance type="tutor" data={obj} /> <List_Classes type="tutor" data={obj} /></div>)
  useEffect(() => {
    console.log(component)
  }, [component])

  return (
    <div>
      <TNavbar />
      <ViewAllianceNav setnav={setComponent} />
      {component} 
    </div>
  )
}

export default ViewAlliancePage
