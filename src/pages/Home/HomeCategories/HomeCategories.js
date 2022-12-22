import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "./HomeCategories.css";
import SimpleButton from "../../../components/ConfirmationModal/SimpleButton";
import SliderHeader from "../../../components/SliderHeader/SliderHeader";

const HomeCategories = () => {
  const {
    data: categories = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`https://rebook-server-nine.vercel.app/categories`);
      const data = await res.json();
      return data;
    },
  });


  return (
    <div className="-mt-32 sm:mt-0">
      <div className="p-4 sm:px-8">

        <SliderHeader arrowNextButtonClass="custom-swiper-button-next" arrowPrevButtonClass="custom-swiper-button-prev" >categories</SliderHeader>

        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          scrollbar={{ draggable: true }}
          loop={true}
          className=""
        >
          
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link className="w-full" to={`/categories/${category.name}`}>
                <div className="card h-24 shadow-2xl image-full w-full">
                  <figure>
                    <img className="w-full" src={category.image} alt="" />
                  </figure>
                  <div className="z-20 grid place-items-center">
                    <h1 className="font-extrabold text-white text-3xl">
                      {category.name}
                    </h1>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Link to="/categories">
        <SimpleButton classes="btn-secondary text-primary btn-sm block mx-auto btn-outline hover:bg-secondary hover:text-primary">
          See All
        </SimpleButton>
      </Link>
    </div>
  );
};

export default HomeCategories;
