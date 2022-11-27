import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    
    const { data: books = [], error, isLoading } = useQuery({
        queryKey: ['books', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/books?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    return (
        <div>
            <h2 className="text-2xl font-bold">My Products {books.length}</h2>
        </div>
    );
};

export default MyProducts;