import React, { useEffect, useContext, useState } from 'react'
import './ViewAlliance.css'
import V_ALC_NAV from './ViewAllianceNav/ViewAllianceNav'
import Create_Class from '../Create_Class/Create_Class'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext'
import { useHistory } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'


function ViewAlliance({ data }) {
  let history = useHistory()
  let [loading, setLoading] = useState(false)
  let { tutor } = useContext(TutuorAuthContext)

  useEffect(() => {
    if (tutor === null || tutor === undefined) {
      setLoading(true)
        
      setTimeout(() => {
        if (tutor === null || tutor === undefined) {
          history.push("/tutor/login")
        }
      },4000)
    } else {
      setLoading(false)
    }
  }, [tutor])
  return (

    <div className='mainbg'>
      {loading ? <div className='loader'><Spinner animation="border" variant="danger" className='load' role="status" size='lg' /> </div> : < div >
        <div className="text-head">
          <span class="material-symbols-outlined icon1">
            diversity_3
          </span>
          <div className="texts">
            <h3 className='alctitle'> {data.name}</h3>
          </div>
        </div>
        <V_ALC_NAV />
        <Create_Class />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </div>}

    </div >
  )
}

export default ViewAlliance
