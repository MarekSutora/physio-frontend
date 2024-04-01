"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TBlogPost } from "../shared/types";
import { revalidatePath, revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils/utils";
import { getTokenForServerAction } from "./getTokenForServerAction";

export async function getAllBlogPostsAction(): Promise<TBlogPost[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts`;

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

    const data = await res.json();

    return data.length > 0 ? data : [];
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createBlogPostAction(formData: TBlogPost) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();
    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }
    const url = `${process.env.BACKEND_API_URL}/blog-posts`;
    const accessToken = token.userTokens.accessToken;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      if (!errorMessage) throw new Error("Pri vytváraní článku nastala chyba.");
      throw new Error(errorMessage);
    }

    revalidateTag("blog-posts");
    revalidatePath("/blog");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateBlogPostAction(formData: TBlogPost) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts/${encodeURIComponent(formData.slug!)}`;
    const accessToken = token.userTokens.accessToken;

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
    revalidatePath("/blog");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteBlogPostAction(slug: string) {
  try {
    const session = await getServerSession(authOptions);
    const token = await getTokenForServerAction();

    if (!session || !token) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts/${encodeURIComponent(slug)}`;
    const accessToken = token.userTokens.accessToken;

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
    revalidatePath("/blog");
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
