import { getNonHiddenBlogPosts } from "@/lib/actions/blogActions";
import React from "react";
import BlogCard from "@/components/mainPage/blog/BlogCard";
import { TBlogPost } from "@/lib/shared/types";

const Page = async () => {
  let blogPosts: TBlogPost[] = [];

  try {
    blogPosts = await getNonHiddenBlogPosts();
  } catch (error) {
    console.log(error);
  }

  const firstPostCopies = Array(20).fill(blogPosts[0]);

  return (
    <div className="m-auto min-h-[605px] w-11/12  md:w-5/6 lg:w-4/6">
      <div className="flex h-full w-full flex-row flex-wrap">
        {firstPostCopies.length > 0 &&
          firstPostCopies.map((post, index) => (
            <div
              key={index}
              className={`p-4 md:p-2 lg:p-3 ${index === 0 || index === 1 ? " md:w-1/2" : "md:w-1/3"}`}
            >
              <BlogCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
