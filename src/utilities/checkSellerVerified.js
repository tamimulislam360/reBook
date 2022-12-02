export const checkSellerVerified = () => {
    fetch("https://rebook-server-nine.vercel.app/users")
      .then((res) => res.json())
        .then((data) => {
            return data
        });
}