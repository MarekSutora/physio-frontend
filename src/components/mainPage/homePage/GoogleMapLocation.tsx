"use client";

import React from "react";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -27.1255959,
  lng: -109.2771494,
};

//TODO mobile view

const App = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Make sure to set your API key

  return (
    <div className="m-auto">
      <div className="flex w-full flex-row gap-3">
        <div className="m-auto hidden h-[1px] w-full bg-slate-200 lg:block"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Tu sa nachádzame
        </h1>
        <div className="m-auto hidden h-[1px] w-full bg-slate-200 lg:block"></div>
      </div>

      <LoadScript googleMapsApiKey={apiKey!}>
        <div className="flex flex-col shadow-2xl shadow-green-600/30 lg:flex-row">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          ></GoogleMap>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Child components, such as markers, info windows, etc. */}
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
    </div>
  );
};

export default App;
