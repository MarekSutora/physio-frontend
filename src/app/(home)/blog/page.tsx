import {
  getNonHiddenBlogPosts,
} from "@/lib/actions/blogActions";
import React from "react";
import BlogCard from "@/components/mainPage/blog/BlogCard";

const Page = async () => {
  const blogPosts = await getNonHiddenBlogPosts();

  const firstPostCopies = Array(20).fill(blogPosts[0]);
  //const firstPostCopies = blogPosts;

  return (
    <div className="m-auto min-h-[605px] w-11/12  md:w-5/6 lg:w-4/6">
      <div className="flex h-full w-full flex-row flex-wrap">
        {firstPostCopies.map((post, index) => (
          <div
            key={index}
            className={`lg:p-3 md:p-2 p-4 ${index === 0 || index === 1 ? " md:w-1/2" : "md:w-1/3"}`}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
