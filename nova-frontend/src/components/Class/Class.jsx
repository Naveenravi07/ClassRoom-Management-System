import React, { useState, useRef, useEffect } from 'react'
import './Class.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import ClassNavigators from './ClassHandleButtons/ClassNavigators';
import io from 'socket.io-client'
import { Peer } from 'peerjs'
import "swiper/css";
import "swiper/css/scrollbar";
import axios from '../../axios/config'
import Spinner from 'react-bootstrap/Spinner'

function Class({ details }) {

  const [peerId, setPeerId] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);

  const peerInstance = useRef(null);

  let config = {
    "classid": details.id,
  }

  const socket = io("http://localhost:1080")

  let REALOWNER

  useEffect(() => {
    const peer = new Peer();
    axios.post("/tutor/getClassInfo", { "id": config.classid }).then((res) => {
      REALOWNER = res.data.tutor
    })

    socket.on('connect', () => {
      if (details.type === "tutor") {

        if (details.owner === JSON.parse(localStorage.getItem("tutor")).id) {
          socket.on('descionPending', (data) => {
            console.log(details);
            if (data.classid === details.id) {
              let msg = window.confirm(`${data.name} Is Waiting To Join The Call`)
              if (msg == true) {
                call(data.peerid)
              } else {
                console.log("call cancelLED");
              }
            }

          })
        }

      }
    })


    peer.on('open', (id) => {

      setPeerId(id)
      if (details.type === "tutor") {
        let data = {
          "peerid": id,
          "classid": config.classid
        }

        axios.post('/tutor/addPeerID', data).then((response) => {
          console.log(response);
        })

      } else {

        let data = {
          "id": JSON.parse(localStorage.getItem("nova")).id,
          "peerid": id,
          "classid": config.classid,
          "name": JSON.parse(localStorage.getItem("nova")).name,
          "owner": REALOWNER,
        }

        axios.post('/student/addStudenttoClass', data).then((response) => {

          // Emiting event to websocket
          socket.emit('newStudent', data)

        })
      }
    });

    peer.on('call', (call) => {

      call.answer()
      call.on('stream', function (remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    })

    peerInstance.current = peer;

    return (() => {
      socket.close()
    })

  }, [])


  const call = (remotePeerId) => {
    if (details.type === "tutor") {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {

        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream)

        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    }
  }


  return (
    <div className='mainwrapper'>
      <div className="classContainer">
        <div className="textArea">
          <p>Sharan is presenting</p>
        </div>
        <div className="mainvideoContainer">
          <div className="mainvideo">
            <video className='video1' ref={details.type === "tutor" ? currentUserVideoRef : remoteVideoRef ? remoteVideoRef : ""} src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
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
            <SwiperSlide className="others swiper-slide">

            </SwiperSlide>
          </Swiper>

        </div>
      </div>
    </div >
  )
}

export default Class

