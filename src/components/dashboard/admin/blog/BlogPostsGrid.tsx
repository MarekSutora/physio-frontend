"use client";

import React, { useEffect, useState } from "react";
import { FaSortUp, FaSortDown, FaCheck, FaTimes } from "react-icons/fa";
import { TG_BlogPost } from "@/lib/shared/types"; // Make sure to import from the correct location
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SortField = keyof TG_BlogPost;
type SortOrder = "ascend" | "descend";

type Props = {
  _blogPosts: TG_BlogPost[];
};

const sortData = (
  data: TG_BlogPost[],
  field: SortField,
  order: SortOrder,
): TG_BlogPost[] => {
  return [...data].sort((a, b) => {
    // Handle string comparison
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      if (order === "ascend") {
        return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
      } else {
        return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
      }
    }
    // Handle boolean comparison
    if (typeof a[field] === "boolean" && typeof b[field] === "boolean") {
      return a[field] === b[field]
        ? 0
        : (a[field] ? -1 : 1) * (order === "ascend" ? 1 : -1);
    }
    // Handle date comparison
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
  const preSortedBlogPosts = sortData(_blogPosts, "datePublished", "descend");
  const [blogPosts, setBlogPosts] = useState<TG_BlogPost[]>(preSortedBlogPosts);
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
  const handleHidePublish = (id: number) => {
    /* ... */
  };
  const handleDelete = (id: number) => {
    /* ... */
  };
  const handleUpdate = (id: number) => {
    /* ... */
  };

  return (
    <table>
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
                <FaTimes color="red" />
              ) : (
                <FaCheck color="green" />
              )}
            </td>
            <td className="flex flex-row gap-2">
              <Button onClick={() => handleHidePublish(post.id)}>
                {post.isHidden ? "Publish" : "Hide"}
              </Button>
              <Link href={`./upravit-clanok?slug=${post.slug}`}>Update</Link>
              <Button
                variant="destructive"
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogPostsGrid;
