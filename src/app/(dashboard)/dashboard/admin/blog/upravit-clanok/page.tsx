import useSWR from "swr";
import React from "react";
import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import BlogPostForm from "@/components/dashboard/admin/blog/BlogPostForm";
import { TBlogPost } from "@/lib/shared/types";
import { ca } from "date-fns/locale";
import { getBlogPostBySlugAction } from "@/lib/actions/blogActions";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async (props: Props) => {
  let blogPost: TBlogPost | undefined = undefined;

  const slug = props.searchParams.slug;

  try {
    blogPost = await getBlogPostBySlugAction(slug as string);
  } catch (error) {
    console.error("error", error);
  }

  return (
    <DashboardSectionWrapper title={"Upraviť článok"}>
      <BlogPostForm createNew={false} oldData={blogPost} />
    </DashboardSectionWrapper>
  );
};

export default Page;
