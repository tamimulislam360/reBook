import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../../../firebase/firebase.config';
import toast from 'react-hot-toast';
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json'
// import ReactTimeAgo from 'react-time-ago'

// TimeAgo.addDefaultLocale(en)

const AddProduct = () => {
    const {user} = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    // const [date, setDate] = useState('2022')

    const categories = ['Islamic', 'History', 'Programming', 'Fiction']
    const handleProduct = (data, e) => {
        // console.log(data.timeOfPurchase);
        // setDate(newdate)
      const postDate = new Date()
      

        const {
            bookName,
            writer,
            image, 
            sellingPrice, 
            originalPrice, 
            category, 
            phone, 
            location, 
            timeOfPurchase, 
            conditon, 
            description } = data;
            
            // upload book image to firebase
      const imgRef = ref(storage, `bookImages/${image[0].name}`)
      uploadBytes(imgRef, image[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const book = {
              owener: user?.displayName,
              email: user?.email,
              name: bookName, 
              writer,
              image: url,
              sellingPrice,
              originalPrice, 
              category, 
              phone, 
              location, 
              timeOfPurchase, 
              conditon, 
              description,
              postDate,
              isAdvertised: false,
          }
          
            // console.log(book);

            fetch('http://localhost:5000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}` 
            },
            body: JSON.stringify(book)
            })
            .then(res => res.json())
            .then(data => {
              if (data.acknowledged) {
                  toast.success('Successfully added.')
                  e.target.reset()
                }
            })

          })
      })
        
        

        

        // console.log(book);
    }

    return (
        <div className="card w-full shadow-2xl p-4">
            <h2 className="text-2xl font-bold text-center text-secondary my-2">Add a Book</h2>
            <form onSubmit={handleSubmit(handleProduct)} className="card-body bg-secondary/75 backdrop-blur-md rounded">

              <div className="md:flex justify-between gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary">Book Name</span>
                </label>
                <input type="text" placeholder="Product Name" 
                {...register('bookName', {
                  required: 'Please enter Your Product Name'})}
                className="input input-bordered text-secondary w-full" />
                {errors.bookName && <span className="text-error ml-1 mt-1">{errors.bookName.message}</span>}
              </div>
              
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary">Writer</span>
                </label>
                <input type="text" placeholder="Arif Azad, Shamsul Arefin etc." 
                {...register('writer', {
                  required: 'Please enter Writer name'})}
                className="input input-bordered text-secondary w-full" />
                {errors.writer && <span className="text-error ml-1 mt-1">{errors.writer.message}</span>}
              </div>
              
                <div className="form-control w-full">
                <label className="label">
                    <span className="label-text">Photo</span>
                </label>
                <input
                    type="file"
                    {...register("image", {
                    required: "Photo is required",
                    })}
                    placeholder="Upload a photo"
                    className="input input-bordered w-full text-secondary"
                />
                {errors.image && (
                    <span className="text-error ml-1 mt-1">{errors.image.message}</span>
                )}
                </div>
              </div>
              
              
              <div className="md:flex justify-between gap-2">
              <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-primary">Selling amount</span>
                </label>
                <label className="input-group">
                    <span>$</span>
                    <input type="text" placeholder="99" 
                    {...register('sellingPrice', {
                        required: 'Please enter Your Product selling Price'})}
                    className="input input-bordered text-secondary w-full" />
                    {errors.sellingPrice && <span className="text-error ml-1 mt-1">{errors.sellingPrice.message}</span>}
                    
                </label>
                </div>
                
              <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-primary">Original amount</span>
                </label>
                <label className="input-group">
                    <span>$</span>
                    <input type="text" placeholder="99" 
                    {...register('originalPrice', {
                        required: 'Please enter Your Product original Price'})}
                    className="input input-bordered text-secondary w-full" />
                    {errors.originalPrice && <span className="text-error ml-1 mt-1">{errors.originalPrice.message}</span>}
                    
                </label>
                </div>
                
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select {...register('category', {
                        required: 'This field is required'})}
                         className="select select-bordered text-secondary">
                        {
                          categories.map((category, i) => <option key={i} >{category}</option>)
                        }
                        
                    </select>
                    {errors.category && <span className="text-error ml-1 mt-1">{errors.category.message}</span>}
                </div>
                
              </div>
              
              <div className="md:flex justify-between gap-2">
                <div className="form-control w-full">
                    <label className="label">
                    <span className="label-text text-primary">Phone Number</span>
                    </label>
                    <input type="text" placeholder="+88017...." 
                    {...register('phone', {
                    required: 'Please enter your phone number'})}
                    className="input input-bordered text-secondary" />
                    {errors.phone && <span className="text-error ml-1 mt-1">{errors.phone.message}</span>}
                </div>
                
                <div className="form-control w-full">
                    <label className="label">
                    <span className="label-text text-primary">Location</span>
                    </label>
                    <input type="text" placeholder="Dhaka, Chittagong, etc." 
                    {...register('location', {
                    required: 'Please enter your Location'})}
                    className="input input-bordered text-secondary" />
                    {errors.location && <span className="text-error ml-1 mt-1">{errors.location.message}</span>}
                </div>
                
                <div className="form-control w-full">
                        <label className="label">
                        <span className="label-text text-primary">Time of Purchase</span>
                        </label>
                        <input type="date" placeholder="2, 3, 4 etc." 
                        {...register('timeOfPurchase', {
                        required: 'Please enter time of purchase'})}
                        className="input input-bordered text-secondary" />
                        {errors.timeOfPurchase && <span className="text-error ml-1 mt-1">{errors.timeOfPurchase.message}</span>}
                </div>
              </div>
              
                
                
                   <div className="grid place-items-center">
                   <div className="form-control">
                        <label className="label mt-2">
                        <span className="label-text text-primary">Product conditon</span>
                        </label>
                        <div className="flex gap-3">
                        <div className="flex items-center gap-2">
                        <input type="radio" {...register("conditon")} value="excellent" id="excellent" className="radio" checked />
                        <label htmlFor="excellent" className="label-text text-primary">Excellent</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                        <input type="radio" {...register("conditon")} value="good" id="good" className="radio" />
                        <label htmlFor="good" className="label-text text-primary">Good</label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                        <input type="radio" {...register("conditon")} value="fair" id="fair" className="radio" />
                        <label htmlFor="fair" className="label-text text-primary">Fair</label>
                        </div>
                        </div>
                    </div>
                   </div>
                    
                    
                <div className="form-control">
                    <label className="label mt-2">
                        <span className="label-text text-primary">Book Description</span>
                    </label>
                    <textarea {...register("description")} className="textarea textarea-bordered text-secondary" placeholder="Type your description...."></textarea>
                </div>

 
              <div className="form-control mt-4">
                <input type="submit" className="btn btn-info font-bold" value="Add product"/>
              </div>
            </form>
                  
          </div>
    );
};

export default AddProduct;