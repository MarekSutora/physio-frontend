import ViewCounter from "@/components/mainPage/blog/ViewCounter";
import {
  getBlogPostBySlugAction,
  getNonHiddenBlogPosts,
} from "@/lib/actions/blogActions";
import React from "react";
import { TBlogPost } from "@/lib/shared/types";
import { Metadata } from "next";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const blogPosts = await getNonHiddenBlogPosts();

    return blogPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    }));
  } catch (error) {
    return [
      {
        params: {
          slug: "",
        },
      },
    ];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let blogPost: TBlogPost;

  try {
    blogPost = await getBlogPostBySlugAction(params.slug);
  } catch (error) {
    return { title: "Blog", description: "Popis blogu" };
  }

  return {
    title: blogPost.title,
    description:
      blogPost.author +
      " - " +
      new Date(blogPost.datePublished).toLocaleDateString("sk", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " - " +
      blogPost.keywordsString
        .split(";")
        .map((keyword, index) => "#" + keyword)
        .join(" "),
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  let blogPost: TBlogPost;
  try {
    blogPost = await getBlogPostBySlugAction(params.slug);
  } catch (error) {
    return { notFound: true };
  }

  const {
    title,
    author,
    datePublished,
    mainImageUrl,
    htmlContent,
    keywordsString,
  } = blogPost;
  const formattedDate = new Date(datePublished).toLocaleDateString("sk", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="prose m-auto p-5 md:prose-lg lg:prose-xl prose-img:m-auto prose-img:p-0 md:p-0 lg:p-0">
      <ViewCounter blogSlug={params.slug} />
      <header className="pt-4">
        <h1>{title}</h1>
        <p>
          {formattedDate} - {author}
        </p>
      </header>
      {mainImageUrl && (
        <div className="relative h-[430px] w-full overflow-hidden">
          <Image
            src={mainImageUrl}
            alt={title}
            quality={80}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <footer className="flex flex-row flex-wrap gap-1 pb-8">
        {keywordsString.split(";").map((keyword, index) => (
          <i
            key={index}
            className="inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
          >
            {"#" + keyword}
          </i>
        ))}
      </footer>
    </article>
  );
};

export default Page;
