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

function Class({ details }) {

  let { tutor } = useContext(TutuorAuthContext)
  let { user, setUser } = useContext(AuthContext)

  //States and Refs

  let [spinner, setSpinner] = useState(false)
  const [userSocketid, SetuserSocketId] = useState(null)
  let [Streaming, setStream] = useState()
  let [student, setStudent] = useState([])
  let [teachers, setTeachers] = useState([])
  let [streamer, setStreamer] = useState({})

  const socket = io("http://localhost:1080")

  let config = {
    "classid": details.id,
    "userid": socket.id
  }
  let currentTutor = {}


  useEffect(() => {
    if (!tutor) {
      setSpinner(true)
    } else {
      currentTutor = JSON.parse(tutor)
      setSpinner(false)
    }
    socket.on('connect', async () => {
      console.log("user id " + socket.id);
      SetuserSocketId(socket.id)

      socket.emit("join_class", config)
      socket.on("user_connected", (userid) => {
        console.log("NEW USER JUST CONNECTED " + userid);
      })
    })
  }, [tutor, user])


  let streamClass = async () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((cam) => {
      setStream(cam)
    })
    console.log("Streaming");

    let myPeer = new Peer()

    myPeer.on('open', (id) => {
      if (tutor && user) {
        console.log(user);
        window.alert(`You are about to logout from your student account ${JSON.parse(user).name}`)
        setUser(null)
        localStorage.removeItem("nova")
      } else {
        if (JSON.parse(user)) {
          return setStudent(id)

        } else {

          if (config.userid === currentTutor.id) {
            window.alert(id)
            setStreamer({
              "novaid": config.userid,
              "peerid": id,
            })
          } else {
            setTeachers(id)
          }
        }
      }

    })
  }

  return (
    <div className='mainwrapper'>
      {spinner && <Spinner animation="border" variant="danger" className='load' role="status" size='lg' />}
      <div className="classContainer">
        <div className="textArea">
          <p>Sharan is presenting</p>
        </div>
        <div className="mainvideoContainer">
          <div className="mainvideo">
            <img className='video1' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
          </div>
        </div>
        < ClassNavigators handleVideo={streamClass} />
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

