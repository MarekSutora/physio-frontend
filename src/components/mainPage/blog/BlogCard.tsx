import { getAllBlogPostsAction } from "@/lib/actions/blogActions";
import { TG_BlogPost } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import parse, { Element } from "html-react-parser";
import HoverBackground from "@/components/mainPage/blog/HoverBackground";

type Props = {};

type BlogCardProps = {
  post: TG_BlogPost;
};

const stripHtml = (htmlString: string) => {
  // Add spaces before and after block-level elements to preserve the text structure.
  let textWithSpaces = htmlString
    .replace(/<\/h[1-6]>|<\/p>|<\/div>|<br>/gi, " $& ")
    .replace(/<h[1-6]>/gi, " $& ");

  // Remove HTML tags and then decode HTML entities
  let textOnly = textWithSpaces.replace(/<[^>]+>/g, "");

  // Convert HTML entities into the characters they represent
  textOnly = textOnly
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");

  // Replace multiple spaces with a single space and trim the result.
  return textOnly.replace(/\s\s+/g, " ").trim();
};

const BlogCard = ({ post }: BlogCardProps) => {
  const parsedKeywords = post.keywordsString.split(";");

  const textSnippet = stripHtml(post.htmlContent).substring(0, 150) + "..."; // Get first 150 characters

  return (
    <Link
      className="flex flex-col rounded-lg bg-white shadow-md"
      href={`/blog/${post.slug}`}
    >
      <Image
        src={post.mainImageUrl}
        alt={post.title}
        width={800}
        height={400}
        quality={100}
        className="w-full rounded-t-lg object-cover"
      />
      <div className="p-4">
        <h1 className="mb-2 w-auto pl-1 text-xl font-bold">{post.title}</h1>
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
      </div>
      <span className="px-6 pb-2 text-sm text-gray-600 "> {textSnippet}</span>
      <div className="flex flex-row justify-between px-6 pb-2 pt-4">
        <span className="text-sm text-gray-600">{post.author}</span>

        <span className="text-sm text-gray-600">
          {new Date(post.datePublished).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
