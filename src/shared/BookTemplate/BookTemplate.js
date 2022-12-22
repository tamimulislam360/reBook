import React, { useState } from 'react';
import { FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import BookingModal from '../../components/ConfirmationModal/BookingModal';
import useVerified from '../../hooks/useVerified';

const BookTemplate = ({ book }) => {
  const [booking, setBooking] = useState(null);

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
      
    const [verified] = useVerified();
    const sellerVerified = verified.find(
        (seller) => seller.email === book.sellerEmail
      );
      
      const closeModal = () => {
        setBooking(null);
      };
      
    return (
        <div>
            <div
              key={_id}
              className="card max-w-[200px] w-full bg-base-100 shadow-2xl text-secondary p-2"
            >
              <figure className="relative">
                <img src={image} alt="" className="rounded-xl w-full h-60" />
                <p className="text-sm italic text-right badge badge-info absolute top-2 right-2">
                    {conditon}
                </p>
              </figure>
              <div className="card-body p-0">
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-base font-semibold text-secondary basis-full">
                    {name}{" "}
                  </h2>
                  <p className="text-xl font-bold text-info ml-3">
                    ${sellingPrice}
                  </p>
                </div>
                <p className="text-xs italic -mt-2">
                  {writer}
                </p>
                <div className="card-actions justify-center items-center my-2">
                  <label
                    onClick={() => setBooking(book)}
                    htmlFor="bookingModal"
                    className="btn btn-secondary text-primary font-bold btn-xs tooltip flex justify-center items-center"
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
                      className="btn btn-secondary text-primary font-bold btn-xs text-[10px] p-1 tooltip"
                      data-tip="See Details"
                    >
                      See Details
                    </button>
                  </Link>
                  <button
                    className="btn btn-secondary text-primary font-bold btn-xs text-[10px] p-1 tooltip"
                    data-tip="Report to admin"
                  >
                    Report
                  </button>
                </div>
              </div>
              <div className="flex flex-col mt-3">
                <div className="flex items-center gap-3">
                  <img
                    src={sellerImage}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-xs m-0">{seller}</h2>{" "}
                      {sellerVerified?.email === book.sellerEmail && (
                        <span className="tooltip" data-tip="verified">
                          <FaCheckCircle className="w-3 hover:text-accent" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs">Seller</p>
                  </div>
                </div>
                <p className="italic text-xs text-right grow">
                  <ReactTimeAgo date={postDate} locale="en-US" />
                </p>
              </div>
            </div>
            {booking && (
        <BookingModal closeModal={closeModal} bookingData={booking} />
      )}
        </div>
    );
};

export default BookTemplate;