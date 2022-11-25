import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import useJwtToken from '../../hooks/useJwtToken';



const Login = () => {
    const [loginError, setLoginError] = useState('')
    const { signIn, setLoading } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    console.log(from);
    const navigate = useNavigate()
    const [userMail, setUserMail] = useState('')
    const [token] = useJwtToken(userMail)
    // console.log(userMail);
    // console.log(token);

    if (token) {
        navigate(from, {replace: true})
    }

    // login
    const handleLogin = data => {
        // setLoginError('')
        signIn(data.email, data.password)
        .then(res => {
            toast.success('Signed in Succesfully!')
            const user = res.user
            // console.log(user.email);
            setUserMail(user.email)
            console.log(user);
            // setLoading(false)
            // console.log(userMail, token);
           
        })
        .catch(err => {
            setLoginError(err.message)
            toast.error(err.message)
            // console.error(err)
            // setLoading(false)
        })

    }

    return (
        <div className="hero pt-10">
  <div className="hero-content flex-col md:flex-row-reverse">
    <div className="text-center md:text-left md:w-1/2 md:-mt-20">
        <Player
        src='https://assets8.lottiefiles.com/packages/lf20_pounvezv.json'
        className="player"
        loop
        autoplay
        />
    </div>
    {/* login form */}
    <div className="card flex-shrink-0 md:w-1/2 max-w-md shadow-2xl">
      <form onSubmit={handleSubmit(handleLogin)} className="card-body bg-secondary rounded">
        <h2 className="text-xl font-bold text-center">Login</h2>
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
            <span className="label-text text-primary">Password</span>
          </label>
          <input type="password" placeholder="password" 
          {...register('password', {
            required: 'Please enter valid password'})}
          className="input input-bordered text-secondary" />
          {errors.password && <span className="text-error ml-1 mt-1">{errors.password.message}</span>}
          <label className="label">
            <Link className="label-text-alt link link-hover text-info">Forgot password?</Link>
          </label>
        </div>
        <div className="form-control mt-4">
          <input type="submit" className="btn btn-info font-bold" value="Login"/>
          <label className="label">
            <Link to="/register" className="label-text-alt link link-hover text-info">New to reBook? signUp</Link>
          </label>
          {loginError && <p className="text-error">{loginError}</p>}
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

export default Login;