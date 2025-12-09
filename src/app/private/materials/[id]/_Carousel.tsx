'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';
import { Key, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

export default function Carousel({ material }: any) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    if (material.pictures.length === 0) {
        return (
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <div className="text-center text-gray-500">
                    <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Aucune image disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Carousel principal */}
            <div className="relative mb-4">
                <Swiper
                    spaceBetween={10}
                    navigation={true}
                    pagination={{
                        clickable: true,
                    }}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs, Pagination]}
                    className="rounded-lg shadow-lg h-96 md:h-[500px]"
                >
                    {material.pictures.map((picture: any, index: Key | null | undefined) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-full relative">
                                <img
                                    src={picture.data_url}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay avec gradient pour améliorer la lisibilité */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Carousel des miniatures */}
            {material.pictures.length > 1 && (
              <div className='px-8'>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={8}
                    slidesPerView={4}
                    
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbs-swiper h-20 md:h-24"
                    breakpoints={{
                        640: {
                            slidesPerView: 5,
                        },
                        768: {
                            slidesPerView: 6,
                        },
                        1024: {
                            slidesPerView: 8,
                        },
                    }}
                >
                    {material.pictures.map((picture: any, index: Key | null | undefined) => (
                        <SwiperSlide key={index} className="cursor-pointer">
                            <div className="w-full h-full relative overflow-hidden rounded-md border-2 border-transparent hover:border-blue-500 transition-all duration-200">
                                <img
                                    src={picture.data_url}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                </div>
            )}
        </div>
    );
}
