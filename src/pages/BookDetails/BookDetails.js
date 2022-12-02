import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaArrowLeft, FaQuoteLeft, FaStar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookingModal from "../../components/ConfirmationModal/BookingModal";
import { AuthContext } from "../../contexts/AuthProvider";

const BookDetails = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [booking, setBooking] = useState(null);

  const navigate = useNavigate();

  const { state: id } = useLocation();

  const {
    data: book = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch(`https://rebook-server-nine.vercel.app/books/book/${id}`);
      const data = await res.json();
      return data;
    },
  });

  const { name, image, description, sellingPrice, category } = book;

  const closeModal = () => {
    setBooking(null);
  };

  return (
    <div className="text-secondary flex justify-center">
      <div className="border grow shadow-2xl m-8 p-3 max-w-4xl">
        <Link
          to={`/categories/${category.split(" ").join("-")}`}
          className="flex justify-center items-center gap-2 w-24 mx-auto font-bold mb-8"
        >
          <FaArrowLeft /> Go Back
        </Link>
        <img className="w-full h-96" src={image} alt={name} />
        <h2 className="text-3xl font-bold my-3">{name}</h2>
        <p>{description}</p>
        <div className="flex items-center justify-between mt-8 mb-4 max-w-xs mx-auto">
          <p className="text-xl font-semibold">Price: ${sellingPrice}</p>
          <div className="flex items-center gap-2 text-orange-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <label
          onClick={() => setBooking(book)}
          htmlFor="bookingModal"
          className="btn btn-secondary text-primary flex jsutify-center items-center w-full my-3"
        >
          Book Now
        </label>
      </div>

      {booking && (
        <BookingModal closeModal={closeModal} bookingData={booking} />
      )}
    </div>
  );
};

export default BookDetails;
