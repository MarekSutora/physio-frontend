import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import BlogPostsGrid from "@/components/dashboard/admin/blog/BlogPostsGrid";
import { getAllBlogPostsAction } from "@/lib/actions/blogActions";
import { TBlogPost } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let blogPosts: TBlogPost[] = [];

  try {
    let _blogPosts = await getAllBlogPostsAction();
    blogPosts = _blogPosts;
  } catch (error) {
    console.log("error", error);
  }

  return (
    <DashboardSectionWrapper title={"Články"}>
      <BlogPostsGrid _blogPosts={blogPosts} />
    </DashboardSectionWrapper>
  );
};

export default Page;
