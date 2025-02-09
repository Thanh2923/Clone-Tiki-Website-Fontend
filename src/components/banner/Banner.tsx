"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide> 
            <div className='w-full pt-5   flex justify-center '>
           <div className='w-[100%] grid py-5 px-5 grid-cols-2 gap-3 '>
           <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner1.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                   
                                 />
                                 <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner2.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
           </div>
            </div>
        </SwiperSlide>
        <SwiperSlide> 
            <div className='w-full flex justify-center '>
           <div className='w-[95%] grid py-5 grid-cols-2 gap-2 '>
           <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner3.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
                                 <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner4.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
           </div>
            </div>
        </SwiperSlide>
        <SwiperSlide> 
            <div className='w-full flex justify-center '>
           <div className='w-[95%] grid py-5 grid-cols-2 gap-2 '>
           <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner5.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
                                 <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner6.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
           </div>
            </div>
        </SwiperSlide>
        <SwiperSlide> 
            <div className='w-full flex justify-center '>
           <div className='w-[95%] grid py-5 grid-cols-2 gap-2 '>
           <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner7.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
                                 <Image  className='rounded-lg w-auto h-auto' 
                                   src="/banner/banner8.webp"
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />
           </div>
            </div>
        </SwiperSlide>
      
        
      </Swiper>
    </>
  );
}
