"use client";

import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanorama,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -27.1255959,
  lng: -109.2771494,
};

const App = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="w-full">
      <div className="flex w-full flex-row gap-3">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Tu sa nachádzame
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <section className="m-auto w-full">
        <LoadScript googleMapsApiKey={apiKey!}>
          <div className="flex flex-col shadow-xl lg:flex-row">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            >
              <StreetViewPanorama
                options={{
                  position: center,
                  pov: { heading: 95, pitch: 5 },
                  visible: true,
                }}
              />
            </GoogleMap>
          </div>
        </LoadScript>
      </section>
    </div>
  );
};

export default App;
