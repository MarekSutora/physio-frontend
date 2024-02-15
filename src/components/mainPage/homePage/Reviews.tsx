import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

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
  return (
    <div className="m-auto w-48">
      <p>{review.text}</p>
      <p>
        - {review.author}, {review.date}
      </p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div className="bg-slate-50">
      <section className="m-auto w-5/6 py-10 lg:w-[61.8%]">
        <h2>Recenzie</h2>
        <Carousel
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {dummyReviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
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
