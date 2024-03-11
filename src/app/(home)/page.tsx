import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMapLocation";
import Contact from "@/components/mainPage/homePage/Contact";
import React from "react";
import Reviews from "@/components/mainPage/homePage/Reviews";
import MainPicture from "@/components/mainPage/homePage/MainPicture";
import AboutMe from "@/components/mainPage/homePage/AboutMe";
import Services from "@/components/mainPage/homePage/Services";

const Home = () => {
  return (
    <div className="m-auto flex h-auto flex-col gap-10">
      <MainPicture />
      <AboutMe />
      <Services />
      <Reviews />
      <GoogleMapLocation />
    </div>
  );
};

export default Home;
