import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useJwtToken = (email) => {
  const { loading } = useContext(AuthContext);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`https://rebook-server-nine.vercel.app/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("accessToken", data.accessToken);
            setToken(data.accessToken);
          }
        });
    }
  }, [email]);
  return [token];
};

export default useJwtToken;
