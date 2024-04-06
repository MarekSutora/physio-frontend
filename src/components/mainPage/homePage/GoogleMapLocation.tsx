"use client";

import React, { useEffect, useRef, useState } from "react";

// Extend window with the google maps types
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const center = {
  lat: -27.1255959,
  lng: -109.2771494,
};

function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const streetViewContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [panorama, setPanorama] = useState<google.maps.StreetViewPanorama>();

  useEffect(() => {
    // Load the google maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      if (mapContainerRef.current) {
        const mapInstance = new window.google.maps.Map(
          mapContainerRef.current,
          {
            center,
            zoom: 10,
          },
        );
        setMap(mapInstance);

        const marker = new window.google.maps.Marker({
          position: center,
          map: mapInstance,
        });

        if (streetViewContainerRef.current) {
          const panoramaInstance = new window.google.maps.StreetViewPanorama(
            streetViewContainerRef.current,
            {
              position: center,
              pov: { heading: 95, pitch: 5 },
              visible: true,
            },
          );
          mapInstance.setStreetView(panoramaInstance);
          setPanorama(panoramaInstance);
        }
      }
    };

    return () => {
      document.head.removeChild(script);
      // Dereference the google maps instances
      setMap(undefined);
      setPanorama(undefined);
    };
  }, []);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
      <div
        ref={streetViewContainerRef}
        style={{ width: "100%", height: "400px" }}
      />
    </>
  );
}

export default MapComponent;
