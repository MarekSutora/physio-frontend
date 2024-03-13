import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMapLocation";
import React from "react";
import Reviews from "@/components/mainPage/homePage/Reviews/Reviews";
import MainPicture from "@/components/mainPage/homePage/MainPicture";
import AboutMe from "@/components/mainPage/homePage/AboutMe";
import Services from "@/components/mainPage/homePage/Services/Services";
import MovingPicture from "@/components/mainPage/homePage/MovingPicture";

const Home = () => {
  return (
    <div className="m-auto flex h-auto flex-col gap-10">
      <MainPicture />
      <AboutMe />
      <MovingPicture />
      <Services />
      <Reviews />
      <GoogleMapLocation />
    </div>
  );
};

export default Home;
