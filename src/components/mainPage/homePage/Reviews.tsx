"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useState } from "react";

type ReviewType = {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
};

const dummyReviews: ReviewType[] = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    text: "Excellent service, highly recommend! The team was professional, courteous, and incredibly helpful throughout the process...",
    date: "7 months ago",
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    text: "Great experience overall. A few hiccups here and there, but the staff was quick to resolve them.",
    date: "1 year ago",
  },
  {
    id: 3,
    author: "Emily Johnson",
    rating: 5,
    text: "I'm thoroughly impressed by the quality and speed of the service. Will be returning for sure!",
    date: "2 months ago",
  },
  {
    id: 4,
    author: "Michael Brown",
    rating: 3,
    text: "Decent work, but I believe there's room for improvement. Good for the price point, nonetheless.",
    date: "5 months ago",
  },
  {
    id: 5,
    author: "Jessica Garcia",
    rating: 4,
    text: "Very friendly staff and excellent customer service. They went above and beyond to meet my needs.",
    date: "3 weeks ago",
  },
  {
    id: 6,
    author: "William Davis",
    rating: 5,
    text: "Outstanding attention to detail and a very personal touch. I felt like my preferences were prioritized.",
    date: "8 months ago",
  },
  {
    id: 7,
    author: "Linda Martinez",
    rating: 2,
    text: "The service was subpar compared to my previous experiences elsewhere. Unlikely to recommend.",
    date: "11 months ago",
  },
];

const ReviewItem = ({ review }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxTextLength = 100; // Maximum text length before showing "Read More"

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
        >
          {i < review.rating ? "★" : "☆"}
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className="m-auto h-52 w-64 bg-white p-2 px-3 md:rounded-lg md:border-2">
      <div className="mb-2 flex items-center">{renderStars()}</div>
      <p className="h-20 text-wrap text-sm">
        {review.text.length > maxTextLength && !isExpanded
          ? `${review.text.substring(0, maxTextLength)}...`
          : review.text}
        {review.text.length > maxTextLength && (
          <button
            className="pl-1 text-blue-500"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
      <div className="mt-8 flex items-center">
        <p className="text-sm">
          - {review.author}, {review.date}
        </p>
      </div>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-row gap-3 pb-6">
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
        <h1 className="w-full text-nowrap pb-3 text-center text-4xl font-semibold">
          Recenzie
        </h1>
        <div className="m-auto h-[1px] w-full bg-slate-200"></div>
      </div>
      <section className="m-auto w-5/6 py-10 lg:w-[61.8%]">
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {dummyReviews.map((review) => (
              <CarouselItem key={review.id} className="lg:basis-1/3">
                <ReviewItem key={review.id} review={review} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
};

export default Reviews;
