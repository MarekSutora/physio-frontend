import {
  getAllBlogPostsAction,
  getBlogPostByIdAction,
} from "@/lib/actions/blogActions";
import React from "react";

export async function generateStaticParams() {
  const blogPosts = await getAllBlogPostsAction();

  return blogPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));
}

const Page = async ({ params }: { params: { id: number } }) => {
  const blogPost = await getBlogPostByIdAction(params.id);

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
