import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import BlogPostsGrid from "@/components/dashboard/admin/blog/BlogPostsGrid";
import { getAllBlogPostsAction } from "@/lib/actions/blogActions";
import { TBlogPost } from "@/lib/shared/types";
import React from "react";

const generateDummyData = (
  sampleData: TBlogPost,
  count: number,
): TBlogPost[] => {
  const dummyData: TBlogPost[] = [];
  for (let i = 0; i < count; i++) {
    dummyData.push({
      ...sampleData,
      title: `Title ${i} ${Math.random().toString(36).substring(2, 7)}`,
      author: `Author ${Math.random().toString(36).substring(2, 7)}`,
      datePublished: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toISOString(),
      isHidden: Math.random() > 0.5,
    });
  }
  return dummyData;
};

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
