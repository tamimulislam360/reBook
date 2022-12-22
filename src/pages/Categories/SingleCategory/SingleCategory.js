import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../shared/Loading/Loading";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import BookTemplate from "../../../shared/BookTemplate/BookTemplate";

TimeAgo.addDefaultLocale(en);

const SingleCategory = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split("/")[2];

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

  if (isLoading) return <Loading />;

  return (
    <div className="px-3">
      <h2 className="text-2xl font-bold text-center text-secondary my-3">
        {filteredBooks.length} {categoryName} books found!
      </h2>

      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
        {filteredBooks?.map((book) => {
          return (
            <BookTemplate book={book} />
          )
        })}
      </div>
    </div>
  );
};

export default SingleCategory;
