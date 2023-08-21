import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import '../components/index.css'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';

function LinkParser(clothing){
  const result = clothing.split(/[, ]+/);
  var link = "https://www.google.com/search?q=";
  for (let index = 2; index < result.length; index++) {
      link+=result[index];
      link+="+";
  }
  return link;
}


function OutfitCard(props) {
  var link1, link2, link3 = "";
  return (
    <div className="OutfitCard">
      <Swiper

        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={false}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {props.pass1.map((msg, index) => {
          return (
            <>
            {link1 = LinkParser(msg[1])}
            {link2 = LinkParser(msg[2])}
            {link3 = LinkParser(msg[3])}
            <div>

              <SwiperSlide  >
                <div className="card">
                  <div className="content">
                    <h2 className="title">{msg[0]}</h2>
                    <a href= {link1}  target='_blank'>
                      <p className={"body"}>{msg[1]}</p>
                    </a>
                    <a href= {link2}  target='_blank'>
                      <p className={"body"}>{msg[2]}</p>
                    </a>
                    <a href= {link3}  target='_blank'>
                      <p className={"body"}>{msg[3]}</p>
                    </a>
                  </div>
                </div>


              </SwiperSlide>

            </div>
            </>
          );

        })}

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );

}


export default OutfitCard;