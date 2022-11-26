import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Categories = () => {
    const { data: books = [], error, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/books')
            const data = await res.json()
            return data
        }
    })

    const {data: categories} = useLoaderData()
    // console.log(data);

    // const categories = ['Islamic', 'History', 'Programming', 'Fiction', 'Other']


    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary text-center my-3">All categories {books.length}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-y-8 place-items-center">
                {
                    categories.map(category => <Link key={category._id}>
                        <div className="card max-w-md h-52 shadow-2xl image-full">
                    <figure><img src={category.image} alt="" /></figure>
                    <div className="card-body grid place-items-center">
                        <h1
                            class="card-title font-extrabold text-white text-4xl"
                            >
                            {category.name}
                        </h1>
                    </div>
                  </div>
                    </Link>)
                }
            </div>
        </div>
    );
};

export default Categories;