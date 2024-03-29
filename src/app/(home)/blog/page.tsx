import { getNonHiddenBlogPosts } from "@/lib/actions/blogActions";
import React from "react";

import { TBlogPost } from "@/lib/shared/types";
import dynamic from "next/dynamic";

const BlogCard = dynamic(() => import("@/components/mainPage/blog/BlogCard"), {
  ssr: false,
});

export const metadata = {
  title: "Blog",
  description: "Na tejto stránke nájdete všetky články z blogu.",
};

const Page = async () => {
  let blogPosts: TBlogPost[] = [];

  try {
    blogPosts = await getNonHiddenBlogPosts();
  } catch (error) {
    blogPosts = [];
    console.log(error);
  }

  const firstPostCopies =
    blogPosts.length > 0 ? Array(20).fill(blogPosts[0]) : [];

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
