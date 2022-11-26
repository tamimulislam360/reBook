import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Categories = () => {
    const { data: books = [], error, isLoading } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/books')
            const data = await res.json()
            return data
        }
    })

    return (
        <div>
            <h2 className="text-2xl font-bold text-secondary text-center my-3">All categories {books.length}</h2>
            
        </div>
    );
};

export default Categories;