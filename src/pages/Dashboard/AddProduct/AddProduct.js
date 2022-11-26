import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleProduct = (data) => {
        console.log(data);
    }

    return (
        <div className="card w-full shadow-2xl p-4">
            <h2 className="text-2xl font-bold text-center text-secondary my-2">Add a product</h2>
            <form onSubmit={handleSubmit(handleProduct)} className="card-body bg-secondary/75 backdrop-blur-md rounded">

              <div className="md:flex justify-between gap-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-primary">Product Name</span>
                </label>
                <input type="text" placeholder="Product Name" 
                {...register('productName', {
                  required: 'Please enter Your Product Name'})}
                className="input input-bordered text-secondary w-full" />
                {errors.productName && <span className="text-error ml-1 mt-1">{errors.productName.message}</span>}
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
                         className="select select-bordered">
                        <option selected>Pick one</option>
                        <option>Star Wars</option>
                        <option>Harry Potter</option>
                        <option>Lord of the Rings</option>
                        <option>Planet of the Apes</option>
                        <option>Star Trek</option>
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
                        <span className="label-text text-primary">Year of Purchase</span>
                        </label>
                        <input type="text" placeholder="2, 3, 4 etc." 
                        {...register('yearOfPurchase', {
                        required: 'Please enter year of purchase'})}
                        className="input input-bordered text-secondary" />
                        {errors.yearOfPurchase && <span className="text-error ml-1 mt-1">{errors.yearOfPurchase.message}</span>}
                </div>
              </div>
              
                
                
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
                    
                    
                <div className="form-control">
                    <label className="label mt-2">
                        <span className="label-text text-primary">Product Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered text-secondary" placeholder="Bio"></textarea>
                </div>

 
              <div className="form-control mt-4">
                <input type="submit" className="btn btn-info font-bold" value="Add product"/>
              </div>
            </form>
                  
          </div>
    );
};

export default AddProduct;