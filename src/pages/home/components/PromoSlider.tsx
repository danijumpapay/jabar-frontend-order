import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useOrderStore } from '@/store/useOrderStore';

import 'swiper/css';
import 'swiper/css/pagination';

const PROMO_BANNERS = [
  { 
    id: 'planet-ban', 
    img: '/banners/promo-planet-ban.png', 
    alt: 'Promo Planet Ban',
    target: 'promo-detail'
  },
  { 
    id: 'jumpapay-special', 
    img: 'https://placehold.co/1300x308/2AB0E5/white?text=Promo+JumpaPay', 
    alt: 'Promo JumpaPay',
    target: 'promo-detail'
  },
];

export const PromoSlider = () => {
  const { setView, setSelectedPromoId } = useOrderStore();

  return (
    <div className="w-full overflow-hidden rounded-2xl md:rounded-[40px] shadow-sm bg-gray-50 group">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        className="w-full promo-swiper"
      >
        {PROMO_BANNERS.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div 
              onClick={() => {
                if (banner.target === 'promo-detail') {
                  setSelectedPromoId(banner.id);
                  setView('promo-detail');
                  window.scrollTo(0, 0);
                }
              }}
              className="relative w-full h-0 pb-[23.68%] md:pb-[23.69%] cursor-pointer overflow-hidden"
            > 
              <img 
                src={banner.img} 
                alt={banner.alt} 
                className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .promo-swiper .swiper-pagination-bullet-active {
          background: #27AAE1 !important;
          width: 20px !important;
          border-radius: 5px !important;
        }
        .promo-swiper .swiper-pagination-bullet {
          background: #27AAE1;
          opacity: 0.5;
        }
        .promo-swiper .swiper-pagination {
          bottom: 15px !important;
        }
      `}</style>
    </div>
  );
};