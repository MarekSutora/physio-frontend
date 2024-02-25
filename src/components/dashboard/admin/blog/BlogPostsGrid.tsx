"use client";

import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown, FaCheck, FaTimes } from "react-icons/fa";
import { TBlogPost } from "@/lib/shared/types"; // Make sure to import from the correct location
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  deleteBlogPostAction,
  updateBlogPostAction,
} from "@/lib/actions/blogActions";
import { useToast } from "@/components/ui/use-toast";
import { ca } from "date-fns/locale";

//TODO style the table

type SortField = keyof TBlogPost;
type SortOrder = "ascend" | "descend";

type Props = {
  _blogPosts: TBlogPost[];
};

const sortData = (
  data: TBlogPost[],
  field: SortField,
  order: SortOrder,
): TBlogPost[] => {
  return [...data].sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      if (order === "ascend") {
        return a[field]! < b[field]! ? -1 : a[field]! > b[field]! ? 1 : 0;
      } else {
        return a[field]! > b[field]! ? -1 : a[field]! < b[field]! ? 1 : 0;
      }
    }

    if (typeof a[field] === "boolean" && typeof b[field] === "boolean") {
      return a[field] === b[field]
        ? 0
        : (a[field] ? -1 : 1) * (order === "ascend" ? 1 : -1);
    }

    if (field === "datePublished") {
      const dateA = new Date(a.datePublished);
      const dateB = new Date(b.datePublished);
      return order === "ascend"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    }
    return 0;
  });
};

const BlogPostsGrid = ({ _blogPosts }: Props) => {
  const { toast } = useToast();
  const preSortedBlogPosts = sortData(_blogPosts, "datePublished", "descend");
  const [blogPosts, setBlogPosts] = useState<TBlogPost[]>(preSortedBlogPosts);
  const [sortField, setSortField] = useState<SortField>("datePublished");
  const [sortOrder, setSortOrder] = useState<SortOrder>("descend");

  const handleSort = (field: SortField) => {
    const newOrder =
      sortField === field && sortOrder === "ascend" ? "descend" : "ascend";
    setSortField(field);
    setSortOrder(newOrder);
    setBlogPosts(sortData(blogPosts, field, newOrder));
  };

  // Action handlers
  const handleHide = async (blogPost: TBlogPost) => {
    try {
      blogPost.isHidden = true;
      await updateBlogPostAction(blogPost);
      toast({
        variant: "success",
        title: "Post hidden successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to hide the post.",
      });
    }
  };

  const handlePublish = async (blogPost: TBlogPost) => {
    try {
      blogPost.isHidden = false;
      await updateBlogPostAction(blogPost);
      toast({
        variant: "success",
        title: "Post published successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to publish the post.",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBlogPostAction(id);
      setBlogPosts(blogPosts.filter((post) => post.id !== id));
      toast({
        variant: "success",
        title: "Post deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to delete the post.",
      });
    }
  };

  return (
    <div className="max-w-full overflow-x-auto">
      <table className="w-full overflow-x-visible">
        <thead>
          <tr>
            <th>
              <button onClick={() => handleSort("title")}>
                Title{" "}
                {sortField === "title" &&
                  (sortOrder === "ascend" ? <FaSortUp /> : <FaSortDown />)}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("author")}>
                Author{" "}
                {sortField === "author" &&
                  (sortOrder === "ascend" ? <FaSortUp /> : <FaSortDown />)}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("datePublished")}>
                Date Published{" "}
                {sortField === "datePublished" &&
                  (sortOrder === "ascend" ? <FaSortUp /> : <FaSortDown />)}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("isHidden")}>
                Is Hidden{" "}
                {sortField === "isHidden" &&
                  (sortOrder === "ascend" ? <FaSortUp /> : <FaSortDown />)}
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{new Date(post.datePublished).toLocaleDateString("sk")}</td>
              <td>
                {post.isHidden ? (
                  <FaCheck color="green" />
                ) : (
                  <FaTimes color="red" />
                )}
              </td>
              <td className="flex flex-row gap-2">
                {post.isHidden ? (
                  <Button variant="ghost" onClick={() => handlePublish(post)}>
                    Publish
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => handleHide(post)}>
                    Hide
                  </Button>
                )}
                <Link href={`./upravit-clanok?slug=${post.slug}`}>Update</Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(post.id!)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogPostsGrid;
