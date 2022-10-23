import React, { useState, useRef, useEffect } from 'react'
import './Class.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import ClassNavigators from './ClassHandleButtons/ClassNavigators';
import io from 'socket.io-client'
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";


function Class({ details }) {
  //States and Refs

  const [userSocketid, SetuserSocketId] = useState(null)
  const socket = io("http://localhost:1080")

  useEffect(() => {

    socket.on('connect', async () => {
      console.log("user id " + socket.id);
      SetuserSocketId(socket.id)
      let config = {
        "classid": details.id,
        "userid": socket.id
      }
      socket.emit("join_class", config)
      socket.on("user_connected",(userid)=>{
        console.log("NEW USER JUST CONNECTED "+userid);
      })
    })
  }, [])

  return (
    <div className='mainwrapper'>
      <div className="classContainer">
        <div className="textArea">
          <p>Sharan is presenting</p>
        </div>

        <div className="mainvideoContainer">
          <div className="mainvideo">
            <img className='video1' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
          </div>
        </div>
        < ClassNavigators />
        <div className="othervideos">

          <Swiper
            scrollbar={{
              hide: false,
            }}
            freeMode
            modules={[Scrollbar]}
            breakpoints={{
              320: { slidesPerView: 3, spaceBetween: 20 },
              480: { slidesPerView: 5, spaceBetween: 150 },
              768: { slidesPerView: 12, spaceBetween: 2 },
              1024: { slidesPerView: 12, spaceBetween: 20 },
            }}
            mousewheel={
              {
                forceToAxis: true,
              }
            }

            className="mySwiper">
          </Swiper>

        </div>
      </div>
    </div >
  )
}

export default Class

