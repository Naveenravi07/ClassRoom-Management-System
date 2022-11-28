import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import FeesCss from './Fees.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'

function Fees() {
  return (
    <div className={FeesCss.main}>
      <div className={FeesCss.formwrapper}>
        <h3 className={FeesCss.formheader}>
          Please Fill The Following Fields TO Enable Fees Feature
        </h3>
        <form action="">
          <label htmlFor="">
            Renewal Gap </label>
            <select className={FeesCss.plans_duration}>
              <option value="1" >1 Month</option>
              <option value="3">3 Month</option>
            </select>
          

          <label htmlFor="">Amount  </label>
          <input className={FeesCss.priceinp} type={'number'} />
          
          
          <label htmlFor="">Subsribtion Date</label>
          <input type={'date'} name="" id="" />
          
          <button type={'submit'}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Fees
