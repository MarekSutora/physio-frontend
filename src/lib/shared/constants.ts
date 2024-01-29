import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import React from "react";

export const basicLinks = [
  {
    text: "Služby",
    subMenuItems: [
      { text: "Služba 1aaaaaaa", path: "/" },
      { text: "Služba2aaaaaaa", path: "/" },
      { text: "Služba3aaaaaaa", path: "/" },
    ],
  },
  { text: "O mne", path: "/o-mne" },
  { text: "Rezervácia", path: "/rezervacie" },
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

export const contactInfo = {
  email: "marek.sutora@gmail.com",
  telephoneNumber: "+421 123 456 789",
  address: "P. Sherman, 42 Wallaby Way, Sydney",
} as const;

export const dashboardLinks = {
  admin: [
    {
      text: "Manage Users",
      path: "/dashboard/manage-users",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Analytics",
      path: "/dashboard/analytics",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Settings",
      path: "/dashboard/settings",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Rezervácie",
      path: "/dashboard/rezervacie",
      icon: React.createElement(FaFacebook),
    },
  ],
  physiotherapist: [
    {
      text: "Appointments",
      path: "/dashboard/appointments",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Patients",
      path: "/dashboard/patients",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Profile",
      path: "/dashboard/profile",
      icon: React.createElement(FaFacebook),
    },
  ],
  patient: [
    {
      text: "My Appointments",
      path: "/dashboard/my-appointments",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "My Profile",
      path: "/my-profile",
      icon: React.createElement(FaFacebook),
    },
    {
      text: "Support",
      path: "/support",
      icon: React.createElement(FaFacebook),
    },
  ],
} as const;
