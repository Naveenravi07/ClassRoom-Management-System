import React from 'react'
import './ViewAlliance.css'
import V_ALC_NAV from './ViewAllianceNav/ViewAllianceNav'


function ViewAlliance({ data }) {

  return (

    <div className='mainbg'>
      <div className="text-head">
        <span class="material-symbols-outlined icon1">
          diversity_3
        </span>
        <div className="texts">
          <h3 className='alctitle'> {data.name}</h3>
        </div>
      </div>
      <V_ALC_NAV  />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    </div>
  )
}

export default ViewAlliance
