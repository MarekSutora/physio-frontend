import GoogleMapLocation from "@/components/mainPage/homePage/GoogleMaps/GoogleMapLocation";
import ContactForm from "@/components/mainPage/homePage/ContactForm";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <GoogleMapLocation />
      <ContactForm />
    </>
  );
};

export default Home;
