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
    author: "John Doe",
    rating: 5,
    text: "Excellent service, highly recommend! The team was professional, courteous, and incredibly helpful throughout the process...",
    date: new Date("2021-10-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    text: "Great experience overall. A few hiccups here and there, but the staff was quick to resolve them.",
    date: new Date("2021-09-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 3,
    author: "Emily Johnson",
    rating: 5,
    text: "I'm thoroughly impressed by the quality and speed of the service. Will be returning for sure!",
    date: new Date("2021-08-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 4,
    author: "Michael Brown",
    rating: 3,
    text: "Decent work, but I believe there's room for improvement. Good for the price point, nonetheless.",
    date: new Date("2021-07-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 5,
    author: "Jessica Garcia",
    rating: 4,
    text: "Very friendly staff and excellent customer service. They went above and beyond to meet my needs.",
    date: new Date("2021-06-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 6,
    author: "William Davis",
    rating: 5,
    text: "Outstanding attention to detail and a very personal touch. I felt like my preferences were prioritized.",
    date: new Date("2021-05-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
  {
    id: 7,
    author: "Linda Martinez",
    rating: 2,
    text: "The service was subpar compared to my previous experiences elsewhere. Unlikely to recommend. The service was subpar compared to my previous experiences elsewhere. Unlikely to recommend.",
    date: new Date("2021-04-01T00:00:00Z"),
    link: "https://www.mareksutora.sk",
    personPictureUrl: "/personSilhouette.png",
  },
];

const Reviews = () => {
  return (
    <section className="w-full">
      <div className="flex w-full flex-row gap-3 pb-6">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Recenzie
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <div className="m-auto w-5/6 py-5 lg:w-[61.8%]">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
          className="w-5/6 m-auto"
        >
          <CarouselContent>
            {dummyReviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="md:basis-1/2 2xl:basis-1/3"
              >
                <ReviewCard key={review.id} review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious  className="z-50"/>
          <CarouselNext className="z-50"/>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
