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
import CenterdModal from '../CenterdModal/CenterdModal';
import { useHistory } from 'react-router-dom'

function Class({ details }) {
  const HISTORY = useHistory()
  const [peerId, setPeerId] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  let [classDetails, setClassDetails] = useState(null)
  const peerInstance = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [declinedMsgModal, setdeclinedMsgModal] = useState(false)

  let config = {
    "classid": details.id,
  }

  const socket = io("http://localhost:1080")

  let REALOWNER

  useEffect(() => {
    const peer = new Peer();
    axios.post("/tutor/getClassInfo", { "id": config.classid }).then((res) => {
      setClassDetails(res.data)
      REALOWNER = res.data.tutor
    })

    socket.on('connect', () => {
      if (details.type === "tutor") {

        if (details.owner === JSON.parse(localStorage.getItem("tutor")).id) {
          socket.on('descionPending', (data) => {
            if (data.classid === details.id) {
              let msg = window.confirm(`${data.name} Is Waiting To Join The Call`)
              if (msg === true) {
                call(data.peerid)
              } else {
                socket.emit("calldeclined", { "classid": config.classid, "sid": data.id })
              }
            }

          })
        }

      } else {
        socket.on("calldecline", (data) => {
          if (config.classid === data.classid) {
            setdeclinedMsgModal(true)
          }
        })

      }
    })


    peer.on('open', (id) => {

      setPeerId(id)
      console.log(details);
      if (details.type === "tutor") {
        if (JSON.parse(localStorage.getItem("tutor").id) === REALOWNER) {
          console.log("u r owner");
          let data = {
            "peerid": id,
            "classid": config.classid
          }

          axios.post('/tutor/addPeerID', data).then((response) => {
          })
        }
      }
      else {

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
          setModalShow(true)

        })
      }
    });

    // Client Side or Student Side
    peer.on('call', (call) => {

      call.answer()
      setModalShow(false)
      call.on('stream', function (remoteStream) {
        remoteVideoRef.current.srcObject = remoteStream
        remoteVideoRef.current.play();
      });
    })

    peerInstance.current = peer;

    return (() => {
      socket.close()
      if (details.type === "student") {
        let sid = JSON.parse(localStorage.getItem("nova")).id
        let data = {
          "sid": sid,
          "classid": details.id
        }
        axios.post('/student/removeStudentFromClass', data)
      }
    })

  }, [])


  const call = (remotePeerId) => {
    if (details.type === "tutor") {
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {

        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        const call = peerInstance.current.call(remotePeerId, mediaStream) //Calling the student

        // The Teacher getting Stream Of Students But Right Now StudentVideo Streaming Is Disabled
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream
          remoteVideoRef.current.play();
        });
      });
    }
  }


  return (
    <div className='mainwrapper'>
      {
        modalShow && <CenterdModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="You are about there"
          heading={`Please Wait `}
          body="Please Wait Until Your Call Is Accepted By The Host "
          showloader="true"
        />
      }

      {
        declinedMsgModal && <CenterdModal
          show={modalShow}
          onHide={() => {
            setModalShow(false)
            HISTORY.push('/student/alliances')
          }}
          btnname="Go Back To Class Menu"
          title="Oh No "
          heading={`Your Request Was Rejected By The Host`}
          body="Oh No Your Request To Join The Meeting Was Denied By The Meeting Host  "
          showloader={false}
        />
      }
      <div className="classContainer">
        <div className="textArea">
          {classDetails && <p> {classDetails.tutorname} Is Presenting </p>}
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

