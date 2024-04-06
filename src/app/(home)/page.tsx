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
      <section className="w-full">
        <div className="flex w-full flex-row gap-3 pb-6">
          <div className="m-auto h-[1px] w-full bg-slate-200"></div>
          <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
            Recenzie
          </h1>
          <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        </div>
        <div className="m-auto w-5/6 py-5 lg:w-[61.8%]">
          <Reviews />
        </div>
      </section>
      <div className="w-full">
        <div className="flex w-full flex-row gap-3">
          <div className="m-auto h-[1px] w-full bg-slate-200"></div>
          <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
            Tu sa nachádzame
          </h1>
          <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        </div>
        <section className="m-auto w-full">
          <div className="flex flex-col shadow-xl lg:flex-row">
            <GoogleMapLocation />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
