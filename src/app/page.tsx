import GoogleMapLocation from "@/components/homePage/GoogleMaps/GoogleMapLocation";
import ContactForm from "@/components/homePage/ContactForm";
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
