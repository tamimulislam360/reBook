import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useVerified from "../../hooks/useVerified";
// import './BookingModal.css'

const BookingModal = ({ bookingData, closeModal }) => {
  const { user } = useContext(AuthContext);
  const [verified] = useVerified();
  const navigate = useNavigate();


  const {
    _id,
    name,
    sellingPrice,
    phone,
    location,
    sellerEmail,
    sellerImage,
    seller,
    image,
    writer,
  } = bookingData;
  const sellerVerified = verified.find(
    (seller) => seller.email === bookingData.sellerEmail
  );
  const handleBooking = (event, bookingData) => {
    event.preventDefault();

    const booking = {
      buyer: user?.displayName,
      email: user?.email,
      product: _id,
      productName: name,
      price: sellingPrice,
      meetingLocation: location,
      sellerPhone: phone,
      sellerEmail,
      image,
      writer,
    };

    fetch("https://rebook-server-nine.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Booking Confirmed.");
          fetch(
            `https://rebook-server-nine.vercel.app/books/sold/${_id}?soldOrUnsold=pending`,
            {
              method: "PUT",
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(_id);
              fetch(
                `https://rebook-server-nine.vercel.app/books/${_id}?email=${user?.email}&advertise=false`,
                {
                  method: "PUT",
                  headers: {
                    authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {});
            });
          closeModal();
          navigate("/dashboard/myorders");
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="z-50 w-scrren h-scrren bookingModal">
      <input type="checkbox" id="bookingModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-secondary">
            Please confirm your booking.
          </h3>

          <form onSubmit={(event) => handleBooking(event, bookingData)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product info</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="productName"
                  placeholder="productName"
                  defaultValue={name}
                  className="input input-bordered w-full"
                  disabled
                />
                <input
                  type="text"
                  name="productPrice"
                  placeholder="productPrice"
                  defaultValue={`$ ${sellingPrice}`}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Your info</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="buyerName"
                  placeholder="Name"
                  defaultValue={user?.displayName}
                  className="input input-bordered w-full"
                  disabled
                />
                <input
                  type="text"
                  name="buyerEmail"
                  placeholder="Email"
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
            </div>

            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Meeting info</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="phone"
                  name="SellerPhone"
                  placeholder="phone"
                  defaultValue={phone}
                  className="input input-bordered w-full"
                  disabled
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  defaultValue={location}
                  className="input input-bordered w-full"
                  disabled
                />
              </div>
              <label className="label">
                <span className="label-text text-xs italic">
                  Please contact this number for any query
                </span>
              </label>
            </div>

            <div className="flex flex-col items-center my-3">
              <label className="label">
                <span className="label-text">Seller info</span>
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={sellerImage}
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold m-0">{seller}</h2>{" "}
                    {sellerVerified?.email === sellerEmail && (
                      <span className="tooltip" data-tip="verified">
                        <FaCheckCircle className="w-3 hover:text-accent" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{sellerEmail}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-3">
              <label
                onClick={closeModal}
                htmlFor="bookingModal"
                className="btn btn-sm btn-error text-white"
              >
                Cancel
              </label>
              <button
                type="submit"
                className="btn btn-sm btn-secondary text-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
