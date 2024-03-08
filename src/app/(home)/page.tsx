import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMapLocation";
import Contact from "@/components/mainPage/homePage/Contact";
import React from "react";
import Reviews from "@/components/mainPage/homePage/Reviews";

const Home = () => {
  return (
    <div className="m-auto h-auto">
      <Reviews />
      <Contact />
      <GoogleMapLocation />
    </div>
  );
};

export default Home;
