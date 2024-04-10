"use client";

import { TBlogPost } from "@/lib/shared/types";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

type BlogCardProps = {
  post: TBlogPost;
};

const stripHtml = (htmlString: string) => {
  let textWithSpaces = htmlString
    .replace(/<\/h[1-6]>|<\/p>|<\/div>|<br>/gi, " $& ")
    .replace(/<h[1-6]>/gi, " $& ");

  let textOnly = textWithSpaces.replace(/<[^>]+>/g, "");

  textOnly = textOnly
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

  return textOnly.replace(/\s\s+/g, " ").trim();
};

const BlogCard = ({ post }: BlogCardProps) => {
  const parsedKeywords = post.keywordsString.split(";");

  const textSnippet = stripHtml(post.htmlContent).substring(0, 180) + "...";

  return (
    <CardContainer className="h-full w-full" containerClassName="py-0">
      <CardBody className="h-full w-full">
        <Link
          className="flex h-full w-full flex-col rounded-lg bg-white shadow-md"
          href={`/blog/${post.slug}`}
        >
          <CardItem
            translateZ="50"
            className="relative h-80 w-full overflow-hidden"
          >
            <Image
              src={post.mainImageUrl}
              alt={post.title}
              quality={80}
              fill
              style={{ objectFit: "cover", objectPosition: "10% 10%" }}
              className="rounded-t-lg"
            />
          </CardItem>
          <CardItem className="h-full w-full pt-4 pl-4" translateZ="70">
            <h1 className="pl-1 text-xl font-bold">{post.title}</h1>
          </CardItem>
          <CardItem
            className="flex h-full w-full flex-col justify-end"
            translateZ="20"
          >
            <div className="flex flex-row flex-wrap gap-1 p-4">
              {parsedKeywords.map((keyword, index) => (
                <i
                  key={index}
                  className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {"#" + keyword}
                </i>
              ))}
            </div>
          </CardItem>
          <CardItem
            translateZ="50"
            className="px-6 pb-2 text-sm text-gray-600 "
          >
            <span>{textSnippet}</span>
          </CardItem>

          <CardItem
            className="flex h-full w-full flex-col justify-end"
            translateZ="50"
          >
            <div className="flex flex-row justify-between px-6 pb-2 pt-4">
              <span className="text-sm text-gray-600">{post.author}</span>
              <time className="text-sm text-gray-600">
                {new Date(post.datePublished).toLocaleDateString("sk", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </CardItem>
        </Link>
      </CardBody>
    </CardContainer>
  );
};

export default BlogCard;
