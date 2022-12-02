import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import "./MyProduct.css";

const MyProducts = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const [deletingBook, setDeletingBook] = useState(null);

  const {
    data: books = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://rebook-server-nine.vercel.app/books?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (res.status === 403) {
        toast.error("Please log in again.");
        logOut()
          .then((res) => {
            <Navigate to="/login" state={{ from: location }} replace />;
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const data = await res.json();
      return data;
    },
  });

  // delete a book
  const handleBook = (id) => {
    fetch(`https://rebook-server-nine.vercel.app/books/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Book deleted successfully");
          refetch();
        }
      });
  };

  const closeModal = () => {
    setDeletingBook(null);
  };

  // advertise
  const handleAdvertise = (id) => {
    fetch(
      `https://rebook-server-nine.vercel.app/books/${id}?email=${user?.email}&advertise=true`,
      {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Advertised successfully");
          refetch();
        }
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center p-3 pt-4 gap-4">
        <h2 className="text-center font-bold text-xl text-secondary my-3">
          You have {books.length} {books.length > 1 ? "products" : "product"}
        </h2>
        {books.map((book) => {
          const { name, _id, sellingPrice, image } = book;
          return (
            <div
              key={_id}
              className="stats w-full  max-w-3xl flex flex-col sm:flex-row sm:justify-between items-center shadow text-secondary"
            >
              <div>
                <div className="stat flex items-center">
                  <div className="stat-figure text-secondary flex items-center">
                    <div className="avatar">
                      <div className="w-16 rounded">
                        <img src={image} alt="" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-secondary">{name}</div>
                    <div className="stat-value font-semibold">
                      ${sellingPrice}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="stat flex flex-col items-center justify-between sm:gap-4">
                  {(!book.sold || book.sold === "unsold") && (
                    <div className="font-bold text-xl  text-green-500">
                      Available
                    </div>
                  )}
                  {book.sold && book.sold === "pending" && (
                    <div className="font-bold text-xl  text-yellow-500">
                      Payment Pending
                    </div>
                  )}
                  {book.sold && book.sold === "sold" && (
                    <div className="font-bold text-xl  text-red-500">sold</div>
                  )}
                </div>
              </div>

              <div>
                <div className="stat flex flex-col items-center justify-between sm:gap-4">
                  <div className="flex gap-3">
                    {(!book.sold || book.sold === "unsold") && (
                      <button
                        onClick={() => handleAdvertise(book._id)}
                        className="btn btn-sm btn-info text-white"
                        disabled={book.isAdvertised === "true"}
                      >
                        {book.isAdvertised === "true"
                          ? "Advertised"
                          : "Advertise"}
                      </button>
                    )}

                    <label
                      onClick={() => setDeletingBook(book)}
                      htmlFor="confirmationModal"
                      className="btn btn-sm bg-red-600 hover:bg-red-500 border-0 text-white"
                    >
                      Delete
                    </label>
                  </div>
                </div>
              </div>

              {deletingBook && (
                <ConfirmationModal
                  title="Are you sure you want to delete?"
                  message={`If you delete ${deletingBook.name} it cannot be undone.`}
                  closeModal={closeModal}
                  successAction={handleBook}
                  successButtonName="Delete"
                  modalData={deletingBook}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyProducts;
