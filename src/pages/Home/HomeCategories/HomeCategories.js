import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../../components/ConfirmationModal/Heading";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import "./HomeCategories.css";
import SimpleButton from "../../../components/ConfirmationModal/SimpleButton";

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

  const swiper = useSwiper();
  return (
    <div className="-mt-32 sm:mt-0">
      <Heading>Categories</Heading>
      <div className="p-4 sm:px-8">
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
          navigation
          scrollbar={{ draggable: true }}
          className=""
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link className="w-full" to={`/categories/${category.name}`}>
                <div className="card h-28 shadow-2xl image-full w-full">
                  <figure>
                    <img className="w-full" src={category.image} alt="" />
                  </figure>
                  <div className="card-body grid place-items-center">
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
