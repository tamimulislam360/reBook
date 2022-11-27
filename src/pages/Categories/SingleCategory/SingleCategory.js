import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Loading from '../../../shared/Loading/Loading';

const SingleCategory = () => {
  const { pathname } = useLocation()
  const categoryName = pathname.split('/')[2]


    const { data: books = [], error, isLoading } = useQuery({
        queryKey: ['books', pathname],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/books/${categoryName}`)
            const data = await res.json()
            return data
        }
    })

     if(isLoading) return <Loading/>
  
    return (
        <div>
            <h2 className="text-2xl font-bold text-center text-secondary my-3">{books.length} {categoryName} books found!</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center">
                {
                    books?.map(book => <div key={book._id} className="card max-w-xs bg-base-100 shadow-2xl text-secondary p-3">
                    <figure className="">
                      <img src={book?.image} alt="" className="rounded-xl w-full h-60" />
                    </figure>
                    <div className="card-body p-0">
                            <div className="flex justify-between items-center mt-2">
                            <h2 className="card-title grow">{book.name} </h2>
                            <p className="rounded-2xl flex justify-center items-center w-8 h-8 bg-info p-2 text-white font-semibold text-xl">${book.sellingPrice}</p>
                            </div>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div className="card-actions justify-center">
                          <button className="btn btn-secondary text-primary font-bold btn-sm">Buy Now</button>
                          
                          <Link to={`/categories/${book.category.split(' ').join('-')}/${book.name.split(' ').join('-')}`} state={book._id}>
                            <button className="btn btn-secondary text-primary font-bold btn-sm">See Details</button>
                          </Link>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default SingleCategory;