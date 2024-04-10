"use client";

import React, { useState } from "react";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { TBlogPost } from "@/lib/shared/types";
import {
  deleteBlogPostAction,
  updateBlogPostAction,
} from "@/lib/actions/blogActions";
import { useToast } from "@/components/ui/use-toast";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { FilterMatchMode } from "primereact/api";
import ShadConfirmationDialog from "@/components/mainPage/common/ShadConfirmationDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  _blogPosts: TBlogPost[];
};

const defaultFilters: DataTableFilterMeta = {
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  author: { value: null, matchMode: FilterMatchMode.CONTAINS },
  datePublished: { value: null, matchMode: FilterMatchMode.CONTAINS },
  isHidden: { value: null, matchMode: FilterMatchMode.CONTAINS },
};

const BlogPostsDataTable = ({ _blogPosts }: Props) => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<TBlogPost[]>(_blogPosts);

  const handleHide = async (rowData: TBlogPost) => {
    try {
      rowData.isHidden = !rowData.isHidden;
      await updateBlogPostAction(rowData);
      toast({
        variant: "success",
        title: `Článok ${rowData.isHidden ? "schovaný" : "zverejnený"} úspešne.`,
      });
      setBlogPosts([...blogPosts]);
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to update the post." });
    }
  };

  const handleDelete = async (rowData: TBlogPost) => {
    try {
      await deleteBlogPostAction(rowData.slug!);
      setBlogPosts(blogPosts.filter((post) => post.slug !== rowData.slug));
      toast({ variant: "success", title: "Post deleted successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to delete the post." });
    }
  };

  const actionBodyTemplate = (rowData: TBlogPost) => {
    return (
      <div className="flex flex-row items-center justify-center gap-1">
        <Link
          href={`./upravit-clanok?slug=${rowData.slug}`}
          className="h-8 rounded-md border-[1px] border-gray-500 px-1 pt-0.5 text-center"
        >
          Otvoriť
        </Link>

        <ShadConfirmationDialog onConfirm={handleHide} confirmArgs={[rowData]}>
          <Button className="h-8">
            {" "}
            {rowData.isHidden ? "Zverejniť" : "Skryť"}
          </Button>
        </ShadConfirmationDialog>

        <ShadConfirmationDialog
          onConfirm={handleDelete}
          confirmArgs={[rowData]}
        >
          <Button className="h-8" variant={"destructive"}>
            Vymazať
          </Button>
        </ShadConfirmationDialog>
      </div>
    );
  };

  return (
    <div>
      <DataTable
        value={blogPosts}
        paginator
        filters={defaultFilters}
        rows={10}
        emptyMessage=""
        filterLocale="sk"
        dataKey="id"
        size="small"
      >
        <Column
          field="title"
          header="Názov"
          filter
          filterField="title"
          sortable
        ></Column>
        <Column
          field="author"
          header="Autor"
          filter
          filterField="author"
          sortable
        ></Column>
        <Column
          field="datePublished"
          header="Publikované"
          body={(rowData) =>
            new Date(rowData.datePublished).toLocaleDateString("sk")
          }
          filter
          sortable
          filterField="datePublished"
        ></Column>
        <Column
          field="isHidden"
          header="Zverejnený"
          body={(rowData) => (rowData.isHidden ? "Nie" : "Áno")}
          filter
          filterField="isHidden"
          sortable
        ></Column>
        <Column body={actionBodyTemplate} header="Actions"></Column>
      </DataTable>
    </div>
  );
};

export default BlogPostsDataTable;
