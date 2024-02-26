import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import BlogPostForm from "@/components/dashboard/admin/blog/BlogPostForm";
import { TBlogPost } from "@/lib/shared/types";
import { getBlogPostBySlugAction } from "@/lib/actions/blogActions";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let blogPost: TBlogPost | undefined = undefined;

  const appId = props.searchParams.appId;

  try {
    blogPost = await getBlogPostBySlugAction(appId as string);
  } catch (error) {
    console.error("error", error);
  }

  return (
    <DashboardSectionWrapper title={"Termin"}>
      <div>assasd</div>
    </DashboardSectionWrapper>
  );
};

export default Page;
