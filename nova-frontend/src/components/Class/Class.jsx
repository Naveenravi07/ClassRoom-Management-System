import React, { useState, useRef, useEffect, useContext } from 'react'
import './Class.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import ClassNavigators from './ClassHandleButtons/ClassNavigators';
import io from 'socket.io-client'
// import Peer, { config } from 'simple-peer'
import { Peer } from 'peerjs'
import { TutuorAuthContext } from '../../contexts/TutorAuthContext';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner'
import "swiper/css";
import "swiper/css/scrollbar";
import axios from '../../axios/config'

function Class({ details }) {
  // const [peerId, setPeerId] = useState('');
  // const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  // const remoteVideoRef = useRef(null);
  // const currentUserVideoRef = useRef(null);
  // const peerInstance = useRef(null);

  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);
  let [streamTecher, setStreamTeacher] = useState(null)
  let [allstudents, setAllStudents] = useState([])

  let config = {
    "classid": details.id,
  }
  useEffect(() => {

    const peer = new Peer();

    axios.post("/tutor/getClassInfo", { "id": config.classid }).then((res) => {
      let caller = res.data.peerid
      setStreamTeacher(caller)
      setAllStudents(res.data.students)
    })

    peer.on('open', (id) => {
      console.log("your peer id is" + id);
      setPeerId(id)
      if (details.type === "tutor") {
        let data = {
          "peerid": id,
          "classid": config.classid
        }

        axios.post('/tutor/addPeerID', data).then((response) => {
          console.log("SAVING YOUR PEERID TO DB");
          console.log(response);
        })
      } else {

        let data = {
          "id": JSON.parse(localStorage.getItem("nova")).id,
          "peerid": id,
          "classid": config.classid
        }

        axios.post('/student/addStudenttoClass', data).then((response) => {
          console.log(response);

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
        < ClassNavigators handleVideo={() => call(allstudents[0].peerid)} />
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

