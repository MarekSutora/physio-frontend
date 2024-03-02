import ViewCounter from "@/components/mainPage/blog/ViewCounter";
import {
  getAllBlogPostsAction,
  getBlogPostByIdAction,
  getBlogPostBySlugAction,
  getNonHiddenBlogPosts,
} from "@/lib/actions/blogActions";
import { View } from "lucide-react";
import React from "react";

export async function generateStaticParams() {
  const blogPosts = await getNonHiddenBlogPosts();

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const Page = async ({ params }: { params: { slug: string } }) => {
  console.log("params", params);
  const blogPost = await getBlogPostBySlugAction(params.slug);

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
      <header>
        <h1>{title}</h1>
        <p>
          {formattedDate} - {author}
        </p>
      </header>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {mainImageUrl && <img src={mainImageUrl} alt={title} />}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <footer>
        <p>Keywords: {keywordsString.split(";").join(", ")}</p>
      </footer>
    </article>
  );
};

export default Page;
