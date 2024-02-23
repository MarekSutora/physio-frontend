import {
  getAllBlogPostsAction,
  getNonHiddenBlogPosts,
} from "@/lib/actions/blogActions";
import { TBlogPost } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import parse, { Element } from "html-react-parser";
import HoverBackground from "@/components/mainPage/blog/HoverBackground";
import BlogCard from "@/components/mainPage/blog/BlogCard";

const Page = async () => {
  const blogPosts = await getNonHiddenBlogPosts();

  //const firstPostCopies = Array(20).fill(blogPosts[0]);
  const firstPostCopies = blogPosts;

  return (
    <div className="m-auto h-full min-h-[605px] w-11/12  md:w-5/6 lg:w-4/6">
      <div className="flex flex-wrap py-7">
        {firstPostCopies.map((post, index) => (
          <div
            key={index}
            className={`group w-full pb-3 pl-3 pr-3 transition-all duration-300 ease-in-out hover:scale-[1.01] ${index === 0 || index === 1 ? "md:w-1/2" : "md:w-1/3"}`}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
