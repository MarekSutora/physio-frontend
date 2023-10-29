import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import React from "react";

export const basicLinks = [
  { text: "Úvod", path: "/uvod" },
  { text: "O mne", path: "/o-mne" },
  {
    text: "Služby",
    subMenuItems: [
      { text: "Služba 1", path: "/" },
      { text: "Služba 2", path: "/" },
      { text: "Služba 3", path: "/" },
    ],
  },
  { text: "Rezervácia", path: "/rezervacia" },
  { text: "Blog", path: "/blog" },
];

export const userLinks = [
  { text: "Prihlásenie", path: "/prihlasenie" },
  { text: "Registrácia", path: "/registracia" },
] as const;

export const socialMediaLinks = [
  {
    icon: React.createElement(FaFacebook),
    path: "https://www.facebook.com/",
  },
  {
    icon: React.createElement(FaYoutube),
    path: "https://www.youtube.com/",
  },
  {
    icon: React.createElement(FaInstagram),
    path: "https://www.instagram.com/",
  },
] as const;
