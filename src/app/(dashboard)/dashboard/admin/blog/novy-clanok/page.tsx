import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import BlogForm from "@/components/dashboard/admin/blog/BlogPostForm";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový Blog Post"}
        width={"w-full"}
      >
        <BlogForm createNew={true} />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
