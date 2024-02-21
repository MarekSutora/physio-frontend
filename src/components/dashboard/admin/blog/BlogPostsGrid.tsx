"use client";

import React, { useState } from "react";
import { FaSortUp, FaSortDown, FaCheck, FaTimes } from "react-icons/fa";
import { TG_BlogPost } from "@/lib/shared/types"; // Make sure to import from the correct location

type SortField = keyof TG_BlogPost;
type SortOrder = "ascend" | "descend";

type Props = {
  _blogPosts: TG_BlogPost[];
};

const BlogPostsGrid = ({ _blogPosts }: Props) => {
  const [blogPosts, setBlogPosts] = useState<TG_BlogPost[]>(_blogPosts);
  const [sortField, setSortField] = useState<SortField>();
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascend");

  const handleSort = (field: SortField) => {
    const isAscend = sortField === field && sortOrder === "ascend";
    setSortOrder(isAscend ? "descend" : "ascend");
    const sortedData = [...blogPosts].sort((a, b) => {
      // Sorting logic for strings
      if (typeof a[field] === "string" && typeof b[field] === "string") {
        if (sortOrder === "ascend") {
          return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        } else {
          return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        }
      }
      // Sorting logic for booleans
      if (typeof a[field] === "boolean" && typeof b[field] === "boolean") {
        if (sortOrder === "ascend") {
          return a[field] === b[field] ? 0 : a[field] ? -1 : 1;
        } else {
          return a[field] === b[field] ? 0 : a[field] ? 1 : -1;
        }
      }
      // Sorting logic for dates
      if (field === "datePublished") {
        const dateA = new Date(a.datePublished);
        const dateB = new Date(b.datePublished);
        return sortOrder === "ascend"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    setSortField(field);
    setBlogPosts(sortedData); // Update the state to force rerender with sorted data
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
            <td>{new Date(post.datePublished).toLocaleDateString()}</td>
            <td>
              {post.isHidden ? (
                <FaTimes color="red" />
              ) : (
                <FaCheck color="green" />
              )}
            </td>
            <td>
              <button onClick={() => handleHidePublish(post.id)}>
                Hide/Publish
              </button>
              <button onClick={() => handleDelete(post.id)}>Delete</button>
              <button onClick={() => handleUpdate(post.id)}>Update</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlogPostsGrid;
