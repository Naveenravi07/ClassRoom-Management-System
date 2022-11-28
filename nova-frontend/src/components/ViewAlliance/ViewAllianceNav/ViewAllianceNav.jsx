import React, { useState } from 'react';
import './ViewAllianceNav.css';
import { useHistory } from "react-router-dom";
import List_Classes from '../../ListClasses/List_Classes';
import Fees from '../../Fees/Fees';
function ViewAllianceNav({setnav}) {

  const [active, setActive] = useState(null)

  let history = useHistory()
  let url = history.location.pathname

  if (url.includes("/meetings")) {
    setActive("meetings")
  } else if (url.includes("/notes")) {
    setActive("notes")
  } else if (url.includes("attendence")) {
    setActive("attendence")
  } else if (url.includes("fees")) {
    setActive("fees")
  } else if (url.includes("about")) {
    setActive("about")
  }
  return (
    <div className='mainhead'>

      <div class="topnav">
        <a className={active === "meetings" ? "active" : "" || active==null? "active":""}  onClick={() => {
        }}>Meetings</a>

        <a className={active === "notes" ? "active" : ""} onClick={() => {
        }}>Notes</a>
        <a
          className={active === "attendence" ? "active" : ""}
          onClick={() => {

          }}
        >Attendence</a>
        <a className={active === "fees" ? "active" : ""}
          onClick={() => {
            setActive("fees")
            setnav(<Fees/>)
          }}
        > Fees</a>
        <a className={active === "about" ? "active" : ""}
          onClick={() => {

          }}
        >About </a>
      </div>
    </div >
  )
}

export default ViewAllianceNav;