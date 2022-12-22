import { useQuery } from "@tanstack/react-query";
import React from "react";
import Advertised from "../Advertised/Advertised";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import HomeCategories from "../HomeCategories/HomeCategories";
import WhyChoose from "../WhyChoose/WhyChoose";

const Home = () => {
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books/advertised"],
    queryFn: async () => {
      const res = await fetch(`https://rebook-server-nine.vercel.app/books/advertised`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <div>
      <Banner />
      <HomeCategories />
      {books.length !== 0 && <Advertised isLoading={isLoading} books={books} />}
      <WhyChoose />
      <Footer />
    </div>
  );
};

export default Home;
