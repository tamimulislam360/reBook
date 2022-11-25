import { Player } from '@lottiefiles/react-lottie-player';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import { storage } from '../../firebase/firebase.config';



const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();

    // const imgbbHostKey = process.env.REACT_APP_imgBbKey
    // const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`
    
    
    const handleSignUp = (data, event) => {
        console.log(data.image[0]);
        // console.log(data.image[0].name);

        


        // create user
        createUser(data.email, data.password)
        .then(res => {
            toast.success('user created successfully.')

            // upload user profile image to firebase
            const imgRef = ref(storage, `userImages/${data.image[0].name}`)
            uploadBytes(imgRef, data.image[0]).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    
                    // create user profile
                    const profile = {
                        displayName: data.name,
                        photoURL: url
                    }
                    // update profile
                    updateUserProfile(profile)
                    .then(res => {
                        const user = res.user
                        console.log('After update user profile', user);
                    })
                    .catch((err) => {console.error(err)})

                })
            })


        })
        .catch(err => {
            console.error(err);
        })


        // const formData = new FormData();
        // formData.append('imageData', data.image[0])

        // fetch(url, {
        //     method: 'POST',
        //     body: formData
        // }).then(res => res.json())
        // .then(imageData => {
        
        //     console.log(imageData);
        // })
        
         
        // const uploadImage = storage.ref(`images/${data.image[0].name}`).put(data.image[0])
        // uploadImage.on(
        //     "state_changed",
        //     error => {
        //         console.log(error);
        //     },
        //     () => {
        //         storage
        //             .ref('images')
        //             .child(data.image[0].name)
        //             .getDownloadURL()
        //             .then(url => {
        //                 console.log(url);
        //             })

        //     }
        // )


        // const imgHostKey = process.env.REACT_APP_imgBb_api_key
        // const url = `https://api.imgbb.com/1/upload?expiration=600&key=cd77927d11fbcb79670f08e2db473ca0`
        // const formdata = new FormData();
        // formdata.append('image', data.image[0])
      
        // fetch(url, {
        //     method: 'POST',
        //     body: formdata
        // })
        // .then(res => res.json())
        // .then(imgData => {
        //     console.log(imgData);
        //     const profile = {
        //         displayName: data.name,
        //         photoURL: imgData.data.url
        //     }
            
        //     createUser(data.email, data.password)
        //     .then(res => {
        //     toast.success('user created successfully.')
            
        //     updateUserProfile(profile)
        //     .then(res => {})
        //     .catch(err => {console.log(err)})
        //     const user = res.user
        //     console.log(user);
        // })
        // .catch(err => console.error(err))
        // })
        
        
        // event.target.reset()
    }

    return (
        <div className="hero pt-10">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:text-left md:w-1/2 md:-mt-40">
              <Player
              src='https://assets8.lottiefiles.com/packages/lf20_pounvezv.json'
              className="player md:w-[800px]"
              loop
              autoplay
              />
          </div>
          {/* login form */}
          <div className="card flex-shrink-0 md:w-1/2 max-w-md shadow-2xl">
            <form onSubmit={handleSubmit(handleSignUp)} className="card-body bg-secondary rounded">
              <h2 className="text-xl font-bold text-center">Register</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary">Full Name</span>
                </label>
                <input type="text" placeholder="Full Name" 
                {...register('name', {
                  required: 'Please enter Your Full Name'})}
                className="input input-bordered text-secondary" />
                {errors.name && <span className="text-error ml-1 mt-1">{errors.name.message}</span>}
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary">Email</span>
                </label>
                <input type="email" placeholder="email" 
                {...register('email', {
                  required: 'Please enter a valid email address'})}
                className="input input-bordered text-secondary" />
                {errors.email && <span className="text-error ml-1 mt-1">{errors.email.message}</span>}
              </div>
              
              <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("image", {
              required: "Photo is required",
            })}
            placeholder="Upload a photo"
            className="input input-bordered"
          />
          {errors.image && (
            <span className="text-error ml-1 mt-1">{errors.image.message}</span>
          )}
        </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-primary">Password</span>
                </label>
                <input type="password" placeholder="password" 
                {...register('password', {
                  required: 'Please enter valid password'})}
                className="input input-bordered text-secondary" />
                {errors.password && <span className="text-error ml-1 mt-1">{errors.password.message}</span>}
                
                <div className="form-control">
                    <label className="label mt-2">
                    <span className="label-text text-primary">Select your position</span>
                    </label>
                    <div className="flex gap-2">
                    <input type="radio" {...register("position")} value="buyer" id="buyer" className="radio" checked /><label htmlFor="buyer" className="label-text text-primary">Buyer</label>
                    <input type="radio" {...register("position")} value="seller" id="seller" className="radio" /><label htmlFor="seller" className="label-text text-primary">Seller</label>
                    </div>
                </div>
                
              </div>
              <div className="form-control mt-4">
                <input type="submit" className="btn btn-info font-bold" value="Sign up"/>
                <label className="label">
                  <Link to="/login" className="label-text-alt link link-hover text-info">Have an accent? Login</Link>
                </label>
              </div>
              <div className="divider text-primary">OR</div>
              <div className="form-control">
                <button className="btn btn-primary text-secondary"><FaGoogle className="mr-2" /> Sign in with google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default Register;