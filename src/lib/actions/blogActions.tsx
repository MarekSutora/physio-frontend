"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TBlogPost } from "../shared/types";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils/utils";
import { getTokenForServerActions } from "./getTokenForServerActions";

export async function getAllBlogPostsAction(): Promise<TBlogPost[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["blog-posts"] },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createBlogPostAction(formData: TBlogPost) {
  const createBlogPost = {
    title: formData.title,
    datePublished: formData.datePublished,
    htmlContent: formData.htmlContent,
    author: formData.author,
    keywordsString: formData.keywordsString,
    mainImageUrl: formData.mainImageUrl,
    isHidden: formData.isHidden,
  };

  try {
    const session = await getServerSession(authOptions);
    const accessToken = await getTokenForServerActions();

    if (!session || !accessToken) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(createBlogPost),
    });

    if (!res.ok) {
      const errorData = await res.text();
      if (errorData.includes("Blog post with this title already exists")) {
        throw new Error("Blogový príspevok s týmto názvom už existuje.");
      }
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateBlogPostAction(formData: TBlogPost) {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = await getTokenForServerActions();

    if (!session || !accessToken) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts/${encodeURIComponent(formData.slug!)}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteBlogPostAction(slug: string) {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = await getTokenForServerActions();

    if (!session || !accessToken) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts/${encodeURIComponent(slug)}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getBlogPostBySlugAction(
  slug: string,
): Promise<TBlogPost> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts/${encodeURIComponent(slug)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const blogPost: TBlogPost = await res.json();

    return blogPost;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function getNonHiddenBlogPosts(): Promise<TBlogPost[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts/non-hidden`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["blog-posts"] },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    const blogPosts: TBlogPost[] = await res.json();
    return blogPosts;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
