"use client";

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const Map = () => {
  const apiKey = "AIzaSyD-hleDidfQ4s-QBvXwg4CaenzQaWpdZSc";

  if (!apiKey) {
    return <div>API key for Google Maps is not set.</div>;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, like markers or directions */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
