import { useEffect, useState } from "react";

const useVerified = (check) => {
  const [verified, setVerified] = useState([]);
  useEffect(() => {
    fetch(`https://rebook-server-nine.vercel.app/users/verified?${check}`)
      .then((res) => res.json())
      .then((data) => setVerified(data));
  }, [check]);

  return [verified];
};

export default useVerified;
