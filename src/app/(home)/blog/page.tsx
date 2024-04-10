import React from "react";
import dynamic from "next/dynamic";

import { TBlogPost } from "@/lib/shared/types";
import { getNonHiddenBlogPosts } from "@/lib/actions/blogActions";

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
  }

  return (
    <section className="m-auto min-h-[605px] w-11/12 py-5 md:w-5/6 lg:w-4/6">
      <div className="flex h-full w-full flex-row flex-wrap">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className={`p-4 md:p-2 lg:p-3 ${index === 0 ? "w-full" : "lg:w-1/2"}`}
          >
            <BlogCard post={post} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Page;
