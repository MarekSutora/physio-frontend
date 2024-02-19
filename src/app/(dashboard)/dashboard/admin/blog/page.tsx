import DashboardSectionWrapper from "@/components/dashboard/DashboardSectionWrapper";
import CreateNewBlogForm from "@/components/dashboard/admin/blog/CreateNewBlogForm";
import React from "react";

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2 text-black lg:flex-row">
      <DashboardSectionWrapper
        title={"Vytvoriť nový Blog Post"}
        width={"w-full"}
      >
        <CreateNewBlogForm />
      </DashboardSectionWrapper>
    </div>
  );
};

export default Page;
