import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';

const SingleCategory = () => {

    const { state: categoryName } = useLocation()

    const { data: books = [], error, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/books/${categoryName}`)
            const data = await res.json()
            return data
        }
    })

    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-secondary my-3">{books.length} {categoryName} books found!</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {
                    books.map(book => <div key={book._id} className="card max-w-xs bg-base-100 shadow-2xl text-secondary p-3">
                    <figure className="">
                      <img src={book?.image} alt="" className="rounded-xl w-full h-60" />
                    </figure>
                    <div className="card-body p-0">
                            <div className="flex justify-between items-center mt-2">
                            <h2 className="card-title grow">{book.name} </h2>
                            <p className="rounded-2xl flex justify-center items-center w-8 h-8 bg-info p-2 text-white font-semibold text-xl">${book.sellingPrice}</p>
                            </div>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions">
                        <button className="btn btn-secondary text-primary font-bold btn-sm">Buy Now</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default SingleCategory;