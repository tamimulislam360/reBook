import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const Categories = () => {
  const { data: categories } = useLoaderData();

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary text-center my-3">
        All categories
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-y-8 place-items-center">
        {categories.map((category) => (
          <Link to={`/categories/${category.name}`} key={category._id}>
            <div className="card max-w-md h-52 shadow-2xl image-full">
              <figure>
                <img src={category.image} alt="" />
              </figure>
              <div className="card-body grid place-items-center">
                <h1 className="card-title font-extrabold text-white text-4xl">
                  {category.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
