"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TReview } from "@/lib/shared/types";
import React from "react";
import ReviewCard from "./ReviewCard";

const dummyReviews: TReview[] = [
  {
    id: 1,
    author: "Ján Novák",
    rating: 5,
    text: "Vynikajúci servis, vysoko odporúčam! Tím bol profesionálny, zdvorilý a počas celého procesu nesmierne nápomocný...",
    date: new Date("2021-10-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 2,
    author: "Ema Horváthová",
    rating: 4,
    text: "Celkovo skvelá skúsenosť. Občasné prekážky tu a tam, ale personál ich rýchlo vyriešil.",
    date: new Date("2021-09-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 3,
    author: "Lucia Kováčová",
    rating: 5,
    text: "Som úplne ohromená kvalitou a rýchlosťou služby. Určite sa vrátim!",
    date: new Date("2021-08-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 4,
    author: "Michal Pospíšil",
    rating: 3,
    text: "Slušná práca, ale myslím, že je priestor na zlepšenie. Napriek tomu dobré z hľadiska ceny.",
    date: new Date("2021-07-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 5,
    author: "Keanu Reeves",
    rating: 4,
    text: "Veľmi priateľský personál a vynikajúca starostlivosť o zákazníka. Urobili všetko možné, aby vyhoveli mojim potrebám.",
    date: new Date("2021-06-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 6,
    author: "Chuck Norris",
    rating: 5,
    text: "Výnimočná pozornosť k detailu a veľmi osobný prístup. Mal som pocit, že moje preferencie boli prioritné.",
    date: new Date("2021-05-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 7,
    author: "Ľudmila Martínezová",
    rating: 2,
    text: "Služba bola podpriemerná v porovnaní s mojimi predchádzajúcimi skúsenosťami inde. Pravdepodobne nebudem odporúčať.",
    date: new Date("2021-04-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
];

const Reviews = () => {
  return (
    <Carousel
      opts={{
        loop: true,
        align: "start",
      }}
      className="m-auto w-5/6"
    >
      <CarouselContent>
        {dummyReviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 2xl:basis-1/3">
            <ReviewCard key={review.id} review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="z-50" />
      <CarouselNext className="z-50" />
    </Carousel>
  );
};

export default Reviews;
