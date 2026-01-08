import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const PROMO_BANNERS = [
  { 
    id: '1', 
    img: '/banners/promo-planet-ban.png', 
    alt: 'Promo Planet' 
  },
  { 
    id: '2', 
    img: 'https://placehold.co/1300x308/2AB0E5/white?text=Promo+JumpaPay', 
    alt: 'Promo Lifepal' 
  },
];

export const PromoSlider = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl md:rounded-4xl shadow-sm bg-gray-50">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        className="w-full"
      >
        {PROMO_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-0 pb-[23.68%] md:pb-[23.69%]"> 
              <img 
                src={banner.img} 
                alt={banner.alt} 
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};