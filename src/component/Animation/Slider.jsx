import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import pets from "../../assets/pets.jpg";
import adaption from "../../assets/adaption.jpg"
import ownner from "../../assets/ownner.jpg"

const slides = [
  {
    image: pets,
    title: "Find Your Furry Friend Today!",
  },
  {
    image: adaption,
    title: "Adopt, Don’t Shop — Give a Pet a Home.",
  },
  {
    image: ownner,
    title: "Because Every Pet Deserves Love and Care.",
  },
];

const Slider = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]} spaceBetween={20}
        slidesPerView={1} loop={true} autoplay={{
          delay: 3000, disableOnInteraction: false,
        }}
        pagination={{ clickable: true }} navigation={true}
        className="rounded-2xl overflow-hidden" >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[400px] md:h-[470px]">
              <img src={slide.image} alt="pet"
                className="w-full h-full object-cover" />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Slider;