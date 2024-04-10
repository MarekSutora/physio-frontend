import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import BlogPostsGrid from "@/components/dashboard/admin/blog/BlogPostsDataTable";
import { getAllBlogPostsAction } from "@/lib/actions/blogActions";
import { TBlogPost } from "@/lib/shared/types";
import React from "react";

const Page = async () => {
  let blogPosts: TBlogPost[] = [];

  try {
    blogPosts = await getAllBlogPostsAction();
  } catch (error) {
    blogPosts = [];
  }

  return (
    <DashboardSectionWrapper title={"Články"}>
      <BlogPostsGrid _blogPosts={blogPosts} />
    </DashboardSectionWrapper>
  );
};

export default Page;
