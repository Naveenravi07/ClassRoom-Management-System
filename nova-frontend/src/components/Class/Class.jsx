import React, { useState } from 'react'
import './Class.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";


function Class({ details }) {

 
  let [totalCount, setTotalCount] = useState(13)
  console.log(window.screen.width);
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
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>

            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/sEAyggVL9tw/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            <SwiperSlide className="others swiper-slide">
              <img className='otvideos' src="https://i.ytimg.com/vi/v0Bkxc3YeIc/maxresdefault.jpg" alt="" />
            </SwiperSlide>
            
          </Swiper>

        </div>
      </div>
    </div >
  )
}

export default Class

