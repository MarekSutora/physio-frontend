import GoogleMapLocation from "@/components/homePage/GoogleMaps/GoogleMapLocation1";
import ContactForm from "@/components/homePage/ContactForm1";
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
