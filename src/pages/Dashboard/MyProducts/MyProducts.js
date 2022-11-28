import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user, logOut } = useContext(AuthContext)
    const location = useLocation()
    
    const { data: books = [], error, isLoading, refetch } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/books?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            if (res.status === 403) {
                toast.error('Please log in again.')
                logOut().then(res => {<Navigate to="/login" state={{from: location}} replace />}).catch(err => {console.log(err)})
            }
            const data = await res.json()
            return data
        }
    })
    // console.log(books);
    // console.log(error);


    // delete a book
    const handleDelete = id => {
        fetch(`http://localhost:5000/books/${id}`, {
            method: 'DELETE',
            headers: {authorization: `Bearer ${localStorage.getItem('accessToken')}`}
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
                toast.success('Book deleted successfully');
                refetch()
            }
        })
    }


    return (
        <div>
            <h2 className="text-2xl font-bold text-center my-5 text-secondary">You have {books.length} {books.length > 1 ? 'products' : 'product'}</h2>
            <div className="flex flex-col items-center p-3 pt-4 gap-4">
            {
                books.map(book => {
                    const {name, _id, sellingPrice, image} = book
                    return (
                        <div key={_id} className="stats flex flex-col sm:flex-row shadow text-secondary">
                
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
                    <div className="stat-value font-semibold">${sellingPrice}</div>
                    </div>
                    
                </div>
                </div>
                
                <div>
                <div className="stat flex flex-col items-center justify-between sm:gap-4">
                    
                    <div className="font-semibold text-secondary">Status</div>
                    <div className="font-bold text-xl  text-secondary">{book.sold ? 'Sold' : 'Available'}</div>
                </div>
                </div>
                
               <div>
               <div className="stat flex flex-col items-center justify-between sm:gap-4">
                    <div className="text-secondary font-semibold">Actions</div>
                    <div className='flex gap-3'>
                       {!book.sold &&  <button className="btn btn-sm btn-info text-white">Advertise</button>}
                        <button onClick={() => handleDelete(_id)} className="btn btn-sm bg-red-600 hover:bg-red-500 border-0 text-white">Delete</button>
                    </div>
                </div>
               </div>
                
               
                
                </div>
                    )
                })
            }
            </div>
        </div>
    );
};

export default MyProducts;