"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { TC_BlogPost, TG_BlogPost, TU_BlogPost } from "../shared/types";
import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../utils";

export async function getAllBlogPostsAction(): Promise<TG_BlogPost[]> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Assuming your caching strategy might need tags for invalidation
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

export async function getBlogPostByIdAction(id: number): Promise<TG_BlogPost> {
  try {
    const url = `${process.env.BACKEND_API_URL}/blog-posts/${id}`;
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

    const blogPost = await res.json();
    return blogPost;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function createBlogPostAction(formData: TC_BlogPost) {
  try {
    const session = await getServerSession(authOptions);

    console.log("formData", formData);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function updateBlogPostAction(formData: TU_BlogPost) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog-posts/${formData.id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function hideBlogPostAction(blogPostId: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog/hide/${blogPostId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function deleteBlogPostAction(blogPostId: number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      throw new Error(
        "Session not found. User must be logged in to perform this action.",
      );
    }

    const url = `${process.env.BACKEND_API_URL}/blog/${blogPostId}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.backendTokens.accessToken}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData);
    }

    revalidateTag("blog-posts");

    return true;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
