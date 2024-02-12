import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMapLocation";
import Contact from "@/components/mainPage/homePage/Contact";
import React from "react";
import Reviews from "@/components/mainPage/homePage/Reviews";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="m-auto h-auto w-5/6 py-10 lg:w-[61.8%]">
      <Reviews />
      <Contact />
      <GoogleMapLocation />
    </div>
  );
};

export default Home;
