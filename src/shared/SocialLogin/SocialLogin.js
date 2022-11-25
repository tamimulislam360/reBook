import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useJwtToken from "../../hooks/useJwtToken";

const SocialLogin = ({setUserMail}) => {
    const { signInWithGoogle, setLoading, loading } = useContext(AuthContext);
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const navigate = useNavigate()
    // const [userMail, setUserMail] = useState('')
    // const [token] = useJwtToken(userMail)
    
    // if(loading) return

    // if (token) {
    //     navigate(from, {replace: true})
    // }
    const handleLogin = () => {
        signInWithGoogle()
            .then(res => {
            setLoading(false)
            toast.success('Signed in Succesfully!')
            const user = res.user
            setUserMail(user.email)
            navigate(from, {replace: true})
        })
        .catch(err => console.error(err))
    }
  return (
    <div className="form-control">
      <button onClick={handleLogin} className="btn btn-primary text-secondary">
        <FaGoogle className="mr-2" /> Sign in with google
      </button>
    </div>
  );
};

export default SocialLogin;
