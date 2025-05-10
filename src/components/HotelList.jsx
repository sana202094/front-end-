// components/HotelList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import HotelCard from './HotelCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';  // Updated import for Swiper CSS

const HotelList = ({ hotels }) => {
    if (!hotels.length) return <p className="text-center p-6">Aucun hôtel trouvé.</p>;
  
    return (
      <div className="p-6 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Découvrez Nos Hôtels</h2>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          loop={true}
          navigation
        >
          {hotels.map(hotel => (
            <SwiperSlide key={hotel.idHotel}>
              <HotelCard hotel={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };
  

export default HotelList;