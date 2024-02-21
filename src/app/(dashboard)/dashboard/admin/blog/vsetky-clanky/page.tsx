import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import BlogPostsGrid from "@/components/dashboard/admin/blog/BlogPostsGrid";
import { getAllBlogPostsAction } from "@/lib/actions/blogActions";
import { TG_BlogPost } from "@/lib/shared/types";
import React from "react";

const generateDummyData = (
  sampleData: TG_BlogPost,
  count: number,
): TG_BlogPost[] => {
  const dummyData: TG_BlogPost[] = [];
  for (let i = 0; i < count; i++) {
    dummyData.push({
      ...sampleData,
      id: i,
      title: `Title ${i} ${Math.random().toString(36).substring(2, 7)}`,
      author: `Author ${Math.random().toString(36).substring(2, 7)}`,
      datePublished: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000),
      ).toLocaleDateString(),
      isHidden: Math.random() > 0.5,
    });
  }
  return dummyData;
};

type Props = {};

const Page = async () => {
  let blogPosts: TG_BlogPost[] = [];

  try {
    let _blogPosts = await getAllBlogPostsAction();
    blogPosts = generateDummyData(blogPosts[0], 10);
  } catch (error) {
    console.error("error", error);
  }

  return (
    <DashboardSectionWrapper title={"Clanky"}>
      <BlogPostsGrid _blogPosts={blogPosts} />
    </DashboardSectionWrapper>
  );
};

export default Page;
