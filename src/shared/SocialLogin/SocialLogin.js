import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useJwtToken from "../../hooks/useJwtToken";

const SocialLogin = () => {
  const { signInWithGoogle, setLoading, loading } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [userMail, setUserMail] = useState("");
  const [token] = useJwtToken(userMail);

  if (loading) return;

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        setLoading(false);
        toast.success("Signed in Succesfully!");
        const user = res.user;
        seveUserToDb(user.displayName, user.email, "buyer");
      })
      .catch((err) => console.error(err));

    // seve user to database
    const seveUserToDb = (name, email, role) => {
      const user = { name, email, role };
      fetch("https://rebook-server-nine.vercel.app/users", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setUserMail(email);
          }
        });
    };
  };
  return (
    <div className="form-control">
      <button onClick={handleLogin} className="btn btn-secondary text-primary">
        <FaGoogle className="mr-2" /> Sign in with google
      </button>
    </div>
  );
};

export default SocialLogin;
