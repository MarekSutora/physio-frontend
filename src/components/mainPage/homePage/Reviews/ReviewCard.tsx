import { TReview } from "@/lib/shared/types";
import Link from "next/link";
import Image from "next/image";

type Props = {
  review: TReview;
};

const ReviewCard = ({ review }: Props) => {
  const maxTextLength = 90;

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
    <div className="m-auto flex h-64 w-full flex-col justify-between rounded-lg border-2 bg-white p-2 px-3">
      <div className="mb-0.5 flex w-full flex-row justify-between">
        <div className="h-10 text-3xl">{renderStars()}</div>
        <Link
          className="flex h-10 items-center justify-center text-2xl"
          href="https://mareksutora.sk"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
            aria-label="Google Logo Icon"
          >
            <path
              fill="#ffc107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
            />
            <path
              fill="#ff3d00"
              d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
            />
            <path
              fill="#4caf50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
            />
            <path
              fill="#1976d2"
              d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
            />
          </svg>
        </Link>
      </div>
      <p className="h-full text-wrap">
        {review.text.length > maxTextLength
          ? `${review.text.substring(0, maxTextLength)}...`
          : review.text}
        {review.text.length > maxTextLength && (
          <Link
            className="z-40 pl-1 text-blue-500 hover:underline"
            href={review.link}
          >
            {"Prečítať celú recenziu"}
          </Link>
        )}
      </p>
      <div className="flex h-full items-end justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image
            src={review.personPictureUrl}
            alt="review-author-image"
            width={50}
            height={50}
            className="rounded-full border-2 border-slate-200"
          />
          <div className="flex flex-col">
            <span className="font-medium text-zinc-700">{review.author}</span>
            <span className="text-xs text-zinc-600">
              {review.date.toLocaleDateString("sk")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
