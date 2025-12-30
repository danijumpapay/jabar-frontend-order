import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const PROMO_BANNERS = [
  { 
    id: '1', 
    img: '/banners/promo-planet-ban.png', 
    alt: 'Promo Planet' 
  },
  { 
    id: '2', 
    img: 'https://placehold.co/1300x308/2AB0E5/white?text=Promo+JumpaPay', 
    alt: 'Promo JumpaPay' 
  },
];

export const PromoSlider = () => {
  return (
    <div className="w-full mt-6 md:mt-10 shadow-md bg-gray-100" style={{ borderRadius: '32px', overflow: 'hidden' }}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {PROMO_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-0 pb-[23.69%]"> 
              <img 
                src={banner.img} 
                alt={banner.alt} 
                className="absolute top-0 left-0 w-full h-full object-cover"
                style={{ display: 'block' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};