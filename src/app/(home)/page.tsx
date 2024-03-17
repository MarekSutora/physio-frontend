import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMapLocation";
import React from "react";
import Reviews from "@/components/mainPage/homePage/Reviews/Reviews";
import MainPicture from "@/components/mainPage/homePage/MainPicture";
import AboutMe from "@/components/mainPage/homePage/AboutMe";
import MovingPicture from "@/components/mainPage/homePage/MovingPicture";
import ServicesWrapper from "@/components/mainPage/homePage/Services/ServicesWrapper";

const Home = () => {
  return (
    <div className="m-auto flex h-auto w-full max-w-full flex-col gap-10">
      <MainPicture />
      <AboutMe />
      <MovingPicture />
      <ServicesWrapper />
      <Reviews />
      <GoogleMapLocation />
    </div>
  );
};

export default Home;
