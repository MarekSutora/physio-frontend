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
          <CardItem translateZ="70" className="h-1/2 w-full">
            <Image
              src={post.mainImageUrl}
              alt={post.title}
              width={800}
              height={300}
              quality={100}
              className="rounded-t-lg object-cover"
            />
          </CardItem>
          <CardItem className="h-full w-full p-4" translateZ="80">
            <h1 className="mb-2 pl-1 text-xl font-bold">{post.title}</h1>
            <div className="flex flex-row flex-wrap gap-1">
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
            translateZ="40"
            className="px-6 pb-2 text-sm text-gray-600 "
          >
            <span>{textSnippet}</span>
          </CardItem>

          <CardItem
            className="flex h-full w-full flex-col justify-end"
            translateZ="30"
          >
            <div className="flex flex-row justify-between px-6 pb-2 pt-4">
              <span className="text-sm text-gray-600">{post.author}</span>
              <time className="text-sm text-gray-600">
                {new Date(post.datePublished).toLocaleDateString("sk")}
              </time>
            </div>
          </CardItem>
        </Link>
      </CardBody>
    </CardContainer>
  );
};

export default BlogCard;
