import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaCartPlus,
  FaCheckCircle,
  FaCommentDots,
  FaListUl,
  FaMapMarkerAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import useVerified from "../../../hooks/useVerified";
import Loading from "../../../shared/Loading/Loading";
import { checkSellerVerified } from "../../../utilities/checkSellerVerified";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
import BookingModal from "../../../components/ConfirmationModal/BookingModal";

TimeAgo.addDefaultLocale(en);

const SingleCategory = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split("/")[2];
  const [checkSellerVerified, setcheckSellerVerified] = useState(null);
  const [booking, setBooking] = useState(null);

  const [verified] = useVerified(checkSellerVerified);

  const {
    data: books = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["books", pathname],
    queryFn: async () => {
      const res = await fetch(`https://rebook-server-nine.vercel.app/books/${categoryName}`);
      const data = await res.json();
      return data;
    },
  });

  const filteredBooks = books.filter(
    (book) => !book?.sold || (book?.sold && book?.sold === "unsold")
  );
  console.log(filteredBooks);

  const closeModal = () => {
    setBooking(null);
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-secondary my-3">
        {filteredBooks.length} {categoryName} books found!
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-3 md:px-12 justify-items-center">
        {filteredBooks?.map((book) => {
          const {
            _id,
            name,
            image,
            writer,
            sellingPrice,
            category,
            originalPrice,
            location,
            purchasedTime,
            seller,
            sellerEmail,
            sellerImage,
            conditon,
            postDate,
            description,
            sold,
          } = book;
          const sellerVerified = verified.find(
            (seller) => seller.email === book.sellerEmail
          );
          console.log(book);

          // if (!sold || (sold && sold === 'unsold')) {
          return (
            <div
              key={_id}
              className="card max-w-md w-full bg-base-100 shadow-2xl text-secondary p-3"
            >
              <figure className="">
                <img src={image} alt="" className="rounded-xl w-full h-60" />
              </figure>
              <div className="card-body p-0">
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-xl font-semibold text-secondary basis-full">
                    {name}{" "}
                  </h2>
                  <p className="text-xl font-bold text-info ml-3">
                    ${sellingPrice}
                  </p>
                </div>
                <p className="text-sm italic flex items-center gap-1">
                  <FaPencilAlt /> {writer}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm italic">Original: ${originalPrice}</p>
                  <p className="flex items-center justify-end gap-1 text-sm italic">
                    <FaMapMarkerAlt /> {location}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-2 -mt-1">
                  <p className="text-sm italic">Purchased : {purchasedTime}</p>
                  <p className="text-sm italic text-right badge badge-info">
                    {conditon}
                  </p>
                </div>
                <p className="mb-2">
                  {description.length > 199
                    ? `${description.slice(0, 200)}...`
                    : description}
                </p>
                <div className="card-actions justify-center">
                  <label
                    onClick={() => setBooking(book)}
                    htmlFor="bookingModal"
                    className="btn btn-secondary text-primary font-bold btn-sm tooltip flex justify-center items-center"
                    data-tip="Book Now"
                  >
                    <FaCartPlus />
                  </label>

                  <Link
                    to={`/categories/${book.category
                      .split(" ")
                      .join("-")}/${book.name.split(" ").join("-")}`}
                    state={book._id}
                  >
                    <button
                      className="btn btn-secondary text-primary font-bold btn-sm tooltip"
                      data-tip="See Details"
                    >
                      <FaListUl />
                    </button>
                  </Link>
                  <button
                    className="btn btn-secondary text-primary font-bold btn-sm tooltip"
                    data-tip="Report to admin"
                  >
                    <FaCommentDots />
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={sellerImage}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold m-0">{seller}</h2>{" "}
                      {sellerVerified?.email === book.sellerEmail && (
                        <span className="tooltip" data-tip="verified">
                          <FaCheckCircle className="w-3 hover:text-accent" />
                        </span>
                      )}
                    </div>
                    <p className="text-sm">Seller</p>
                  </div>
                </div>
                <p className="italic text-xs text-right grow">
                  <ReactTimeAgo date={postDate} locale="en-US" />
                </p>
              </div>
            </div>
          );
          // }
        })}
      </div>
      {booking && (
        <BookingModal closeModal={closeModal} bookingData={booking} />
      )}
    </div>
  );
};

export default SingleCategory;
