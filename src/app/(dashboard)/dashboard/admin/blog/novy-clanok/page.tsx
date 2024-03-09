import DashboardSectionWrapper from "@/components/dashboard/common/DashboardSectionWrapper";
import BlogForm from "@/components/dashboard/admin/blog/BlogPostForm";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvorenie nového článku"}
        width={"w-full"}
      >
        <BlogForm createNew={true} />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
