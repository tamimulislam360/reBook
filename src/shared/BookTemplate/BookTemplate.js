import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaCartPlus, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import BookingModal from '../../components/ConfirmationModal/BookingModal';
import { wishlistContext } from '../../contexts/WishListProvider';
import useVerified from '../../hooks/useVerified';

const BookTemplate = ({ book, setBookingData }) => {
  const {setReFetch} = useContext(wishlistContext)

  const bookPath = `/categories/${book?.category?.split(" ").join("-")}/${book?.name?.split(" ").join("-")}`

    const {
        _id,
        name,
        image,
        writer,
        sellingPrice,
        category,
        originalPrice,
        location,
        purchasedTime,
        seller,
        sellerEmail,
        sellerImage,
        conditon,
        postDate,
        description,
        sold,
      } = book;
      
    const [verified] = useVerified();
    const sellerVerified = verified.find(
        (seller) => seller.email === book.sellerEmail
      );
      
      const closeModal = () => {
        setBookingData(null);
      };
      
      // handle wish list
      const handleWishList = (id) => {
        const list = JSON.parse(localStorage.getItem('rebookWishlist'))
        if (list) {
          const exist = list.includes(id)
          if (exist) {
            return toast.error('already added')
          } else {
            const newList = [...list, id]
            localStorage.setItem('rebookWishlist', JSON.stringify(newList))
            toast.success('Added to wishlist')
            setReFetch(Math.random())
          }
        } else {
          const list = [id]
          localStorage.setItem('rebookWishlist', JSON.stringify(list))
          toast.success('Added to wishlist')
          setReFetch(Math.random())
        }
      }
  
    return (
        <div>
            <div
              key={_id}
              className="card max-w-[200px] w-full bg-base-100 shadow-2xl text-secondary p-2"
            >
              <figure className="relative">
                <Link to={bookPath} state={book._id} className="w-full">               
                  <img src={image} alt="" className="rounded-xl w-full h-60" />
                </Link>
                <p className="text-sm italic text-right badge badge-info absolute top-2 right-2">
                    {conditon}
                </p>
              </figure>
              <div className="card-body p-0">
                <div className="flex justify-between items-center mt-2">
                  <h2 className="text-base font-semibold text-secondary basis-full">
                    {name}
                  </h2>
                </div>
                <p className="text-xs italic -mt-2">
                  {writer}
                </p>
                <p className="text-xl font-bold text-info ml-3">
                    ${sellingPrice}
                </p>
                <div className="card-actions justify-center items-center my-2">
                  <label
                    onClick={() => setBookingData(book)}
                    htmlFor="bookingModal"
                    className="btn btn-secondary text-primary font-bold btn-xs text-[10px] tooltip flex justify-center items-center"
                    data-tip="Book Now"
                  >
                    Book now
                  </label>

                  
                  <button
                    className="btn btn-secondary text-primary font-bold btn-xs tooltip"
                    data-tip="Add to wishlist"
                    onClick={() => handleWishList(_id)}
                  >
                    <FaCartPlus />
                  </button>
                </div>
                
                
              </div>
            </div>
        </div>
    );
};

export default BookTemplate;