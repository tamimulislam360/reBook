import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { AuthContext } from "../../../contexts/AuthProvider";
import Loading from "../../../shared/Loading/Loading";

const AllSellers = () => {
  const { user } = useContext(AuthContext);
  const [deletingSeller, setDeletingSeller] = useState(null);

  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `https://rebook-server-nine.vercel.app/users?email=${user?.email}&role=seller`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = res.json();
      return data;
    },
  });

  // verify seller
  const handleVerify = (id) => {
    fetch(`https://rebook-server-nine.vercel.app/users/${id}?email=${user?.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("User verified.");
          refetch();
        }
      });
  };

  // delet a seller
  const handleDelet = (id) => {
    fetch(`https://rebook-server-nine.vercel.app/users/${id}?email=${user?.email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          refetch();
        }
      });
  };

  const closeModal = () => {
    setDeletingSeller(null);
  };

  isLoading && <Loading />;

  return (
    <div className="p-3">
      <h2 className="text-2xl font-bold text-center text-secondary my-3">
        {sellers.length} {sellers.length > 1 ? "Sellers" : "Seller"} Found.
      </h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => {
              return (
                <tr key={seller._id}>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-semibld">{seller.name}</h2>
                    </div>
                  </td>
                  <td>{seller?.email}</td>
                  <td>
                    {seller?.isVerified === "true" ? (
                      <span className="text-green-600">verified</span>
                    ) : (
                      <button
                        onClick={() => handleVerify(seller._id)}
                        className="btn btn-xs btn-secondary text-primary"
                      >
                        Verify
                      </button>
                    )}
                  </td>
                  <th>
                    <label
                      onClick={() => setDeletingSeller(seller)}
                      htmlFor="confirmationModal"
                      className="btn btn-xs btn-error text-white"
                    >
                      Delete
                    </label>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {deletingSeller && (
        <ConfirmationModal
          title="Are you sure you want to delete?"
          message={`If you delete ${deletingSeller.name} it cannot be undone.`}
          closeModal={closeModal}
          successAction={handleDelet}
          successButtonName="Delete"
          modalData={deletingSeller}
        />
      )}
    </div>
  );
};

export default AllSellers;
