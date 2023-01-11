import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import SliderHeader from "../../../components/SliderHeader/SliderHeader";
import BookTemplate from "../../../shared/BookTemplate/BookTemplate";
import Loading from "../../../shared/Loading/Loading";
import "./Advertised.css";
import useVerified from "../../../hooks/useVerified";
import { useState } from "react";
import BookingModal from "../../../components/ConfirmationModal/BookingModal";
import ReactTimeAgo from "react-time-ago";
import { FaCartPlus, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Advertised = ({ books, isLoading }) => {
  const [booking, setBooking] = useState(null);

  const closeModal = () => {
    setBooking(null);
  };

  return (
    <div className="mt-8 p-4 sm:px-8">
      <SliderHeader
        arrowNextButtonClass="advertised-swiper-button-next"
        arrowPrevButtonClass="advertised-swiper-button-prev"
      >
        advertised books
      </SliderHeader>
      <div>
        <Swiper
          breakpoints={{
            420: {
              slidesPerView: 2,
            },
            592: {
              slidesPerView: 3,
            },
            810: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={10}
          slidesPerView={1}
          pagination={{
            el: ".my-custom-pagination-div",
            clickable: true,
          }}
          navigation={{
            nextEl: ".advertised-swiper-button-next",
            prevEl: ".advertised-swiper-button-prev",
          }}
          scrollbar={{ draggable: true }}
          loop={true}
          className=""
        >
          {books?.map((book) => {
            isLoading && <Loading />;

            return (
              <SwiperSlide className="overflow-auto">
                <BookTemplate setBookingData={setBooking} book={book} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="my-custom-pagination-div flex justify-center items-center mt-6"></div>
      </div>
      {booking && (
        <BookingModal
          className="w-scrren h-screen z-50"
          closeModal={closeModal}
          bookingData={booking}
        />
      )}
    </div>
  );
};

export default Advertised;
